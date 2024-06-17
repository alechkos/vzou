import { BaseObj } from "../BaseObj";
import { HashTableNode } from "./HashTableNode";
import {
  ActionType,
  Events,
  NodeRole,
} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { LinkedListNode } from "../LinkedList/LinkedListNode";
import { LinkedListItemObj } from "../LinkedList/LinkedListItemObj";

export class HashTableItemObj extends BaseObj {
  static width = 4;

  static gapY = 40;

  valuesForList?: LinkedListItemObj[];

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    type: string,
    viewportWidth: number,
    parent: HashTableItemObj | undefined,
    valuesForList?: LinkedListItemObj[]
  ) {
    super(position, speed, id, value, type, viewportWidth, parent);
    this.parent = parent;
    this.calculatePosition();
    this.valuesForList = valuesForList;
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
    const valuesForList = firstNode.valuesForList
      ? LinkedListItemObj.generateLinkedListObjects(
          viewportWidth,
          speed,
          firstNode.valuesForList[0]
        )
      : undefined;
    const stack = [
      {
        node: firstNode,
        nodeObj: new HashTableItemObj(
          { x: viewportWidth / 2 - 600, y: 200 },
          speed,
          firstNode.id,
          firstNode.value,
          "head",
          viewportWidth,
          undefined,
          valuesForList
        ),
      },
    ];

    while (stack.length) {
      const item = stack.pop();
      if (!item) break;

      const { node, nodeObj } = item;
      const valuesForList = node.valuesForList
        ? LinkedListItemObj.generateLinkedListObjects(viewportWidth, speed, node.valuesForList[0])
        : undefined;
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
            nodeObj,
            valuesForList
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

  static setActions(hashObjects: HashTableItemObj[], actions: Events | null) {
    if (actions) {
      for (const action of actions) {
        if (action.action === ActionType.ERROR || action.action === ActionType.SWAP) return;
        else {
          for (const list of hashObjects) {
            if (list.id === action.item) {
              list.setAction(action.action);
            }
          }
        }
      }
    }
  }

  static setRoles(hashObjects: HashTableItemObj[], roles: NodeRole[]) {
    if (!hashObjects.length) return;
    else {
      for (const role of roles) {
        for (const list of hashObjects) {
          if (list.id === role.id) {
            list.setRole(role.role);
          }
        }
      }
    }
  }

  static setPassed(hashObjects: HashTableItemObj[], passedNodes: number[]) {
    for (const node of hashObjects) {
      node.isPassed = passedNodes.includes(node.id);
    }
  }

  static setVisited(hashObjects: HashTableItemObj[], visitedNodes: number[]) {
    for (const node of hashObjects) {
      node.isVisited = visitedNodes.includes(node.id);
    }
  }
}
