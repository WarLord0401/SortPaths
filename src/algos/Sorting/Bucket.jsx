const BucketSort = async (bars, setBars, delay, setIsSorting) => {
  const arr = [...bars]; // Copy to avoid direct mutation

  // Helper function to update bar heights and colors for visualization
  const updateBars = (newHeights, highlightedIndexes = []) => {
    setBars((prevBars) =>
      prevBars.map((bar, index) => {
        let color = highlightedIndexes.includes(index) ? "red" : "grey";
        return { ...bar, height: newHeights[index], color };
      })
    );
  };

  // Bucket Sort Algorithm with Visualization
  const bucketSort = async (array) => {
    const n = array.length;
    if (n <= 1) return array;

    // Create buckets
    const numBuckets = 10;
    const buckets = Array.from({ length: numBuckets }, () => []);

    // Find range of array
    const max = Math.max(...array.map((bar) => bar.height));
    const min = Math.min(...array.map((bar) => bar.height));
    const range = (max - min + 1) / numBuckets;

    // Distribute the elements into buckets
    array.forEach((bar) => {
      const bucketIndex = Math.floor((bar.height - min) / range);
      buckets[Math.min(bucketIndex, numBuckets - 1)].push(bar);
    });

    // Sort buckets and merge
    let sortedArray = [];
    for (let i = 0; i < numBuckets; i++) {
      // Visualize sorting current bucket
      await visualizeBucket(buckets[i], sortedArray, array.length, delay, updateBars);
      
      // Sort the current bucket
      buckets[i].sort((a, b) => a.height - b.height);
      sortedArray = [...sortedArray, ...buckets[i]];

      // Update the visualization after sorting the bucket
      await visualizeBucket(buckets[i], sortedArray, array.length, delay, updateBars);
    }

    return sortedArray;
  };

  // Visualization helper to render progress
  const visualizeBucket = async (bucket, sortedArray, totalLength, delay, updateBars) => {
    const heights = [...sortedArray, ...bucket].map((bar) => bar.height);
    while (heights.length < totalLength) heights.push(null);
    updateBars(heights);
    await new Promise((resolve) => setTimeout(resolve, delay));
  };

  // Execute Bucket Sort and complete visualization
  const sort = async () => {
    setIsSorting(true);
    const sortedArray = await bucketSort(arr);
    
    // Final visualization to mark all bars as sorted
    setBars(
      sortedArray.map((bar) => ({
        ...bar,
        color: "green", // Mark sorted bars as green
      }))
    );
    setIsSorting(false);
    alert("Sorting completed!");
  };

  sort();
};

export default BucketSort;
