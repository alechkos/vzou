import { GraphNode } from "../GraphNode";

export class DFSNode extends GraphNode {
  adjacents: DFSNode[];

  f: number;

  color: string;

  constructor(id: number, value: number, color: string) {
    super(id, value);
    this.f = 0;
    this.color = color;
    this.adjacents = [];
  }
  setF(f: number) {
    this.f = f;
  }

  setColor(color: string) {
    this.color = color;
  }

  addAdjacent(node: DFSNode) {
    this.adjacents.push(node);
  }
}
