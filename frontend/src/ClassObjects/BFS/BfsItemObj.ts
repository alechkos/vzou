import { BaseObj } from "../BaseObj";
import { BranchObj } from "../BranchObj";
import {
  ActionType,
  Events,
  NodeRole,
} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { BfsNode } from "./BfsNode";

export class BfsItemObj extends BaseObj {
  static width = 3; //Used to calculate X gap

  static positions: { x: number; y: number }[] = [];

  static gapY = 20;

  parents: BfsItemObj[];

  branches: BranchObj[];

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    viewportWidth: number,
    parent: BfsItemObj | undefined,
    type: "root" | "left" | "right",
    parents: BfsItemObj[]
  ) {
    super(position, speed, id, value, type, viewportWidth, parent);
    this.parents = parents;
    this.branches = [];
    this.calculatePosition();
    this.createBranch();
  }

  getXGap() {
    return Math.min(this.viewportWidth, BfsItemObj.availableSpace) / BfsItemObj.width;
  }

  calculatePosition() {
    const dist = 40;
    const add = 30;

    if (this.type === "root") {
      return;
    }
    if (this.type === "left") {
      let x =
        this.parents[0].position.x -
        this.getXGap() +
        Math.random() * 150 +
        Math.random() * 100 -
        50;

      let y = this.parents[0].position.y + BfsItemObj.gapY + Math.random() * 150 - 50;

      BfsItemObj.positions.forEach((pos) => {
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

      BfsItemObj.positions.push(this.position);
    } else {
      let x =
        this.parents[0].position.x +
        this.getXGap() +
        Math.random() * 150 +
        Math.random() * 100 -
        50;

      let y = this.parents[0].position.y + BfsItemObj.gapY + Math.random() * 150 - 50;

      BfsItemObj.positions.forEach((pos) => {
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

      BfsItemObj.positions.push(this.position);
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

  static generateBFSObjects(viewportWidth: number, speed: number, head: BfsNode | undefined) {
    if (!head) return [];
    const bfsObjects: BfsItemObj[] = [];
    const stack = [
      {
        node: head,
        nodeObj: new BfsItemObj(
          {
            x: viewportWidth / 2 - 200 + Math.random() * 100 - 50,
            y: 325 + Math.random() * 100 - 50,
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
        const directions = ["right", "left"];
        const randomIndex = Math.floor(Math.random() * directions.length);
        if (checkNode === undefined) {
          stack.push({
            node: bfsNode,
            nodeObj: new BfsItemObj(
              { x: 0, y: 0 },
              speed,
              bfsNode.id,
              bfsNode.value,
              viewportWidth,
              undefined,
              directions[randomIndex] as "root" | "right" | "left",
              [nodeObj]
            ),
          });
        } else {
          checkNode.addParent(nodeObj);
          checkNode.createBranch();
        }
      });
      bfsObjects.push(nodeObj);
    }

    bfsObjects.sort((a, b) => a.id - b.id);
    return bfsObjects;
  }

  addParent(parent: BfsItemObj) {
    this.parents.push(parent);
  }

  setAction(action: ActionType) {
    this.action = action;
  }

  setRole(role?: string) {
    this.nodeRole = role;
  }

  static setActions(listObjects: BfsItemObj[], actions: Events | null) {
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

  static setRoles(listObjects: BfsItemObj[], roles: NodeRole[]) {
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

  static setPassed(listObjects: BfsItemObj[], passedNodes: number[]) {
    for (const node of listObjects) {
      node.isPassed = passedNodes.includes(node.id);
    }
  }

  static setVisited(hashObjects: BfsItemObj[], visitedNodes: number[]) {
    for (const node of hashObjects) {
      node.isVisited = visitedNodes.includes(node.id);
    }
  }
}
