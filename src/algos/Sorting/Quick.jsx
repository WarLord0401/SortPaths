const QuickSort = (bars, setBars, delay, setIsSorting) => {
  const quickSort = async (arr, start, end) => {
    if (start < end) {
      // Partition the array and get the pivot index
      let pivotIndex = await partition(arr, start, end);

      // Recursively sort left and right halves
      await quickSort(arr, start, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, end);
    }
  };

  const partition = async (arr, start, end) => {
    let pivot = arr[end].height; // Choose pivot element
    arr[end] = { ...arr[end], color: "#FFC300" }; // Highlight pivot
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      arr[i] = { ...arr[i], color: "#FF5733" }; // Active comparison color

      if (arr[i].height < pivot) {
        // Swap elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        await visualizeBars([...arr], delay);
        arr[i] = { ...arr[i], color: "grey" }; // Reset color
        pivotIndex++;
      } else {
        await visualizeBars([...arr], delay);
        arr[i] = { ...arr[i], color: "grey" }; // Reset color
      }
    }

    // Swap pivot to the correct position
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    await visualizeBars([...arr], delay);

    // Reset pivot color
    arr[pivotIndex] = { ...arr[pivotIndex], color: "grey" };
    return pivotIndex;
  };

  const visualizeBars = (updatedBars, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setBars(updatedBars);
        resolve();
      }, delay);
    });
  };

  const runQuickSort = async () => {
    const barsCopy = [...bars];
    await quickSort(barsCopy, 0, barsCopy.length - 1);

    // Final update - set all bars to green
    for (let i = 0; i < barsCopy.length; i++) {
      barsCopy[i].color = "green"; // Final color green
    }
    setBars([...barsCopy]);

    // Delayed sorting completion message
    setTimeout(() => {
      setIsSorting(false);
      alert("Sorting completed!");
    }, 600);
  };

  runQuickSort();
};

export default QuickSort;
