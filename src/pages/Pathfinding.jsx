import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Visualizer from "../PathfindingUtils/Visualizer";

function Pathfinding() {
  const pathfindingVisualizerRef = useRef();
  const gridWrapperRef = useRef();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [gridDimensions, setGridDimensions] = useState({
    rows: 20,
    cols: calculateColumns(),
  }); // Default dimensions

  const handleWall = () => {
    if (pathfindingVisualizerRef.current) {
      // Call the method within the ref, ensuring the context of this is correct
      // Inside another component or event handler
      pathfindingVisualizerRef.current.generateWallsInGrid();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setGridDimensions((prevDimensions) => ({
        ...prevDimensions,
        cols: calculateColumns(),
      }));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set dimensions
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function calculateColumns() {
    const wrapperWidth = gridWrapperRef.current
      ? gridWrapperRef.current.clientWidth
      : 0;
    const columnWidth = 30; // Width of each column
    const columns = Math.floor(wrapperWidth / columnWidth);
    return Math.max(10, Math.min(columns, 50)); // Ensure columns are between 10 and 50
  }

  const handleStartNode = () => {
    if (pathfindingVisualizerRef.current) {
      pathfindingVisualizerRef.current.activateStartNode(); // Activates start node selection
    }
  };

  const handleFinishNode = () => {
    if (pathfindingVisualizerRef.current) {
      pathfindingVisualizerRef.current.activateFinishNode(); // Activates finish node selection
    }
  };

  const handleVisualize = () => {
    if (!selectedAlgorithm) {
      alert("Please select an algorithm before visualizing.");
      return;
    }
    setIsVisualizing(true);
    if (pathfindingVisualizerRef.current) {
      pathfindingVisualizerRef.current.visualizeAlgorithm(() => {
        setIsVisualizing(false); // Callback to set visualization state
      });
    }
  };

  const handleStop = () => {
    setIsVisualizing(false);
    // this.animation.stopVisualization();
    if (pathfindingVisualizerRef.current) {
      pathfindingVisualizerRef.current.stopVisualization(); // Stops visualization
    }
  };

  const handleReset = () => {
    setIsVisualizing(false);
    if (pathfindingVisualizerRef.current) {
      pathfindingVisualizerRef.current.resetGrid(); // Resets the grid
    }
  };

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    if (pathfindingVisualizerRef.current) {
      pathfindingVisualizerRef.current.setAlgorithm(algorithm); // Sets the algorithm
    }
  };

  const algorithms = [
    { name: "bfs", label: "Breadth-First Search" },
    { name: "dfs", label: "Depth-First Search" },
    { name: "dijkstra", label: "Dijkstra's Algorithm" },
    { name: "aStar", label: "A* Algorithm" },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="text-blue-600 mt-20 text-center text-3xl font-semibold flex justify-center align-center">
          PATHFINDING ALGORITHM VISUALIZATION
        </header>
      </motion.div>
      <div className="pt-10 flex flex-col gap-10 w-[100%] justify-center align-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-around gap-10 w-[100%] px-5">
            {algorithms.map(({ name, label }) => (
              <Choose
                key={name}
                selected={selectedAlgorithm === name}
                className={`${
                  selectedAlgorithm === name ? "selected" : ""
                } p-5 bg-blue-400 hover:bg-blue-500 hover:scale-105 text-white border-none w-[100%] rounded-md cursor-pointer text-base flex-1 min-w-[120px]`}
                onClick={() => {
                  handleAlgorithmChange(name);
                }}
              >
                {label}
              </Choose>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="flex justify-between p-20 gap-[2.5%] flex-1">
        <GridWrapper className="mt-[-50px] ml-[-50px]" ref={gridWrapperRef}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GridContainer className={`grid grid-cols-${gridDimensions.cols}`}>
              <Visualizer
                ref={pathfindingVisualizerRef}
                rows={gridDimensions.rows}
                cols={gridDimensions.cols}
                selectedAlgorithm={selectedAlgorithm}
                isVisualizing={isVisualizing}
              />
            </GridContainer>
          </motion.div>
        </GridWrapper>
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="mt-[2vh] p-[2rem] flex flex-col gap-[20px] min-w-[200px] h-[80%]">
              <div className="flex flex-col gap-5 mb-5">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    type="button"
                    className=" bg-green-600 text-yellow-50  active:bg-green-700"
                    onClick={handleStartNode}
                  >
                    Start Node
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    type="button"
                    className=" bg-red-600 text-yellow-50  active:bg-red-700"
                    onClick={handleFinishNode}
                  >
                    Finish Node
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    type="button"
                    className=" bg-purple-900 text-yellow-50  active:bg-purple-700"
                    onClick={handleWall}
                  >
                    Build Wall
                  </Button>
                </motion.div>
              </div>
              <div className="flex flex-col gap-5">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    type="button"
                    className={`${
                      selectedAlgorithm ? "selected" : ""
                    } bg-yellow-300 text-black capitalize disabled:bg-slate-200 disabled:cursor-not-allowed  active:bg-yellow-700`}
                    onClick={handleVisualize}
                    disabled={isVisualizing}
                  >
                    VISUALIZE
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    type="button"
                    className=" bg-orange-600 text-yellow-50 disabled:bg-slate-200 disabled:cursor-not-allowed active:bg-orange-300"
                    onClick={handleStop}
                    disabled={!isVisualizing}
                  >
                    STOP
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    type="button"
                    className=" bg-blue-500 text-yellow-50  active:bg-blue-700"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Pathfinding;

const Button = styled.div`
  padding: 10px 20px;
  text-align: center;
  font-size: 1em;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Smooth hover effect */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Button shadow */
  &:hover {
    scale: 1.05;
    opacity: 0.9;
  }
`;

const Choose = styled.div`
  transition: background-color 0.3s, transform 0.2s; /* Smooth hover effect */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Shadow for buttons */
  min-width: 120px;
  text-align: center;
  &:hover {
    background-color: rgb(0, 49, 117);
    color: white;
    transform: scale(1.05);
  }
  ${(props) =>
    props.selected &&
    `background-color: rgb(0, 30, 71);
    color: white;
    border: 2px solid gray;
  `}
`;

const GridContainer = styled.div`
  background-color: #ffffff;
  border: 2px solid #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  max-height: 70vh;
  display: flex;
  border-radius: 10px;
  align-items: center;
`;

const GridWrapper = styled.div`
  background-color: var(--grid-bg);
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: calc(100vw - 300px);
  max-height: 76vh;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
