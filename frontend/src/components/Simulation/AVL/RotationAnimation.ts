import { BSTreeMemento } from "../../../ClassObjects/BST/BSTreeMemento";
import { BSTreeNode } from "../../../ClassObjects/BST/BSTreeNode";

import { getRotateSignal, height, max } from "../../../components/Simulation/AVL/AVL_Algorithms";
import { ActionType } from "../../../components/Simulation/BinaryTree/BinaryTreeTypes";

//Utility function to get a node in the tree by value
function getNodeInTree(root: BSTreeNode | undefined, value: number): BSTreeNode | undefined {
  if (root === undefined) return root;
  if (value < root.value) return getNodeInTree(root.left, value);
  else if (value > root.value) return getNodeInTree(root.right, value);
  else return root;
}

//Animation of left rotation
export function leftRotateWithAnimation(
  root: BSTreeNode | undefined,
  node: BSTreeNode,
  memento: BSTreeMemento
): BSTreeNode {
  const nodeInTheTree = getNodeInTree(root, node.value);

  function rotate(
    root: BSTreeNode | undefined,
    node: BSTreeNode,
    memento: BSTreeMemento
  ): BSTreeNode {
    let y = undefined as BSTreeNode | undefined;
    let temp = undefined as BSTreeNode | undefined;
    y = node.right;
    if (!y) {
      throw new Error(`y is null ${y}`);
    }

    temp = root;

    //y = x.right
    memento.addSnapshot(
      {
        line: 1,
        name: "RotateLeft",
      },
      temp,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        {
          id: node.id,
          role: "X",
        },
      ]
    );

    memento.addSnapshot(
      {
        line: 1,
        name: "RotateLeft",
      },
      temp,
      node.right!.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        { id: node.id, role: "X" },
        { id: node.right!.id, role: "R" },
      ]
    );

    memento.addSnapshot(
      {
        line: 1,
        name: "RotateLeft",
      },
      temp,
      node.right!.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        { id: node.id, role: "X" },
        { id: node.right!.id, role: "Y" },
      ]
    );

    if (y.left) {
      //x.right <- y.left
      memento.addSnapshot(
        {
          line: 2,
          name: "RotateLeft",
        },
        temp,
        node.right!.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: node.id, role: "X" },
          { id: node.right!.id, role: "Y" },
        ]
      );
      node.right = y.left;

      memento.addSnapshot(
        {
          line: 2,
          name: "RotateLeft",
        },
        temp,
        y.left.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: node.id, role: "X" },
          { id: y.left.id, role: "^" },
        ]
      );
    } else {
      memento.addBlank({ line: 2, name: "RotateLeft" }, temp, undefined, [
        { id: node.id, role: "X" },
        { id: y.id, role: "Y" },
      ]);
      node.right = undefined;
    }

    // if y.left !== null
    memento.addBlank({ line: 3, name: "RotateLeft" }, temp, undefined, [{ id: y.id, role: "Y" }]);
    if (y.left) {
      //(y.left).parent = x
      y.left.parent = node;
      memento.addSnapshot(
        { line: 4, name: "RotateLeft" },
        temp,
        y.left.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: y.left.id, role: "^" },
          { id: node.id, role: "X" },
        ]
      );
    }
    if (temp !== undefined) {
      //y.parent = x.parent
      y.parent = node.parent;
      memento.addSnapshot(
        { line: 5, name: "RotateLeft" },
        temp,
        node.parent ? node.parent.id : node.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          {
            id: y.id,
            role: "^",
          },
          { id: node.parent ? node.parent.id : node.id, role: "P" },
        ]
      );
    }

    if (node.parent !== undefined) {
      //if x.parent = null
      memento.addBlank({ line: 6, name: "RotateLeft" }, temp, undefined, [
        { id: node.id, role: "X" },
        { id: node.parent.id, role: "P" },
      ]);
    }

    if (node.parent === undefined) {
      memento.addBlank({ line: 7, name: "RotateLeft" }, temp, undefined, [
        { id: temp!.id, role: "P" },
      ]);
      //root <- y
      temp = y;
      memento.addBlank({ line: 7, name: "RotateLeft" }, temp, undefined, [{ id: y.id, role: "Y" }]);
    } else if (node === node.parent?.left) {
      //else if x = (x.parent).left
      memento.addBlank({ line: 8, name: "RotateLeft" }, temp, undefined, [
        { id: node.id, role: "X" },
      ]);
      //(x.parent).left <- y
      node.parent!.left = y;
      memento.addSnapshot({ line: 9, name: "RotateLeft" }, temp, y.id, ActionType.HIGHLIGHT_LIGHT, [
        { id: y.id, role: "Y" },
      ]);
    } else {
      //else
      memento.addBlank({ line: 10, name: "RotateLeft" }, temp, undefined, [
        { id: node.id, role: "X" },
      ]);
      //(x.parent).right <- y
      node.parent!.right = y;
      memento.addSnapshot(
        { line: 11, name: "RotateLeft" },
        temp,
        y.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: y.id, role: "Y" }]
      );
    }
    //y.left <- x
    memento.addSnapshot({ line: 12, name: "RotateLeft" }, temp, y.id, ActionType.HIGHLIGHT_LIGHT, [
      { id: y.id, role: "Y" },
    ]);
    y.left = node;
    //x.parent = y
    memento.addSnapshot(
      { line: 13, name: "RotateLeft" },
      temp,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        { id: node.id, role: "X" },
        { id: y.id, role: "Y" },
      ]
    );
    node.parent = y;

    //Update heights
    node.height = max(height(node.left), height(node.right)) + 1;
    y.height = max(height(y.left), height(y.right)) + 1;
    if (y.parent) {
      y.parent.height = max(height(y.parent?.left), height(y.parent?.right)) + 1;
    }
    temp!.height = max(height(root!.left), height(root!.right)) + 1;

    memento.addBlank({ line: 13, name: "RotateLeft" }, temp);
    return temp!;
  }

  return rotate(root, nodeInTheTree!, memento);
}

//Animation of right rotation
export function rightRotateWithAnimation(
  root: BSTreeNode | undefined,
  node: BSTreeNode,
  memento: BSTreeMemento
) {
  const nodeInTheTree = getNodeInTree(root, node.value);

  function rotate(
    root: BSTreeNode | undefined,
    node: BSTreeNode,
    memento: BSTreeMemento
  ): BSTreeNode {
    let y = undefined as BSTreeNode | undefined;
    let temp = undefined as BSTreeNode | undefined;
    y = node.left;
    if (!y) {
      throw new Error(`y is null ${y}`);
    }

    temp = root;

    //y = x.left
    memento.addSnapshot(
      {
        line: 1,
        name: "RotateRight",
      },
      temp,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        {
          id: node.id,
          role: "X",
        },
      ]
    );

    memento.addSnapshot(
      {
        line: 1,
        name: "RotateRight",
      },
      temp,
      node.left!.id,
      ActionType.HIGHLIGHT_FULL,
      [
        { id: node.id, role: "X" },
        { id: node.left!.id, role: "L" },
      ]
    );

    memento.addSnapshot(
      {
        line: 1,
        name: "RotateRight",
      },
      temp,
      node.left!.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        { id: node.id, role: "X" },
        { id: node.left!.id, role: "Y" },
      ]
    );

    if (y.right) {
      //x.left <- y.right
      memento.addSnapshot(
        {
          line: 2,
          name: "RotateRight",
        },
        temp,
        node.left!.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: node.id, role: "X" },
          { id: node.left!.id, role: "Y" },
        ]
      );
      node.left = y.right;

      memento.addSnapshot(
        {
          line: 2,
          name: "RotateRight",
        },
        temp,
        y.right.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: node.id, role: "X" },
          { id: y.right.id, role: "^" },
        ]
      );
    } else {
      memento.addBlank({ line: 2, name: "RotateRight" }, temp, undefined, [
        { id: node.id, role: "X" },
        { id: y.id, role: "Y" },
      ]);
      node.left = undefined;
    }

    // if y.right !== null
    memento.addBlank({ line: 3, name: "RotateRight" }, temp, undefined, [{ id: y.id, role: "Y" }]);
    if (y.right) {
      //(y.right).parent = x
      y.right.parent = node;
      memento.addSnapshot(
        { line: 4, name: "RotateRight" },
        temp,
        y.right.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: y.right.id, role: "^" },
          { id: node.id, role: "X" },
        ]
      );
    }
    if (temp !== undefined) {
      //y.parent = x.parent
      y.parent = node.parent;
      memento.addSnapshot(
        { line: 5, name: "RotateRight" },
        temp,
        node.parent ? node.parent.id : node.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          {
            id: y.id,
            role: "^",
          },
          { id: node.parent ? node.parent!.id : node.id, role: "P" },
        ]
      );
    }

    if (node.parent !== undefined) {
      //if x.parent = null
      memento.addBlank({ line: 6, name: "RotateRight" }, temp, undefined, [
        { id: node.id, role: "X" },
        { id: node.parent.id, role: "P" },
      ]);
    }

    if (node.parent === undefined) {
      memento.addBlank({ line: 7, name: "RotateRight" }, temp, undefined, [
        { id: temp!.id, role: "P" },
      ]);
      //root <- y
      temp = y;
      memento.addBlank({ line: 7, name: "RotateRight" }, temp, undefined, [
        { id: y.id, role: "Y" },
      ]);
    } else if (node === node.parent?.right) {
      //else if x = (x.parent).right
      memento.addBlank({ line: 8, name: "RotateRight" }, temp, undefined, [
        { id: node.id, role: "X" },
      ]);
      //(x.parent).right <- y
      node.parent!.right = y;
      memento.addSnapshot(
        { line: 9, name: "RotateRight" },
        temp,
        y.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: y.id, role: "Y" }]
      );
    } else {
      //else
      memento.addBlank({ line: 10, name: "RotateRight" }, temp, undefined, [
        { id: node.id, role: "X" },
      ]);
      //(x.parent).left <- y
      node.parent!.left = y;
      memento.addSnapshot(
        { line: 11, name: "RotateRight" },
        temp,
        y.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: y.id, role: "Y" }]
      );
    }
    //y.right <- x
    memento.addSnapshot({ line: 12, name: "RotateRight" }, temp, y.id, ActionType.HIGHLIGHT_LIGHT, [
      { id: y.id, role: "Y" },
    ]);
    y.right = node;
    //x.parent = y
    memento.addSnapshot(
      { line: 13, name: "RotateRight" },
      temp,
      node.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        { id: node.id, role: "X" },
        { id: y.id, role: "Y" },
      ]
    );
    node.parent = y;

    //Update heights
    node.height = max(height(node.left), height(node.right)) + 1;
    y.height = max(height(y.left), height(y.right)) + 1;
    if (y.parent) {
      y.parent.height = max(height(y.parent?.left), height(y.parent?.right)) + 1;
    }

    temp!.height = max(height(root!.left), height(root!.right)) + 1;

    memento.addBlank({ line: 13, name: "RotateRight" }, temp);
    return temp!;
  }

  return rotate(root, nodeInTheTree!, memento);
}

export function checkForRotation(root: BSTreeNode | undefined, memento: BSTreeMemento) {
  const { node, rotate } = getRotateSignal(root);
  if (rotate === "Right") {
    rightRotateWithAnimation(root, node, memento);
  }
  // 2.Right right case
  if (rotate === "Left") {
    leftRotateWithAnimation(root, node, memento);
  }
  // 3.Left Right case
  if (rotate === "Left-Right") {
    leftRotateWithAnimation(root, node.left, memento);
    rightRotateWithAnimation(root, node, memento);
  }
  // 4.Right Left case
  if (rotate === "Right-Left") {
    rightRotateWithAnimation(root, node.right, memento);
    leftRotateWithAnimation(root, node, memento);
  }
}
