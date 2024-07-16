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

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    viewportWidth: number,
    parent: DFSItemObj | undefined,
    type: "root" | "left" | "right",
    parents: DFSItemObj[]
  ) {
    super(position, speed, id, value, type, viewportWidth, parent);
    this.parents = parents;
    this.branches = [];
    this.calculatePosition();
    this.createBranch();
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
      let x = this.parents[0].position.x - this.getXGap() + 40;

      let y = this.parents[0].position.y + DFSItemObj.gapY + 40;

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
      let x = this.parents[0].position.x + this.getXGap() - 40;

      let y = this.parents[0].position.y + DFSItemObj.gapY + 40;

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

  static generateBFSObjects(viewportWidth: number, speed: number, head: DFSNode | undefined) {
    if (!head) return [];
    const directions = ["right", "left"];
    const bfsObjects: DFSItemObj[] = [];
    const stack = [
      {
        node: head,
        nodeObj: new DFSItemObj(
          {
            x: viewportWidth / 2 - 200,
            y: 325,
          },
          speed,
          head.id,
          head.value,
          viewportWidth,
          undefined,
          "root",
          []
        ),
      },
    ];

    while (stack.length) {
      const item = stack.pop();
      if (!item) break;
      const { node, nodeObj } = item;
      node.adjacents.forEach((bfsNode) => {
        const checkNode = bfsObjects.find((check) => check.value === bfsNode.value);
        const dir = directions.pop();
        if (dir === undefined) {
          directions.push("right");
          directions.push("left");
        }
        if (checkNode === undefined) {
          stack.push({
            node: bfsNode,
            nodeObj: new DFSItemObj(
              { x: 0, y: 0 },
              speed,
              bfsNode.id,
              bfsNode.value,
              viewportWidth,
              undefined,
              dir as "root" | "right" | "left",
              [nodeObj]
            ),
          });
        } else {
          checkNode.addParent(nodeObj);
          checkNode.createBranch();
        }
      });
      const checkNode = bfsObjects.find((node) => node.id === nodeObj.id);
      if (checkNode === undefined) bfsObjects.push(nodeObj);
    }

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
