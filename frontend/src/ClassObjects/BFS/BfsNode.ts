export class BfsNode {
  adjacents: BfsNode[];

  links: { source: number; target: number }[];

  value: number;

  id: number;

  color: string;

  constructor(id: number, value: number, color: string) {
    this.id = id;
    this.value = value;
    this.color = color;
    this.adjacents = [];
    this.links = [];
  }

  addAdjacent(node: BfsNode) {
    this.adjacents.push(node);
  }

  addLink(link: { source: number; target: number }) {
    this.links.push(link);
  }
}
