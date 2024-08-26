import { GraphNode } from "../GraphNode";

export class BellmanFordNode extends GraphNode {
  adjacents: BellmanFordNode[];

  constructor(id: number, value: number) {
    super(id, value);
    this.adjacents = [];
  }

  addAdjacent(node: BellmanFordNode) {
    this.adjacents.push(node);
  }
}
