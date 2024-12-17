import {
  aStar,
  getNodesInShortestPathOrder as getAStarNodesInShortestPathOrder,
} from "../algos/Pathfinding/Astar";
import { bfs } from "../algos/Pathfinding/BFS";
import { dfs } from "../algos/Pathfinding/DFS";
import {
  dijkstra,
  getNodesInShortestPathOrder as getDijkstraNodesInShortestPathOrder,
} from "../algos/Pathfinding/Dijkstra";

class Animation {
  constructor() {
    this.animationTimeouts = [];
  }

  visualizeAlgorithm(
    grid,
    startNodeRow,
    startNodeCol,
    finishNodeRow,
    finishNodeCol,
    selectedAlgorithm
  ) {
    if (
      startNodeRow === null ||
      finishNodeRow === null ||
      startNodeCol === null ||
      finishNodeCol === null
    ) {
      alert("Please set both start and finish nodes before visualizing.");
      return;
    }

    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];

    let visitedNodesInOrder, nodesInShortestPathOrder;

    if (selectedAlgorithm === "dijkstra") {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      nodesInShortestPathOrder =
        getDijkstraNodesInShortestPathOrder(finishNode);
    } else if (selectedAlgorithm === "aStar") {
      visitedNodesInOrder = aStar(grid, startNode, finishNode);
      nodesInShortestPathOrder = getAStarNodesInShortestPathOrder(finishNode);
    } else if (selectedAlgorithm === "bfs") {
      [visitedNodesInOrder, nodesInShortestPathOrder] = bfs(
        grid,
        startNode,
        finishNode
      );
    } else if (selectedAlgorithm === "dfs") {
      [visitedNodesInOrder, nodesInShortestPathOrder] = dfs(
        grid,
        startNode,
        finishNode
      );
    }

    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    // Clear previous animations
    this.clearAnimations();

    // Animate visited nodes
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        const timeoutId = setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        this.animationTimeouts.push(timeoutId);
        return;
      }
      const timeoutId = setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
      this.animationTimeouts.push(timeoutId);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const timeoutId = setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
      this.animationTimeouts.push(timeoutId);
    }
  }

  clearAnimations() {
    document
      .querySelectorAll(".node-visited, .node-shortest-path")
      .forEach((node) => {
        node.classList.remove("node-visited", "node-shortest-path");
      });
  }

  stopVisualization() {
    this.animationTimeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId); // Clear all timeouts
    });
    this.animationTimeouts.length = 0; // Reset the array
    console.log("Algorithm visualization stopped");
  }
}

export default Animation;
