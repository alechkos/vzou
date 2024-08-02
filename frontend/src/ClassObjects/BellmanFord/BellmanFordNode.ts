import { GraphNode } from "../GraphNode";

export class BellmanFordNode extends GraphNode {
  constructor(id: number, value: number) {
    super(id, value);
  }
}
