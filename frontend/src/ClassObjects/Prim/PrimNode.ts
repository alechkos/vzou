import { GraphNode } from "../GraphNode";

export class PrimNode extends GraphNode {
  adjacents: PrimNode[];

  constructor(id: number, value: number) {
    super(id, value);
    this.adjacents = [];
  }

  addAdjacent(node: PrimNode) {
    this.adjacents.push(node);
  }
}
