/** Self-implementation of a LinkedListItem object, has the classic attributes like position, id, value...
 *  Used in LinkedList data type
 */
import { BranchObj } from "../BranchObj";
import { BaseObj } from "../BaseObj";
import {
  ActionType,
  Events,
  NodeRole,
} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { LinkedListNode } from "./LinkedListNode";

export class LinkedListItemObj extends BaseObj {
  static width = 4; //Used to calculate X gap

  static gapY = 0;

  parent: LinkedListItemObj | undefined;

  topLineForArrow: BranchObj | null;

  botLineForArrow: BranchObj | null;

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    parent: LinkedListItemObj | undefined,
    type: "head" | "tail" | "node",
    viewportWidth: number
  ) {
    super(position, speed, id, value, type, viewportWidth, parent);
    this.parent = parent;
    this.topLineForArrow = null;
    this.botLineForArrow = null;
    this.calculatePosition();
    this.createLineForArrow(10, "top");
    this.createBranch();
    this.createLineForArrow(10, "bot");
  }

  getXGap() {
    if (this.parent) {
      return (
        Math.min(this.viewportWidth, LinkedListItemObj.availableSpace) / LinkedListItemObj.width
      );
    }
    return 0;
  }

  calculatePosition() {
    if (this.parent)
      this.position = {
        x: this.parent.position.x + this.getXGap(),
        y: this.parent.position.y + LinkedListItemObj.gapY,
      };
  }

  static generateLinkedListObjects(
    viewportWidth: number,
    speed: number,
    head: LinkedListNode | undefined,
    x?: number,
    y?: number
  ) {
    if (!head) return [];
    const linkedListObjects = [];
    const stack = [
      {
        node: head,
        nodeObj: new LinkedListItemObj(
          { x: x ? x : viewportWidth / 2 - 600, y: y ? y : 325 },
          speed,
          head.id,
          head.value,
          undefined,
          "head",
          viewportWidth
        ),
      },
    ];

    while (stack.length) {
      const item = stack.pop();
      if (!item) break;
      const { node, nodeObj } = item;
      if (node.next) {
        stack.push({
          node: node.next,
          nodeObj: new LinkedListItemObj(
            { x: 0, y: 0 }, // will be calculated according to the previous item
            speed,
            node.next.id,
            node.next.value,
            nodeObj,
            "node",
            viewportWidth
          ),
        });
      }
      linkedListObjects.push(nodeObj);
    }

    linkedListObjects.push(
      new LinkedListItemObj(
        { x: 0, y: 0 }, // will be calculated according to the previous item
        speed,
        -1,
        -1,
        linkedListObjects[linkedListObjects.length - 1],
        "node",
        viewportWidth
      )
    );

    linkedListObjects.sort((a, b) => a.id - b.id);
    return linkedListObjects;
  }

  createLineForArrow(gapY: number, place: string) {
    if (this.type === "root" || this.type === "head") {
      // waht have to be here?
    } else if (this.parent === undefined || this.parent.position === undefined) {
      throw new Error("parent is null or parent position is null");
    } else {
      if (place === "top") {
        this.botLineForArrow = new BranchObj(
          {
            x1: this.parent.position.x + 100,
            x2: this.position.x,
            y1: this.parent.position.y - gapY,
            y2: this.position.y,
          },
          true
        );
      } else if (place === "bot") {
        this.topLineForArrow = new BranchObj(
          {
            x1: this.parent.position.x + 100,
            x2: this.position.x,
            y1: this.parent.position.y + gapY,
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

  static setActions(listObjects: LinkedListItemObj[], actions: Events | null) {
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

  static setRoles(listObjects: LinkedListItemObj[], roles: NodeRole[]) {
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

  static setPassed(listObjects: LinkedListItemObj[], passedNodes: number[]) {
    for (const node of listObjects) {
      node.isPassed = passedNodes.includes(node.id);
    }
  }
}
