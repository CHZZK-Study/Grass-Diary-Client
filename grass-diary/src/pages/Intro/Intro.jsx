import Header from '../../components/Header';
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
      <Section backgroundColor="#FEFEFE" height="70vh">
        <ServiceMain />
      </Section>
      <Section backgroundColor="#F9FFF7" height="70vh">
        <MainDesc />
      </Section>
      <Section backgroundColor="#F0FFEA" height="70vh">
        <SecondDesc />
      </Section>
      <Section backgroundColor="#E1FFD7" height="90vh">
        <StartContent />
      </Section>
    </Container>
  );
};

export default Intro;
