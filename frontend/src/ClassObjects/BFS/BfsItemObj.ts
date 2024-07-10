import { BaseObj } from "../BaseObj";
import { BranchObj } from "../BranchObj";
import {
  ActionType,
  Events,
  NodeRole,
} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { BfsNode } from "./BfsNode";

export class BfsItemObj extends BaseObj {
  static width = 4; //Used to calculate X gap

  static gapY = 10;

  parents: BfsItemObj[];

  topLineForArrow: BranchObj | null;

  botLineForArrow: BranchObj | null;

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
    this.topLineForArrow = null;
    this.botLineForArrow = null;
    this.calculatePosition();
    this.createLineForArrow(10, "top");
    this.createBranch();
    this.createLineForArrow(10, "bot");
  }

  getXGap() {
    if (this.parent) {
      return Math.min(this.viewportWidth, BfsItemObj.availableSpace) / BfsItemObj.width;
    }
    return 0;
  }

  calculatePosition() {
    if (this.type === "root") {
      return;
    }
    // if (this.parent === undefined || this.parent.position === undefined) {
    //   throw new Error("parent is null or parent position is null");
    // }
    if (this.type === "left") {
      this.position = {
        x: this.parents[0].position.x - this.getXGap(),
        y: this.parents[0].position.y + BfsItemObj.gapY,
      };
    } else {
      this.position = {
        x: this.parents[0].position.x + this.getXGap(),
        y: this.parents[0].position.y + BfsItemObj.gapY,
      };
    }
  }

  createBranch() {
    if (this.type === "root" || this.type === "head") {
      // waht have to be here?
    }
    // else if (this.parent === undefined || this.parent.position === undefined) {
    //   throw new Error("parent is null or parent position is null");
    // }
    else {
      this.branch = new BranchObj({
        x1: this.parents[0].position.x,
        x2: this.position.x,
        y1: this.parents[0].position.y,
        y2: this.position.y,
      });
    }
  }

  static generateBFSObjects(viewportWidth: number, speed: number, head: BfsNode | undefined) {
    if (!head) return [];
    const bfsObjects: BfsItemObj[] = [];
    const stack = [
      {
        node: head,
        nodeObj: new BfsItemObj(
          { x: viewportWidth / 2 - 600, y: 325 },
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
              "left",
              [nodeObj]
            ),
          });
          bfsObjects.push(nodeObj);
        } else {
          checkNode.addParent(nodeObj);
        }
      });
    }

    bfsObjects.sort((a, b) => a.id - b.id);
    return bfsObjects;
  }

  addParent(parent: BfsItemObj) {
    this.parents.push(parent);
  }

  createLineForArrow(gapY: number, place: string) {
    if (this.type === "root" || this.type === "head") {
      // waht have to be here?
    }
    // else if (this.parent === undefined || this.parent.position === undefined) {
    //   throw new Error("parent is null or parent position is null");
    // }
    else {
      if (place === "top") {
        this.botLineForArrow = new BranchObj(
          {
            x1: this.parents[0].position.x + 100,
            x2: this.position.x,
            y1: this.parents[0].position.y - gapY,
            y2: this.position.y,
          },
          true
        );
      } else if (place === "bot") {
        this.topLineForArrow = new BranchObj(
          {
            x1: this.parents[0].position.x + 100,
            x2: this.position.x,
            y1: this.parents[0].position.y + gapY,
            y2: this.position.y,
          },
          true
        );
      }
    }
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
