import { BaseObj } from "../BaseObj";

export class BFSNode extends BaseObj {
  adjacents: BFSNode[];

  links: { source: number; target: number }[];

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    viewportWidth: number,
    parent: BFSNode | undefined,
    type: "BFS",
    adjacents: BFSNode[],
    links: { source: number; target: number }[]
  ) {
    super(position, speed, id, value, type, viewportWidth, parent);
    this.adjacents = adjacents;
    this.links = links;
  }
}
