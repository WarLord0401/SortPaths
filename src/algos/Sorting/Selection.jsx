const Selection = async (bars, setBars, delay, setIsSorting) => {
  const arr = [...bars]; // Main bars for sorting

  // Helper function to update visual state of the main bars
  const updateBars = (
    updatedIndexes = [],
    minIndex = null,
    sortedIndex = -1
  ) => {
    setBars((prevBars) =>
      prevBars.map((bar, index) => {
        let color = "grey"; // Default color
        if (sortedIndex !== null && index <= sortedIndex) color = "green"; // Mark sorted elements as green
        if (updatedIndexes.includes(index)) color = "blue"; // Current comparisons are blue
        if (index === minIndex) color = "red"; // Current minimum element
        return { ...bar, color };
      })
    );
  };

  // Helper function to display the updated sorted bars (one at a time)
  const updateSortedBars = (array) => {
    setBars([...array]); // This will render the newly sorted array to the container
  };

  // Perform Selection Sort and visual updates
  const selectionSort = async (array) => {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;

      // Highlight the current step in sorting
      updateBars([], minIndex, i - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));

      for (let j = i + 1; j < array.length; j++) {
        updateBars([j], minIndex, i - 1); // Highlight current comparison
        await new Promise((resolve) => setTimeout(resolve, delay));

        if (array[j].height < array[minIndex].height) {
          minIndex = j; // Update minimum index
          updateBars([], minIndex, i - 1);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      // Swap the found minimum element with the first element in unsorted part
      if (minIndex !== i) {
        [array[i].height, array[minIndex].height] = [
          array[minIndex].height,
          array[i].height,
        ];
      }

      // Update the "sorted" portion by showing the current sorted state below the original array
      updateSortedBars(array); // Replace the container with the updated array
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Update visual bars after each step
      updateBars([], null, i);
    }

    return array;
  };

  // Start sorting process
  setIsSorting(true);
  const sortedArray = await selectionSort(arr);

  // Mark all bars as sorted after completion
  setBars(
    sortedArray.map((bar) => ({
      ...bar,
      color: "green",
    }))
  );
  setIsSorting(false);
  setTimeout(() => {
    setIsSorting(false); // End sorting
    alert("Sorting completed!"); // Show the alert after 1 second delay
  }, 600);
};

export default Selection;
