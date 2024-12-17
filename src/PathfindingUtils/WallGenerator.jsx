// Generate an initial grid with walls initialized as false
export const generateInitialGrid = (rows = 20, cols = 50) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ isWall: false }))
  );
};

// Randomly generate walls in the grid based on wall density
export const generateWalls = (grid, wallDensity = 0.3) => {
  return grid.map((row) =>
    row.map((node) => ({
      ...node,
      isWall: Math.random() < wallDensity, // Set wall based on density probability
    }))
  );
};

// Toggle the wall status for a specific node in the grid
export const toggleWall = (grid, row, col) => {
  return grid.map((currentRow, rIndex) =>
    currentRow.map((node, cIndex) =>
      rIndex === row && cIndex === col
        ? { ...node, isWall: !node.isWall }
        : node
    )
  );
};
