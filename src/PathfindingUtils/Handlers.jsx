// Import necessary functions
import {
  getNewGridWithFinishNode,
  getNewGridWithStartNode,
  getNewGridWithWallToggled,
} from "./Utility"; // Adjust the path accordingly

// Handler to stop the animation
const handleStop = (animationTimeouts) => {
  if (Array.isArray(animationTimeouts)) {
    animationTimeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId); // Clear all timeouts
    });
    animationTimeouts.length = 0; // Reset the array
    console.log("Algorithm visualization stopped");
  } else {
    console.error("animationTimeouts is undefined or not an array");
  }
};

// Handler for mouse down event
const handleMouseDown = (row, col, state, setState) => {
  if (state.isStartNodeActive) {
    setState((prevState) => {
      const newGrid = getNewGridWithStartNode(prevState.grid, row, col);
      return {
        grid: newGrid,
        isStartNodeActive: false,
        startNodeRow: row,
        startNodeCol: col,
      };
    });
  } else if (state.isFinishNodeActive) {
    setState((prevState) => {
      const newGrid = getNewGridWithFinishNode(prevState.grid, row, col);
      return {
        grid: newGrid,
        isFinishNodeActive: false,
        finishNodeRow: row,
        finishNodeCol: col,
      };
    });
  } else if (state.isWallActive) {
    const newGrid = getNewGridWithWallToggled(state.grid, row, col);
    setState({ grid: newGrid, mouseIsPressed: true });
  }
};

// Handler for mouse enter event
const handleMouseEnter = (row, col, state, setState) => {
  if (!state.mouseIsPressed) return;
  const newGrid = getNewGridWithWallToggled(state.grid, row, col);
  setState({ grid: newGrid });
};

// Handler for mouse up event
const handleMouseUp = (setState) => {
  setState({ mouseIsPressed: false });
};

// Export all handlers
export { handleMouseDown, handleMouseEnter, handleMouseUp, handleStop };
