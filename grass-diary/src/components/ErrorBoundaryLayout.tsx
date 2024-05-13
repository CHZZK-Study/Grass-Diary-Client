import stylex from '@stylexjs/stylex';
import { Header, Container, Button } from '@components/index';
import { Outlet, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const styles = stylex.create({
  content: {
    marginTop: '150px',
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
  },
});

const getErrorMessage = status => {
  switch (status) {
    case 401:
    case 402:
      return {
        message: '접근 권한이 없습니다.',
      };
    case 404:
      return {
        message: '해당 일기가 존재하지 않습니다.',
      };
    case 409:
    case 500:
    default:
      return {
        message: '서비스에 접속할 수 없습니다.',
      };
  }
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();
  const { status, data } = error.response;
  const { message } = getErrorMessage(status);

  const onClick = () => {
    resetErrorBoundary();
    navigate('/main');
  };

  return (
    <Container>
      <Header />
      <div {...stylex.props(styles.content)}>
        <p>{status} Error</p>
        <p>{message}</p>
      </div>
      <Button
        text="메인으로"
        width="150px"
        marginTop="20px"
        defaultColor="#FFF"
        hoverColor="#FFF"
        defaultBgColor="#28CA3B"
        hoverBgColor="#13b81b"
        border="none"
        onClick={onClick}
      ></Button>
    </Container>
  );
};

const ErrorBoundaryLayout = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryLayout;
