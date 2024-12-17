import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

import Bubble from "../algos/Sorting/Bubble";
import Insertion from "../algos/Sorting/Insertion";
import Merge from "../algos/Sorting/Merge";
import Quick from "../algos/Sorting/Quick";
import Radix from "../algos/Sorting/Radix";
import Selection from "../algos/Sorting/Selection";
import { generateRandomBars } from "../utils/BarGenerator";

const Sorting = () => {
  // State Variables
  const [bars, setBars] = useState(generateRandomBars(20));
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [isSorting, setIsSorting] = useState(false);

  const algorithms = [
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
    "Radix Sort",
  ];

  // Generate Random Bars
  const handleGenerateBars = () => {
    setBars(generateRandomBars(20));
  };

  // Handle Sorting Logic
  const handleSort = () => {
    if (!algorithm) return;
    setIsSorting(true);

    const barsCopy = [...bars];
    const delay = 100; // Custom delay for animations

    switch (algorithm) {
      case "Bubble Sort":
        Bubble(barsCopy, setBars, delay, setIsSorting);
        break;
      case "Selection Sort":
        Selection(barsCopy, setBars, delay, setIsSorting);
        break;
      case "Insertion Sort":
        Insertion(barsCopy, setBars, delay, setIsSorting);
        break;
      case "Merge Sort":
        Merge(barsCopy, setBars, delay, setIsSorting);
        break;
      case "Quick Sort":
        Quick(barsCopy, setBars, delay, setIsSorting);
        break;
      case "Radix Sort":
        Radix(barsCopy, setBars, delay, setIsSorting);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <HeaderSection>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>SORTING VISUALIZER</Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SubTitle>
            Select any Sorting Algorithm, Generate a random Array of Bars, and
            Visualize the Sorting Mechanism by clicking Start Sorting.
          </SubTitle>
        </motion.div>
      </HeaderSection>

      {/* Algorithm Selector */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ButtonContainer>
          {algorithms.map((algo) => (
            <button
              key={algo}
              className={`algorithm-btn ${
                algorithm === algo ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setAlgorithm(algo)}
              disabled={isSorting}
            >
              {algo}
            </button>
          ))}
        </ButtonContainer>
      </motion.div>

      {/* Bars Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <BarsContainer>
          {bars.map((bar, index) => (
            <Bar
              key={index}
              height={bar.height}
              style={{ backgroundColor: bar.color }}
            />
          ))}
        </BarsContainer>
      </motion.div>

      {/* Control Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <ButtonContainer>
          <ControlButton onClick={handleGenerateBars} disabled={isSorting}>
            Generate Bars
          </ControlButton>
          <ControlButton2 onClick={handleSort} disabled={isSorting}>
            {isSorting ? "Sorting..." : "Start Sorting"}
          </ControlButton2>
        </ButtonContainer>
      </motion.div>
    </>
  );
};

export default Sorting;

/* Styled Components */
const HeaderSection = styled.div`
  margin: 10vh 0;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 4vw;
  font-weight: 600;
  color: #7471fc;
`;

const SubTitle = styled.p`
  font-size: 1.5;
  font-weight: 200;
  color: #5b5b5b;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  .algorithm-btn {
    background: #e0e0e0;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .btn-primary {
    background-color: #7471fc;
    color: #fff;
  }
  .btn-outline {
    border: 1px solid #7471fc;
    color: #7471fc;
  }
`;

const BarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 5px;
  margin-bottom: 30px;
`;

const Bar = styled.div`
  height: ${({ height }) => `${height}px`};
  width: 30px;
  background-color: #6c757d;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
`;

const ControlButton = styled.button`
  background-color: #505050;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background 0.3s;
  &:hover {
    background-color: white;
    color: #505050;
  }
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;
const ControlButton2 = styled.button`
  background-color: #1683cc;
  &:hover {
    background-color: white;
    color: #1683cc;
  }
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background 0.3s;

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;
