import { motion } from "framer-motion";
import styled from "styled-components";

const About = () => {
  return (
    <>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>About SortPaths</Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Description>
            This App is designed to help you visualize Pathfinding and Sorting
            techniques.
          </Description>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FeaturesTitle>Key Features:</FeaturesTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <FeaturesList>
            <li>Visualize Sorting Techniques</li>
            <li>Visualize Pathfinding Techniques</li>
            <li>Generate Random walls for Pathinding Techniques</li>
            <li>Simple and responsive interface</li>
          </FeaturesList>
        </motion.div>
      </Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Footer>
          Developed with ❤️ by Kanishk (developer). Visit the{" "}
          <a href="/" style={{ color: "#007bff", textDecoration: "none" }}>
            Home Page
          </a>{" "}
          to start managing your tasks!
        </Footer>
      </motion.div>
    </>
  );
};

const Container = styled.div`
  margin: 10vh;
  max-width: 100%;
  text-align: justify;
`;

const Title = styled.h1`
  padding-bottom: 40px;
  font-size: 2.5rem;
  font-weight: bold;
  color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
`;

const Description = styled.p`
  padding-bottom: 40px;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
`;

const FeaturesTitle = styled.p`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
`;

const FeaturesList = styled.ul`
  text-align: left;
  margin: 0 auto;
  list-style-type: disc;
  padding-left: 20px;
  font-size: 1.1rem;
  color: #555;
`;

const Footer = styled.p`
  font-size: 1rem;
  color: white;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #1f2937; 
  padding: 10px 0;
  font-size: 14px;

  /* Ensures footer text won't overflow */
  box-sizing: border-box;
  z-index: 10;
`;

export default About;
