const MergeSort = (bars, setBars, delay, setIsSorting) => {
  const mergeSort = async (arr, start, end) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    // Recursively sort left and right halves
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);

    // Merge two halves
    await merge(arr, start, mid, end);
  };

  const merge = async (arr, start, mid, end) => {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);

    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      if (left[i].height < right[j].height) {
        arr[k] = { ...left[i], color: "#FF5733" }; // Active comparison color
        i++;
      } else {
        arr[k] = { ...right[j], color: "#FF5733" }; // Active comparison color
        j++;
      }
      k++;
      await visualizeBars([...arr], delay);
    }

    // Handle remaining elements in left and right arrays
    while (i < left.length) {
      arr[k] = { ...left[i], color: "#33CFF5" }; // Remaining elements' color
      i++;
      k++;
      await visualizeBars([...arr], delay);
    }
    while (j < right.length) {
      arr[k] = { ...right[j], color: "#33CFF5" };
      j++;
      k++;
      await visualizeBars([...arr], delay);
    }

    // Reset to neutral color after merge
    for (let x = start; x <= end; x++) {
      arr[x] = { ...arr[x], color: "grey" };
    }
    await visualizeBars([...arr], delay);
  };

  const visualizeBars = (updatedBars, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setBars(updatedBars);
        resolve();
      }, delay);
    });
  };

  const runMergeSort = async () => {
    const barsCopy = [...bars];
    await mergeSort(barsCopy, 0, barsCopy.length - 1);

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

  runMergeSort();
};

export default MergeSort;
