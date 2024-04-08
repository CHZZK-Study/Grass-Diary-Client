import { Header } from '@components';
import {
  Container,
  Section,
  ServiceMain,
  MainDesc,
  SecondDesc,
  StartContent,
} from './introComponents';

const Intro = () => {
  return (
    <Container>
      <Header />
      <Section backgroundColor="#FEFEFE" height="90vh">
        <ServiceMain />
      </Section>
      <Section backgroundColor="#F9FFF7" height="100vh">
        <MainDesc />
      </Section>
      <Section backgroundColor="#F0FFEA" height="100vh">
        <SecondDesc />
      </Section>
      <Section backgroundColor="#E1FFD7" height="100vh">
        <StartContent />
      </Section>
    </Container>
  );
};

export default Intro;
