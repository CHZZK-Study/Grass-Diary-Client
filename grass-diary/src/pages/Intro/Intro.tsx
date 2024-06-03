import { Container, Header } from '@components/index';
import {
  ServiceMain,
  MainDesc,
  SecondDesc,
  StartContent,
} from './introComponents';
import ReactFullpage from '@fullpage/react-fullpage';

const Intro = () => {
  return (
    <>
      <Container>
        <Header position="fixed" />
      </Container>
      <ReactFullpage
        scrollingSpeed={1000}
        render={({ state }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section" style={{ backgroundColor: '#FEFEFE' }}>
                <ServiceMain />
              </div>
              <div className="section" style={{ backgroundColor: '#F9FFF7' }}>
                <MainDesc />
              </div>
              <div className="section" style={{ backgroundColor: '#F0FFEA' }}>
                <SecondDesc />
              </div>
              <div className="section" style={{ backgroundColor: '#E1FFD7' }}>
                <StartContent />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
};

export default Intro;
