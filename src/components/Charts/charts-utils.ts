import { ChartItem } from "./interface";


export const datasetConfig = {
  backgroundColor: [
    "rgba(75, 192, 192, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ],
  borderColor: [
    "rgb(75, 192, 192)",
    "rgb(255, 99, 132)",
    "rgb(255, 205, 86)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(54, 162, 235)",
    "rgb(201, 203, 207)",
  ],
  borderWidth: 2,
  maxBarThickness: 50,
};

export const DUMMY: ChartItem[] = [
  { key: "Stack", value: 5 },
  { key: "Queue", value: 7 },
  { key: "Hash-Table", value: 30 },
  { key: "Trees", value: 43 },
  { key: "Heap", value: 77 },
  { key: "Sorts", value: 65 },
];
export const DUMMY1: ChartItem[][] = [
  [
    { key: "t1", value: 43 },
    { key: "t2", value: 77 },
    { key: "t3", value: 65 },
  ],
  [
    { key: "h1", value: 5 },
    { key: "h2", value: 77 },
    { key: "h3", value: 65 },
    { key: "h4", value: 43 },
  ],
  [
    { key: "s1", value: 5 },
    { key: "s2", value: 43 },
    { key: "S3", value: 65 },
    { key: "s4", value: 77 },
  ],
];
