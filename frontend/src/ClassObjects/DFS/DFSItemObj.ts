import { BaseObj } from "../BaseObj";
import { BranchObj } from "../BranchObj";
import {
  ActionType,
  Events,
  NodeRole,
} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { DFSNode } from "./DFSNode";

export class DFSItemObj extends BaseObj {
  static width = 3; //Used to calculate X gap

  static positions: { x: number; y: number }[] = [];

  static gapY = 20;

  parents: DFSItemObj[];

  branches: BranchObj[];

  color: string;

  d: number;

  f: number;

  pi: DFSItemObj | undefined;

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    viewportWidth: number,
    parent: DFSItemObj | undefined,
    type: "root" | "left" | "right",
    parents: DFSItemObj[],
    color: string,
    d: number,
    f: number
  ) {
    super(position, speed, id, value, type, viewportWidth, parent);
    this.parents = parents;
    this.branches = [];
    this.calculatePosition();
    this.color = color;
    this.d = d;
    this.f = f;
    this.pi = undefined;
  }

  getXGap() {
    return Math.min(this.viewportWidth, DFSItemObj.availableSpace) / DFSItemObj.width;
  }

  calculatePosition() {
    const dist = 40;
    const add = 40;

    if (this.type === "root") {
      return;
    }
    if (this.type === "left") {
      let x = this.position.x - this.getXGap() + 40;

      let y = this.position.y + DFSItemObj.gapY + 40;

      DFSItemObj.positions.forEach((pos) => {
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

      DFSItemObj.positions.push(this.position);
    } else {
      let x = this.position.x + this.getXGap() - 40;

      let y = this.position.y + DFSItemObj.gapY + 40;

      DFSItemObj.positions.forEach((pos) => {
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

      DFSItemObj.positions.push(this.position);
    }
  }

  createBranch() {
    this.parents.forEach((parent) => {
      const branch = new BranchObj(
        {
          x1: parent.position.x,
          x2: this.position.x,
          y1: parent.position.y,
          y2: this.position.y,
        },
        false,
        true
      );

      this.branches.push(branch);
    });
  }

  static generateBFSObjects(viewportWidth: number, speed: number, graphData: DFSNode[]) {
    if (graphData.length === 0) return [];
    const directions = ["right", "left"];
    const bfsObjects: DFSItemObj[] = [];

    let newItem: DFSItemObj;
    graphData.forEach((node, index) => {
      if (directions.length === 0) {
        directions.push("right");
        directions.push("left");
      }

      let dir = directions.pop();

      if (index === 0) {
        newItem = new DFSItemObj(
          {
            x: viewportWidth / 2 - 200,
            y: 325,
          },
          speed,
          node.id,
          node.value,
          viewportWidth,
          undefined,
          "root",
          [],
          node.color,
          node.d,
          node.f
        );
      } else {
        newItem = new DFSItemObj(
          {
            x: viewportWidth / 2 - 200,
            y: 325,
          },
          speed,
          node.id,
          node.value,
          viewportWidth,
          undefined,
          dir as "root" | "right" | "left",
          [],
          node.color,
          node.d,
          node.f
        );
      }

      bfsObjects.push(newItem);
    });

    graphData.forEach((node) => {
      node.links.map((link) => {
        bfsObjects
          .filter((obj) => obj.id === link.target)
          .map((obj) => {
            let parent = bfsObjects.find((par) => par.id === link.source);
            if (parent) {
              obj.addParent(parent);
              obj.createBranch();
            }
          });
      });
    });

    bfsObjects.sort((a, b) => a.id - b.id);
    return bfsObjects;
  }

  addParent(parent: DFSItemObj) {
    this.parents.push(parent);
  }

  setAction(action: ActionType) {
    this.action = action;
  }

  setRole(role?: string) {
    this.nodeRole = role;
  }

  static setActions(listObjects: DFSItemObj[], actions: Events | null) {
    if (actions) {
      for (const action of actions) {
        if (action.action === ActionType.ERROR || action.action === ActionType.SWAP) return;
        else {
          for (const list of listObjects) {
            if (list.id === action.item) {
              list.setAction(action.action);
            }
          }
        }
      }
    }
  }

  static setRoles(listObjects: DFSItemObj[], roles: NodeRole[]) {
    if (!listObjects.length) return;
    else {
      for (const role of roles) {
        for (const list of listObjects) {
          if (list.id === role.id) {
            list.setRole(role.role);
          }
        }
      }
    }
  }

  static setPassed(listObjects: DFSItemObj[], passedNodes: number[]) {
    for (const node of listObjects) {
      node.isPassed = passedNodes.includes(node.id);
    }
  }

  static setVisited(hashObjects: DFSItemObj[], visitedNodes: number[]) {
    for (const node of hashObjects) {
      node.isVisited = visitedNodes.includes(node.id);
    }
  }
}
