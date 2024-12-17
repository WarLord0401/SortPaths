class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  pop() {
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this.sinkDown();
    }
    return top;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];
    const elementF = element.distance + element.heuristic;

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      const parentF = parent.distance + parent.heuristic;

      if (elementF >= parentF) break;

      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  sinkDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[index];
    const elementF = element.distance + element.heuristic;

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.distance + leftChild.heuristic < elementF) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null &&
            rightChild.distance + rightChild.heuristic < elementF) ||
          (swap !== null &&
            rightChild.distance + rightChild.heuristic <
              leftChild.distance + leftChild.heuristic)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;

      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const getNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;

  // Check all 4 directions
  if (row > 0) neighbors.push(grid[row - 1][col]); // Up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
  if (col > 0) neighbors.push(grid[row][col - 1]); // Left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right

  return neighbors;
};

const heuristic = (nodeA, nodeB) => {
  const dx = Math.abs(nodeA.row - nodeB.row);
  const dy = Math.abs(nodeA.col - nodeB.col);
  return dx + dy; // Manhattan distance
};

export const aStar = (grid, startNode, finishNode) => {
  const openSet = new MinHeap(); // Use min-heap for faster retrieval of node with the smallest f value
  const closedSet = new Set(); // Set of visited nodes
  const cameFrom = {}; // To reconstruct the path

  startNode.distance = 0;
  startNode.heuristic = heuristic(startNode, finishNode);
  openSet.push(startNode);

  while (!openSet.isEmpty()) {
    const currentNode = openSet.pop();

    if (currentNode === finishNode) {
      // Reconstruct path
      const path = [];
      let tempNode = finishNode;
      while (tempNode) {
        path.push(tempNode);
        tempNode = cameFrom[tempNode.row + "," + tempNode.col];
      }
      return path.reverse();
    }

    closedSet.add(currentNode);

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor) || neighbor.isWall) continue;

      const tentativeDistance = currentNode.distance + 1; // Assume uniform cost for each move

      if (
        !openSet.heap.some(
          (n) => n.row === neighbor.row && n.col === neighbor.col
        ) ||
        tentativeDistance < neighbor.distance
      ) {
        neighbor.distance = tentativeDistance;
        neighbor.heuristic = heuristic(neighbor, finishNode);
        cameFrom[neighbor.row + "," + neighbor.col] = currentNode;

        if (
          !openSet.heap.some(
            (n) => n.row === neighbor.row && n.col === neighbor.col
          )
        ) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return []; // No path found
};

export const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  while (currentNode) {
    nodesInShortestPathOrder.push(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder.reverse();
};
