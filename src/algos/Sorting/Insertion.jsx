const InsertionSort = async (bars, setBars, delay, setIsSorting) => {
  const arr = [...bars]; // Copy to avoid mutating the original bars

  // Helper function to update the bars visually
  const updateBars = (
    newHeights,
    highlightedIndexes = [],
    sortedIndex = null
  ) => {
    setBars((prevBars) =>
      prevBars.map((bar, index) => {
        let color = "grey"; // Default color
        if (highlightedIndexes.includes(index)) color = "red"; // Key element being inserted
        if (sortedIndex !== null && index <= sortedIndex) color = "green"; // Finalized sorted elements
        return { ...bar, height: newHeights[index], color };
      })
    );
  };

  // Perform Insertion Sort with Visualization
  const insertionSort = async (array) => {
    for (let i = 1; i < array.length; i++) {
      let key = array[i].height; // Value to insert
      let j = i - 1;

      // Highlight the key element
      updateBars(
        array.map((bar) => bar.height),
        [i]
      );
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Shift elements larger than key to the right
      while (j >= 0 && array[j].height > key) {
        array[j + 1].height = array[j].height; // Shift to the right
        updateBars(
          array.map((bar) => bar.height),
          [j, j + 1] // Highlight the compared elements
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        j--;
      }

      // Place the key in its correct position
      array[j + 1].height = key;
      updateBars(
        array.map((bar) => bar.height),
        [],
        i // Mark sorted elements in green
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return array;
  };

  // Execute Sort
  const sort = async () => {
    setIsSorting(true);
    const sortedArray = await insertionSort(arr);

    // Finalize sorted bars
    setBars(
      sortedArray.map((bar) => ({
        ...bar,
        color: "green", // Mark all bars as sorted
      }))
    );

    setIsSorting(false);
    setTimeout(() => {
      setIsSorting(false); // End sorting
      alert("Sorting completed!"); // Show the alert after 1 second delay
    }, 600);
  };

  sort();
};

export default InsertionSort;
