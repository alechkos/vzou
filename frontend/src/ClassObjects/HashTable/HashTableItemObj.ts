import { BaseObj } from "../BaseObj";
import { HashTableNode } from "./HashTableNode";
import {
  ActionType,
  Events,
  NodeRole,
} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";

export class HashTableItemObj extends BaseObj {
  static width = 4;

  static gapY = 2;

  //TODO: think about how to change the super constructor
  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    type: string,
    viewportWidth: number,
    parent: HashTableItemObj | undefined
  ) {
    super(position, speed, id, value, type, viewportWidth, parent);
  }

  calculatePosition() {
    if (this.parent)
      this.position = {
        x: this.parent.position.x,
        y: this.parent.position.y + HashTableItemObj.gapY,
      };
  }

  static generateHashTableObjects(
    viewportWidth: number,
    speed: number,
    firstNode: HashTableNode | undefined
  ) {
    if (!firstNode) return [];
    const hashTableObjects = [];
    const stack = [
      {
        node: firstNode,
        nodeObj: new HashTableItemObj(
          { x: viewportWidth / 2 - 600, y: 325 },
          speed,
          firstNode.id,
          firstNode.value,
          "head",
          viewportWidth,
          undefined
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
          nodeObj: new HashTableItemObj(
            { x: 0, y: 0 },
            speed,
            node.next.id,
            node.next.value,
            "node",
            viewportWidth,
            nodeObj
          ),
        });
        hashTableObjects.push(nodeObj);
      }
    }

    hashTableObjects.sort((a, b) => a.id - b.id);
    return hashTableObjects;
  }

  setAction(action: ActionType) {
    this.action = action;
  }

  setRole(role?: string) {
    this.nodeRole = role;
  }

  static setActions(listObjects: HashTableItemObj[], actions: Events | null) {
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

  static setRoles(listObjects: HashTableItemObj[], roles: NodeRole[]) {
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

  static setPassed(listObjects: HashTableItemObj[], passedNodes: number[]) {
    for (const node of listObjects) {
      node.isPassed = passedNodes.includes(node.id);
    }
  }
}
