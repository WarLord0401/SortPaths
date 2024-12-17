// Utility functions for managing grid nodes

// Toggle the wall state of a node in the grid
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

// Set a new start node in the grid
const getNewGridWithStartNode = (grid, row, col) => {
  const newGrid = grid.slice();
  // Remove the previous start node, if any
  for (let r = 0; r < newGrid.length; r++) {
    for (let c = 0; c < newGrid[0].length; c++) {
      if (newGrid[r][c].isStart) {
        newGrid[r][c] = { ...newGrid[r][c], isStart: false };
        break;
      }
    }
  }
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

// Set a new finish node in the grid
const getNewGridWithFinishNode = (grid, row, col) => {
  const newGrid = grid.slice();
  // Remove the previous finish node, if any
  for (let r = 0; r < newGrid.length; r++) {
    for (let c = 0; c < newGrid[0].length; c++) {
      if (newGrid[r][c].isFinish) {
        newGrid[r][c] = { ...newGrid[r][c], isFinish: false };
        break;
      }
    }
  }
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

// Export the utility functions
export {
  getNewGridWithFinishNode,
  getNewGridWithStartNode,
  getNewGridWithWallToggled,
};
