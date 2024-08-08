import { DFSItemObj } from "../DFS/DFSItemObj";
import { BellmanFordNode } from "./BellmanFordNode";
import { BFBranch } from "./BFBranch";
import { TableDataType } from "../../types/GraphTypes";

export class BellmanFordItemObj extends DFSItemObj {
  static width = 3; //Used to calculate X gap

  static positions: { x: number; y: number }[] = [];

  static gapY = 20;

  static space = 10;

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    viewportWidth: number,
    parent: BellmanFordItemObj | undefined,
    type: "root" | "left" | "right",
    parents: BellmanFordItemObj[]
  ) {
    super(position, speed, id, value, viewportWidth, parent, type, parents);
  }

  calculatePosition() {
    const dist = 40;
    const add = 60;

    if (this.type === "root") {
      return;
    }
    if (this.type === "left") {
      let x = this.position.x - this.getXGap() + BellmanFordItemObj.space * 6;

      let y = this.position.y + BellmanFordItemObj.gapY + BellmanFordItemObj.space * 6;

      BellmanFordItemObj.positions.forEach((pos) => {
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

      BellmanFordItemObj.positions.push(this.position);
    } else {
      let x = this.position.x + this.getXGap() - BellmanFordItemObj.space * 6;

      let y = this.position.y + BellmanFordItemObj.gapY + BellmanFordItemObj.space * 6;

      BellmanFordItemObj.positions.forEach((pos) => {
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

      BellmanFordItemObj.positions.push(this.position);
    }

    BellmanFordItemObj.space += 8;
  }

  createBranchForBF(weight: number, par: BellmanFordItemObj) {
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

  static generateBFObjects(viewportWidth: number, speed: number, graphData: BellmanFordNode[]) {
    if (graphData.length === 0) return [];
    const directions = ["right", "left"];
    const bfsObjects: BellmanFordItemObj[] = [];

    let newItem: BellmanFordItemObj;
    graphData.forEach((node, index) => {
      if (directions.length === 0) {
        directions.push("right");
        directions.push("left");
      }

      let dir = directions.pop();

      if (index === 0) {
        newItem = new BellmanFordItemObj(
          {
            x: viewportWidth / 2 - 200,
            y: 400,
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
        newItem = new BellmanFordItemObj(
          {
            x: viewportWidth / 2 - 200,
            y: 400,
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
        let parent = bfsObjects.find((par: BellmanFordItemObj) => par.id === link.source);
        bfsObjects
          .filter((obj: BellmanFordItemObj) => obj.id === link.target)
          .map((obj: BellmanFordItemObj) => {
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

  static setTableData(graphObjects: BellmanFordItemObj[], tableData: TableDataType) {
    graphObjects.forEach((node) => {
      tableData.forEach((data) => {
        if (node.id === data.id) {
          node.setD(data.data.d);
          node.setPi(data.data.pi);
        }
      });
    });
  }
}
