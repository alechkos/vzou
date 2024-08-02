export type graphType = {
  nodes: number[];
  links: { source: number; target: number }[];
  pointer?: number;
};

export type TableDataType = {
  id: number;
  data: { color?: string; pi: number; d: number; f?: number; w?: number };
}[];

export enum Colors {
  White = "White",
  Gray = "Gray",
  Black = "Black",
}
