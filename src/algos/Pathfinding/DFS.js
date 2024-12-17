export const dfs = (grid, startNode, finishNode) => {
  const visitedNodes = [];
  const nodesInShortestPathOrder = [];
  const stack = [startNode];
  const directions = [
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // up
    [1, 0], // down
  ];

  const visitedSet = new Set(); // Using a Set to track visited nodes
  visitedSet.add(startNode);

  while (stack.length) {
    const currentNode = stack.pop();
    visitedNodes.push(currentNode);

    // Stop DFS when the finishNode is found
    if (currentNode === finishNode) {
      let current = currentNode;
      while (current !== startNode) {
        nodesInShortestPathOrder.unshift(current);
        current = current.previousNode;
      }
      nodesInShortestPathOrder.unshift(startNode);
      return [visitedNodes, nodesInShortestPathOrder];
    }

    const neighbors = getNeighbors(currentNode, grid, directions);
    for (const neighbor of neighbors) {
      if (!visitedSet.has(neighbor) && !neighbor.isWall) {
        stack.push(neighbor); // Add neighbor to the stack
        neighbor.previousNode = currentNode; // Set the previous node for path tracing
        visitedSet.add(neighbor); // Mark this neighbor as visited when pushed
      }
    }
  }

  return [visitedNodes, nodesInShortestPathOrder];
};

const getNeighbors = (node, grid, directions) => {
  const neighbors = [];
  const { row, col } = node;
  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }
  return neighbors;
};
