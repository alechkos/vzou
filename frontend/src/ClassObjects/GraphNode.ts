export class GraphNode {
  links: { source: number; target: number; weight?: number }[];

  value: number;

  id: number;

  pi: GraphNode | undefined;

  d: number;

  constructor(id: number, value: number) {
    this.id = id;
    this.value = value;
    this.links = [];
    this.pi = undefined;
    this.d = 0;
  }

  addLink(link: { source: number; target: number; weight?: number }) {
    this.links.push(link);
  }

  setPi(node: GraphNode | undefined) {
    this.pi = node;
  }

  setD(d: number) {
    this.d = d;
  }
}
