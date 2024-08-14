import { DFSItemObj } from "../DFS/DFSItemObj";
import { BFBranch } from "../BellmanFord/BFBranch";
import { TableDataType } from "../../types/GraphTypes";
import { PrimNode } from "./PrimNode";

export class PrimItemObj extends DFSItemObj {
  static width = 3; //Used to calculate X gap

  static positions: { x: number; y: number }[] = [];

  static gapY = 20;

  static space = 10;

  static S: number[] = [];

  static Q: PrimNode[] = [];

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    viewportWidth: number,
    parent: PrimItemObj | undefined,
    type: "root" | "left" | "right",
    parents: PrimItemObj[]
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
      let x = this.position.x - this.getXGap() + PrimItemObj.space * 6;

      let y = this.position.y + PrimItemObj.gapY + PrimItemObj.space * 6;

      PrimItemObj.positions.forEach((pos) => {
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

      PrimItemObj.positions.push(this.position);
    } else {
      let x = this.position.x + this.getXGap() - PrimItemObj.space * 6;

      let y = this.position.y + PrimItemObj.gapY + PrimItemObj.space * 6;

      PrimItemObj.positions.forEach((pos) => {
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

      PrimItemObj.positions.push(this.position);
    }

    PrimItemObj.space += 8;
  }

  createBranchForBF(weight: number, par: PrimItemObj) {
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

  static generatePrimObjects(viewportWidth: number, speed: number, graphData: PrimNode[]) {
    if (graphData.length === 0) return [];
    const directions = ["right", "left"];
    const bfsObjects: PrimItemObj[] = [];

    let newItem: PrimItemObj;
    graphData.forEach((node, index) => {
      if (directions.length === 0) {
        directions.push("right");
        directions.push("left");
      }

      let dir = directions.pop();

      if (index === 0) {
        newItem = new PrimItemObj(
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
        newItem = new PrimItemObj(
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
        let parent = bfsObjects.find((par: PrimItemObj) => par.id === link.source);
        bfsObjects
          .filter((obj: PrimItemObj) => obj.id === link.target)
          .map((obj: PrimItemObj) => {
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

  static setS(S: number[]) {
    PrimItemObj.S = S;
  }

  static setQ(Q: PrimNode[]) {
    PrimItemObj.Q = Q;
  }

  static setTableData(graphObjects: PrimItemObj[], tableData: TableDataType) {
    console.log(tableData);
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
