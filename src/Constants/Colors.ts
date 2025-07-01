export const Colors = {
  primary: "#4CAF50",
  accent: "#2C2C2C",

  task2: "#9C27B0",
  task3: "#FF9800",
  task4: "#2196F3",
  task5: "#FFEB3B",
} as const;

export type AppColors = typeof Colors;

export default Colors;
