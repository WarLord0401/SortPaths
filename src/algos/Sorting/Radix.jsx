const RadixSort = (bars, setBars, delay, setIsSorting) => {
  const getMax = (arr) => {
    return Math.max(...arr.map((bar) => bar.height));
  };

  const countingSort = async (bars, exp) => {
    const output = new Array(bars.length);
    const count = new Array(10).fill(0);

    // Count occurrences of digits
    for (let i = 0; i < bars.length; i++) {
      const digit = Math.floor(bars[i].height / exp) % 10;
      count[digit]++;
      bars[i] = { ...bars[i], color: "#FF5733" }; // Active color (red)
      await visualizeBars([...bars], delay);
    }

    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }

    for (let i = bars.length - 1; i >= 0; i--) {
      const digit = Math.floor(bars[i].height / exp) % 10;
      output[count[digit] - 1] = bars[i];
      count[digit]--;
    }

    for (let i = 0; i < bars.length; i++) {
      bars[i] = output[i];
      bars[i] = { ...bars[i], color: "grey" }; // Reset color after placement
      await visualizeBars([...bars], delay);
    }
  };

  const radixSort = async () => {
    const barsCopy = [...bars];
    const max = getMax(barsCopy);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSort(barsCopy, exp);
    }

    // Final update: Change all bars to green
    for (let i = 0; i < barsCopy.length; i++) {
      barsCopy[i] = { ...barsCopy[i], color: "green" }; // Final color green
      await visualizeBars([...barsCopy], delay);
    }
    setBars([...barsCopy]);

    // Completion message
    setTimeout(() => {
      setIsSorting(false);
      alert("Sorting completed!");
    }, 600);
  };

  const visualizeBars = (updatedBars, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setBars(updatedBars);
        resolve();
      }, delay);
    });
  };

  radixSort();
};

export default RadixSort;
