// utils/BarGenerator.js
export const generateRandomBars = (numBars) => {
  const bars = [];
  for (let i = 0; i < numBars; i++) {
    bars.push({ height: Math.floor(Math.random() * 300) + 20, color: "grey" });
  }
  return bars;
};
