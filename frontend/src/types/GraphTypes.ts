import * as d3 from "d3";

export interface GraphVisualizerProps {
  data: { nodes: number[]; links: { source: number; target: number }[]; pointer?: number };
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: number;
  value: number;
}

export type SVGType = {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null;
  container: d3.Selection<SVGGElement, unknown, null, undefined> | null;
  simulation: d3.Simulation<GraphNode, undefined> | null;
};

export type graphType = {
  nodes: number[];
  links: { source: number; target: number }[];
  pointer?: number;
};

export enum Colors {
  White = "white",
  Gray = "gray",
  Black = "black",
}
