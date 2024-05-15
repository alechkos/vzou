import { BSTreeNode } from "./BST/BSTreeNode";

import {
  ActionType,
  Events,
  NodeRole,
  TreeNode,
} from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import { BaseObj } from "./BaseObj";

/** Self-implementation of a Node object, has the classic attributes like position, id, value...
 *  Used in tree-like objects (AVL, BST, etc)
 */
export class NodeObj extends BaseObj {

  swapPosition: { x: number; y: number } | null; // for swaps between nodes

  level: number;

  height: number;

  parent: NodeObj | undefined;

  isBST: boolean;

  /*
    Genuinely, so much of the following code was trial-and-error with different page sizes, different edge cases
    and different types of nodes. It is difficult to explain every single line here, so it's best advised to not
    delete what doesn't hurt future CD.
    אם זה לא שבור- אל תתקנו
     */

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    viewportWidth: number,
    parent: NodeObj | undefined,
    level: number,
    height: number,
    type: "root" | "left" | "right",
    isBST?: boolean
  ) {
    super(position, speed, id, value, type, viewportWidth, parent);
    this.swapPosition = null;
    this.level = level;
    this.height = Math.max(5, height);
    this.isBST = !!isBST;
    this.parent = parent;
    this.calculatePosition();
    this.createBranch();
  }

  getXGap() {
    if (this.isBST && this.parent) {
      return (NodeObj.availableSpace / (this.parent.height * 2 ** (this.parent.level - 0.5))) * 2;
    }
    if (this.parent) {
      return (
        Math.min(this.viewportWidth, NodeObj.availableSpace) /
        (this.parent.height * 2 ** (this.parent.level - 0.5))
      );
    }
    return 0;
  }

  calculatePosition() {
    if (this.type === "root") {
      return;
    }
    if (this.parent === undefined || this.parent.position === undefined) {
      throw new Error("parent is null or parent position is null");
    }
    if (this.type === "left") {
      this.position = {
        x: this.parent.position.x - this.getXGap(),
        y: this.parent.position.y + NodeObj.gapY,
      };
    } else {
      this.position = {
        x: this.parent.position.x + this.getXGap(),
        y: this.parent.position.y + NodeObj.gapY,
      };
    }
  }

  setAction(action: ActionType, swapPosition: { x: number; y: number } | null) {
    this.action = action;
    this.swapPosition = swapPosition;
  }

  setRole(role?: string) {
    this.nodeRole = role;
  }

  static generateTreeObjects(
    viewportWidth: number,
    height: number,
    speed: number,
    root: TreeNode | undefined | BSTreeNode,
    level: number,
    currentHeapSize?: number,
    isBST?: boolean
  ): NodeObj[] {
    if (!root) {
      return [];
    }
    const treeObjects = [];
    const stack = [
      {
        node: root,
        nodeObj: new NodeObj(
          { x: viewportWidth / 2 - 120, y: 325 },
          speed,
          root.id,
          root.value,
          viewportWidth,
          undefined,
          level,
          height,
          "root",
          isBST
        ),
      },
    ];

    while (stack.length) {
      const item = stack.pop();
      if (!item) {
        break;
      }
      const { node, nodeObj } = item;

      if (node.right) {
        stack.push({
          node: node.right,
          nodeObj: new NodeObj(
            { x: 0, y: 0 }, // Will be calculated according to the parent,
            speed,
            node.right.id,
            node.right.value,
            viewportWidth,
            nodeObj,
            nodeObj.level + 1,
            height,
            "right",
            isBST
          ),
        });
      }
      if (node.left) {
        stack.push({
          node: node.left,
          nodeObj: new NodeObj(
            { x: 0, y: 0 }, // Will be calculated according to the parent
            speed,
            node.left.id,
            node.left.value,
            viewportWidth,
            nodeObj,
            nodeObj.level + 1,
            height,
            "left",
            isBST
          ),
        });
      }
      treeObjects.push(nodeObj);
    }
    treeObjects.sort((a, b) => a.id - b.id);
    if (currentHeapSize === undefined) {
      return treeObjects;
    }
    return treeObjects.slice(0, currentHeapSize);
  }

  static setActions(treeObjects: NodeObj[], actions: Events | null, isBSTree = false) {
    if (actions) {
      if (!isBSTree) {
        for (const action of actions) {
          if (action.action === ActionType.ERROR) {
            return;
          }
          if (action.action === ActionType.SWAP) {
            if (typeof action.item2 !== "number") {
              throw new Error("item2 is required for swap action");
            }
            treeObjects[action.item].setAction(ActionType.SWAP, treeObjects[action.item2].position);
            treeObjects[action.item2].setAction(ActionType.SWAP, treeObjects[action.item].position);
          } else {
            treeObjects[action.item].setAction(action.action, null);
          }
        }
      } else {
        for (const action of actions) {
          if (action.action === ActionType.ERROR) {
            return;
          }
          if (action.action === ActionType.SWAP) {
            if (typeof action.item2 !== "number") {
              throw new Error("item2 is required for swap action");
            }
            let node1;
            let node2;
            for (const tree of treeObjects) {
              if (tree.id === action.item2) {
                node2 = tree;
              }
              if (tree.id === action.item) {
                node1 = tree;
              }
            }
            if (node1 === undefined || node2 === undefined) {
              throw new Error("node not found");
            }
            node1.setAction(ActionType.SWAP, node2.position);
            node2.setAction(ActionType.SWAP, node1.position);
          } else {
            for (const tree of treeObjects) {
              if (tree.id === action.item) {
                tree.setAction(action.action, null);
              }
            }
          }
        }
      }
    }
  }

  static setRoles(treeObjects: NodeObj[], roles: NodeRole[], isBSTree = false) {
    if (!treeObjects.length) {
      return;
    }
    if (!isBSTree) {
      for (const role of roles) {
        if (treeObjects[role.id] === undefined) {
          return;
        }
        treeObjects[role.id].setRole(role.role);
      }
    } else {
      for (const role of roles) {
        for (const node of treeObjects) {
          if (node.id === role.id) {
            node.setRole(role.role);
          }
        }
      }
    }
  }

  static setVisited(treeObjects: NodeObj[], visitedNodes: number[]) {
    for (const node of treeObjects) {
      node.isVisited = visitedNodes.includes(node.id);
    }
  }

  static setPassed(treeObjects: NodeObj[], passedNodes: number[]) {
    for (const node of treeObjects) {
      node.isPassed = passedNodes.includes(node.id);
    }
  }
}
