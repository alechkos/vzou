import { DFSItemObj } from "../DFS/DFSItemObj";
import { BFBranch } from "../BellmanFord/BFBranch";
import { KruskalTableType, linksType, TableDataType } from "../../types/GraphTypes";
import { KruskalNode } from "./KruskalNode";

export class KruskalItemObj extends DFSItemObj {
  static width = 3; //Used to calculate X gap

  static positions: { x: number; y: number }[] = [];

  static gapY = 20;

  static space = 10;

  static T: linksType = [];

  static links: linksType = [];

  nodes: number[];

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    viewportWidth: number,
    parent: KruskalItemObj | undefined,
    type: "root" | "left" | "right",
    parents: KruskalItemObj[]
  ) {
    super(position, speed, id, value, viewportWidth, parent, type, parents);
    this.nodes = [];
  }

  calculatePosition() {
    const dist = 40;
    const add = 60;

    if (this.type === "root") {
      return;
    }
    if (this.type === "left") {
      let x = this.position.x - this.getXGap() + KruskalItemObj.space * 6;

      let y = this.position.y + KruskalItemObj.gapY + KruskalItemObj.space * 6;

      KruskalItemObj.positions.forEach((pos) => {
        if (Math.abs(pos.x - x) <= dist) {
          x -= add;
        }
        if (Math.abs(pos.y - y) <= dist) {
          y += add;
        }
      });

      this.position = {
        x: x,
        y: y,
      };

      KruskalItemObj.positions.push(this.position);
    } else {
      let x = this.position.x + this.getXGap() - KruskalItemObj.space * 6;

      let y = this.position.y + KruskalItemObj.gapY + KruskalItemObj.space * 6;

      KruskalItemObj.positions.forEach((pos) => {
        if (Math.abs(pos.x - x) <= dist) {
          x += add;
        }
        if (Math.abs(pos.y - y) <= dist) {
          y += add;
        }
      });

      this.position = {
        x: x,
        y: y,
      };

      KruskalItemObj.positions.push(this.position);
    }

    KruskalItemObj.space += 8;
  }

  createBranchForBF(weight: number, par: KruskalItemObj) {
    this.parents.forEach((parent) => {
      let branch;
      if (par.id === parent.id)
        branch = new BFBranch(
          {
            x1: parent.position.x,
            x2: this.position.x,
            y1: parent.position.y,
            y2: this.position.y,
          },
          false,
          true,
          weight
        );
      else {
        branch = new BFBranch(
          {
            x1: parent.position.x,
            x2: this.position.x,
            y1: parent.position.y,
            y2: this.position.y,
          },
          false,
          true
        );
      }

      this.branches.push(branch);
    });
  }

  setNodes(nodes: number[]) {
    this.nodes = nodes;
  }

  static generatePrimObjects(viewportWidth: number, speed: number, graphData: KruskalNode[]) {
    if (graphData.length === 0) return [];
    const directions = ["right", "left"];
    const bfsObjects: KruskalItemObj[] = [];

    let newItem: KruskalItemObj;
    graphData.forEach((node, index) => {
      if (directions.length === 0) {
        directions.push("right");
        directions.push("left");
      }

      let dir = directions.pop();

      if (index === 0) {
        newItem = new KruskalItemObj(
          {
            x: viewportWidth / 2 - 200,
            y: 200,
          },
          speed,
          node.id,
          node.value,
          viewportWidth,
          undefined,
          "root",
          []
        );
      } else {
        newItem = new KruskalItemObj(
          {
            x: viewportWidth / 2 - 100,
            y: 200,
          },
          speed,
          node.id,
          node.value,
          viewportWidth,
          undefined,
          dir as "root" | "right" | "left",
          []
        );
      }

      bfsObjects.push(newItem);
    });

    graphData.forEach((node) => {
      node.links.map((link) => {
        let parent = bfsObjects.find((par: KruskalItemObj) => par.id === link.source);
        bfsObjects
          .filter((obj: KruskalItemObj) => obj.id === link.target)
          .map((obj: KruskalItemObj) => {
            if (parent) {
              obj.addParent(parent);
              obj.createBranchForBF(link.weight!, parent);
            }
          });
      });
    });

    bfsObjects.sort((a, b) => a.id - b.id);
    return bfsObjects;
  }

  static setT(T: linksType) {
    KruskalItemObj.T = T;
  }

  static setLinks(links: linksType) {
    KruskalItemObj.links = links;
  }

  static setTableDataForKruskal(graphObjects: KruskalItemObj[], tableData: KruskalTableType) {
    graphObjects.forEach((node) => {
      tableData.forEach((data) => {
        if (node.id === data.id) {
          node.setNodes(data.nodes);
          node.setPi(data.pi);
        }
      });
    });
  }
}
