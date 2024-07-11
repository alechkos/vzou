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

  static gapY = 20;

  parents: BfsItemObj[];

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
    this.calculatePosition();
    this.createBranch();
  }

  getXGap() {
    return Math.min(this.viewportWidth, BfsItemObj.availableSpace) / BfsItemObj.width;
  }

  calculatePosition() {
    if (this.type === "root") {
      return;
    }
    if (this.type === "left") {
      this.position = {
        x:
          this.parents[0].position.x -
          this.getXGap() +
          Math.random() * 150 +
          Math.random() * 100 -
          50,
        y: this.parents[0].position.y + BfsItemObj.gapY + Math.random() * 200 - 50,
      };
    } else {
      this.position = {
        x: this.parents[0].position.x + this.getXGap() - 100 + Math.random() * 100 - 50,
        y: this.parents[0].position.y + BfsItemObj.gapY + Math.random() * 200 - 50,
      };
    }
  }

  createBranch() {
    if (this.type === "root" || this.type === "head") {
      // waht have to be here?
    } else {
      this.branch = new BranchObj(
        {
          x1: this.parents[0].position.x,
          x2: this.position.x,
          y1: this.parents[0].position.y,
          y2: this.position.y,
        },
        false,
        true
      );
    }
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
