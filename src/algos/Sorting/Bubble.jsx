const BubbleSort = async (bars, setBars, delay, setIsSorting) => {
  const arr = [...bars]; // Copy of the bars (array of objects)

  // Helper function to update bar colors
  const updateBars = (highlightIndexes = [], sortedIndexes = []) => {
    setBars(
      arr.map((bar, index) => {
        let color = "grey"; // Default color
        if (highlightIndexes.includes(index)) color = "red"; // Bars being compared
        if (sortedIndexes.includes(index)) color = "green"; // Bars sorted
        return { ...bar, color };
      })
    );
  };

  // Bubble Sort Algorithm with Visualization
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false; // Optimization: Check if the array is already sorted

    for (let j = 0; j < arr.length - i - 1; j++) {
      updateBars([j, j + 1]); // Highlight current comparison
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (arr[j].height > arr[j + 1].height) {
        // Swap the two bars
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        // Update bars to reflect the swap
        updateBars([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    updateBars([], [...Array(arr.length - i).keys()].slice(-1)); // Mark sorted bars
    if (!swapped) break; // Early exit if no swaps occurred
  }

  // Final update for all bars to mark them as sorted
  updateBars([], [...Array(arr.length).keys()]);
  setIsSorting(false);
  setTimeout(() => {
    setIsSorting(false); // End sorting
    alert("Sorting completed!"); // Show the alert after 1 second delay
  }, 600);
};

export default BubbleSort;
