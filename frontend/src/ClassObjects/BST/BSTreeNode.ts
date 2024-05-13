/** Self-implemented representation for a node in a BSTree.
 * has the classic attributes like parent, left, right, height, value..
 */
export class BSTreeNode {
  parent?: BSTreeNode;

  left?: BSTreeNode;

  right?: BSTreeNode;

  value: number;

  height: number;

  id: number;

  constructor(
    value: number,
    id: number,
    left?: BSTreeNode,
    right?: BSTreeNode,
    parent?: BSTreeNode,
  ) {
    this.value = value;
    this.id = id;
    this.parent = parent;
    this.left = left;
    this.right = right;
    this.height = -1;
  }

  /** Recursively deep copy a tree from a given BSTreeNode.
   *
   */
  static deepCopy(node: BSTreeNode | undefined): BSTreeNode | undefined {
    if (!node) {
      return undefined;
    }
    const left = node.left ? BSTreeNode.deepCopy(node.left) : undefined;
    const right = node.right ? BSTreeNode.deepCopy(node.right) : undefined;
    const { value } = node;
    const { id } = node;
    const newNode = new BSTreeNode(value, id, left, right);
    newNode.height = node.height;
    if (left !== undefined) {
      left.parent = newNode;
    }
    if (right !== undefined) {
      right.parent = newNode;
    }
    return newNode;
  }

  static countNodes(root: BSTreeNode | undefined): number {
    if (!root) {
      return 0;
    }
    return 1 + this.countNodes(root.left) + this.countNodes(root.right);
  }

  // create function that can get max id from tree
  static getMaxId(root: BSTreeNode | undefined): number {
    if (!root) {
      return 0;
    }
    return Math.max(root.id, this.getMaxId(root.left), this.getMaxId(root.right));
  }

  static createNewNode(
    currentRoot: BSTreeNode | undefined,
    value: number,
    height = -1,
  ): BSTreeNode {
    return {
      value,
      id: this.getNextId(currentRoot),
      height,
    };
  }

  static getNextId(root: BSTreeNode | undefined): number {
    if (!root) {
      return 0;
    }
    return Math.max(this.countNodes(root), this.getMaxId(root) + 1);
  }
}
