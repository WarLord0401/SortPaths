// src/algorithms/BFS.js
export const bfs = (grid, startNode, finishNode) => {
  const visitedNodes = [];
  const nodesInShortestPathOrder = [];
  const queue = [startNode];
  const directions = [
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // up
    [1, 0], // down
  ];

  startNode.isVisited = true;

  while (queue.length) {
    const currentNode = queue.shift();
    visitedNodes.push(currentNode);

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
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
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
