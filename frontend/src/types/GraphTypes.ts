export type graphType = {
  nodes: number[];
  links: { source: number; target: number }[];
  pointer?: number;
};

export enum Colors {
  White = "White",
  Gray = "Gray",
  Black = "Black",
}
