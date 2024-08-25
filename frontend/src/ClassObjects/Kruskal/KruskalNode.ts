import { GraphNode } from "../GraphNode";

export class KruskalNode extends GraphNode {
  adjacents: KruskalNode[];
  nodes = new Set<KruskalNode>();

  constructor(id: number, value: number) {
    super(id, value);
    this.adjacents = [];
    this.nodes.add(this);
  }

  addAdjacent(node: KruskalNode) {
    this.adjacents.push(node);
  }

  addNode(node: KruskalNode) {
    this.nodes.add(node);
  }
}
