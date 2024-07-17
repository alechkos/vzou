export class DFSNode {
  adjacents: DFSNode[];

  links: { source: number; target: number }[];

  value: number;

  id: number;

  color: string;

  pi: DFSNode | undefined;

  d: number;

  f: number;

  constructor(id: number, value: number, color: string) {
    this.id = id;
    this.value = value;
    this.color = color;
    this.adjacents = [];
    this.links = [];
    this.pi = undefined;
    this.d = 0;
    this.f = 0;
  }

  addAdjacent(node: DFSNode) {
    this.adjacents.push(node);
  }

  addLink(link: { source: number; target: number }) {
    this.links.push(link);
  }

  setColor(color: string) {
    this.color = color;
  }

  setPi(node: DFSNode | undefined) {
    this.pi = node;
  }

  setD(d: number) {
    this.d = d;
  }

  setF(f: number) {
    this.f = f;
  }
}
