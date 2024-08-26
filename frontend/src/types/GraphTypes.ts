export type graphType = {
  nodes: number[];
  links: linksType;
  pointer?: number;
};

export type TableDataType = {
  id: number;
  data: {
    color?: string;
    pi: number;
    d: number;
    f?: number;
    w?: number;
  };
}[];

export type KruskalTableType = {
  id: number;
  nodes: number[];
  pi: number;
}[];

export type linksType = {
  source: number;
  target: number;
  weight?: number;
}[];

export enum Colors {
  White = "White",
  Gray = "Gray",
  Black = "Black",
}
