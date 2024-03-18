import { BSTreeMemento } from "../../../ClassObjects/BSTreeMemento";
import { BSTreeNode } from "../../../ClassObjects/BSTreeNode";
import { checkIfValueExist, updateHeights } from "../../Simulation/AVL/AVL_Algorithms";
import { ActionType } from "../BinaryTree/BinaryTreeTypes";
import { calculateHeight } from "../BinaryTree/Helpers/Functions";
import { checkForRotation } from "../AVL/RotationAnimation";

export function searchWrapper(
  root: BSTreeNode | undefined,
  k: number,
  memento: BSTreeMemento,
  mainRoot: BSTreeNode | undefined
) {
  const passedIds: number[] = [];

  function search(
    root: BSTreeNode | undefined,
    k: number,
    memento: BSTreeMemento,
    mainRoot: BSTreeNode | undefined
  ): BSTreeNode | undefined {
    // pseudo for if (!root || root.value === k)
    memento.addBlank(
      { line: 1, name: "Search" },
      mainRoot,
      undefined,
      [{ id: root ? root.id : mainRoot!.id, role: "X" }],
      [],
      passedIds
    );
    if (!root || root.value === k) {
      // pseudo for return root;
      if (root && root.value === k) {
        passedIds.push(root.id);
        memento.addBlank(
          { line: 2, name: "Search" },
          mainRoot,
          undefined,
          [{ id: root.id, role: "X" }],
          [root.id],
          passedIds
        );
      } else {
        memento.addBlank({ line: 2, name: "Search" }, mainRoot, undefined, [], [], passedIds);
      }
      return root;
    }
    passedIds.push(root.id);
    memento.addBlank(
      { line: 3, name: "Search" },
      mainRoot,
      undefined,
      [{ id: root.id, role: "X" }],
      [],
      passedIds
    );
    if (k < root.value) {
      memento.addBlank(
        { line: 4, name: "Search" },
        mainRoot,
        undefined,
        [{ id: root.left ? root.left.id : root.id, role: "X" }],
        [],
        passedIds
      );
      return search(root.left, k, memento, mainRoot);
    }
    memento.addBlank(
      { line: 5, name: "Search" },
      mainRoot,
      undefined,
      [{ id: root.right ? root.right.id : root.id, role: "X" }],
      [],
      passedIds
    );
    return search(root.right, k, memento, mainRoot);
  }

  const result = search(root, k, memento, mainRoot);
  if (!result) {
    memento.addError(
      { line: 0, name: "Search" },
      mainRoot,
      `Node with value ${k} not found`,
      [],
      [],
      passedIds
    );
  }
}

function shadowSearch(root: BSTreeNode | undefined, k: number): BSTreeNode | undefined {
  if (!root || root.value === k) {
    return root;
  }
  if (k < root.value) {
    return shadowSearch(root.left, k);
  }
  return shadowSearch(root.right, k);
}

export function insert(root: BSTreeNode | undefined, new_node: BSTreeNode): BSTreeNode {
  if (!root) {
    return new_node;
  }
  let y = undefined as BSTreeNode | undefined;
  let x = root as BSTreeNode | undefined;
  while (x) {
    y = x;
    if (new_node.value < x.value) {
      x = x.left;
    } else {
      x = x.right;
    }
  }
  new_node.parent = y;
  if (!y) {
    return new_node;
  }
  if (new_node.value < y.value) {
    y.left = new_node;
  } else {
    y.right = new_node;
  }
  return root;
}

export function insertWithAnimations(
  root: BSTreeNode | undefined,
  new_node: BSTreeNode,
  memento: BSTreeMemento,
  isAvl = false
) {
  let valueExist = false;
  const passedIds: number[] = [];
  function insertNode(root: BSTreeNode | undefined, new_node: BSTreeNode, memento: BSTreeMemento) {
    // pseudo for y
    memento.addBlank({ line: 1, name: "Insert" }, root, undefined, [], [], passedIds);
    let y = undefined as BSTreeNode | undefined;

    if (root) {
      if (isAvl) {
        valueExist = checkIfValueExist(new_node.value, root);
        if (valueExist) {
          throw new Error(`The node with value ${new_node.value} is exist!`);
        }
      }
      // pseudo for x = root
      memento.addSnapshot(
        { line: 2, name: "Insert" },
        root,
        root.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: root.id, role: "X" }],
        [],
        passedIds
      );
    } else {
      memento.addBlank({ line: 2, name: "Insert" }, root, undefined, [], [], passedIds);
    }
    let x = root;
    while (x) {
      // pseudo for while
      passedIds.push(x.id);
      memento.addBlank(
        { line: 3, name: "Insert" },
        root,
        undefined,
        [{ id: x.id, role: "X" }],
        [],
        passedIds
      );

      // pseudo for y = x
      memento.addSnapshot(
        { line: 4, name: "Insert" },
        root,
        x.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: x.id, role: "Y" }],
        [],
        passedIds
      );
      y = x;
      if (new_node.value < x.value) {
        // pseudo for if
        memento.addBlank(
          { line: 5, name: "Insert" },
          root,
          undefined,
          [{ id: x.id, role: "Y" }],
          [],
          passedIds
        );
        x = x.left;
        // pseudo for left
        memento.addBlank(
          { line: 6, name: "Insert" },
          root,
          undefined,
          [
            { id: y.id, role: "Y" },
            { id: x ? x.id : y.id, role: x ? "X" : "Y" },
          ],
          [],
          passedIds
        );
      } else {
        x = x.right;
        memento.addBlank(
          { line: 7, name: "Insert" },
          root,
          undefined,
          [
            { id: y.id, role: "Y" },
            { id: x ? x.id : y.id, role: x ? "X" : "Y" },
          ],
          [],
          passedIds
        );
      }
    }
    new_node.parent = y;

    // Update the heights for AVL Tree
    if (isAvl && y && !y.left && !y.right) {
      x = root;
      while (x) {
        if (new_node.value < x.value) {
          if (x.left && x.left.height === x.height - 1) {
            x.height++;
          }
          x = x.left;
        } else {
          if (x.right && x.right.height === x.height - 1) {
            x.height++;
          }
          x = x.right;
        }
      }
      y.height++;
    }

    if (y) {
      // pseudo for new_node.parent = y
      memento.addSnapshot(
        { line: 8, name: "Insert" },
        root,
        y.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: y.id, role: "Y" }],
        [],
        passedIds
      );
      memento.addSnapshot(
        { line: 8, name: "Insert" },
        root,
        y.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: y.id, role: "P" }],
        [],
        passedIds
      );
    } else {
      memento.addBlank({ line: 8, name: "Insert" }, root, undefined, [], [], passedIds);
    }
    // pseudo for if(!y)
    memento.addBlank(
      { line: 9, name: "Insert" },
      root,
      undefined,
      [{ id: y ? y.id : 0, role: y ? "Y" : "" }],
      [],
      passedIds
    );
    if (!y) {
      // pseudo for return
      memento.addSnapshot(
        { line: 10, name: "Insert" },
        new_node,
        new_node.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: new_node.id, role: "X" }],
        [],
        passedIds
      );
      return new_node;
    }
    // pseudo for if
    memento.addBlank(
      { line: 11, name: "Insert" },
      root,
      undefined,
      [{ id: y.id, role: "Y" }],
      [],
      passedIds
    );
    passedIds.push(new_node.id);
    if (new_node.value < y.value) {
      y.left = new_node;
      // pseudo for y.left = new_node;
      memento.addSnapshot(
        { line: 12, name: "Insert" },
        root,
        new_node.id,
        ActionType.ADD,
        [
          { id: y.id, role: "Y" },
          { id: y.left.id, role: "Z" },
        ],
        [new_node.id],
        passedIds
      );
    } else {
      y.right = new_node;
      // pseudo for  y.right = new_node
      memento.addSnapshot(
        { line: 13, name: "Insert" },
        root,
        new_node.id,
        ActionType.ADD,
        [
          { id: y.id, role: "Y" },
          { id: y.right.id, role: "Z" },
        ],
        [new_node.id],
        passedIds
      );
    }
    memento.addSnapshot(
      { line: 13, name: "Insert" },
      root,
      new_node.id,
      ActionType.ADD,
      [
        { id: y.id, role: "Y" },
        { id: new_node.id, role: "Z" },
      ],
      [new_node.id],
      passedIds
    );
    if (isAvl) {
      checkForRotation(root, memento);
    }
    return root!;
  }
  return insertNode(root, new_node, memento);
}

export function deleteNode(
  root: BSTreeNode | undefined,
  key: number,
  memento: BSTreeMemento,
  mainRoot: BSTreeNode | undefined,
  isAvl: boolean
) {
  if (!root) {
    memento.addBlank({ line: 1, name: "Delete" }, mainRoot);
  } else {
    memento.addBlank({ line: 1, name: "Delete" }, mainRoot, undefined, [
      { id: root.id, role: "^" },
    ]);
  }

  if (!root) {
    memento.addBlank({ line: 2, name: "Delete" }, mainRoot);
    return root;
  }
  memento.addBlank({ line: 3, name: "Delete" }, mainRoot, undefined, [{ id: root.id, role: "^" }]);
  if (key < root.value) {
    if (root.left) {
      memento.addSnapshot(
        {
          line: 4,
          name: "Delete",
        },
        mainRoot,
        root.left.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: root.id, role: "^" }]
      );
    } else {
      memento.addBlank({ line: 4, name: "Delete" }, mainRoot, undefined, [
        { id: root.id, role: "^" },
      ]);
    }
    root.left = deleteNode(root.left, key, memento, mainRoot, isAvl);
  } else if (key > root.value) {
    memento.addBlank({ line: 5, name: "Delete" }, mainRoot, undefined, [
      { id: root.id, role: "^" },
    ]);
    if (root.right) {
      memento.addSnapshot(
        {
          line: 6,
          name: "Delete",
        },
        mainRoot,
        root.right.id,
        ActionType.HIGHLIGHT_LIGHT,
        [{ id: root.id, role: "^" }]
      );
    } else {
      memento.addBlank({ line: 6, name: "Delete" }, mainRoot, undefined, [
        { id: root.id, role: "^" },
      ]);
    }
    root.right = deleteNode(root.right, key, memento, mainRoot, isAvl);
  } else {
    memento.addBlank({ line: 7, name: "Delete" }, mainRoot, undefined, [
      { id: root.id, role: "^" },
    ]);
    memento.addBlank({ line: 8, name: "Delete" }, mainRoot, undefined, [
      { id: root.id, role: "^" },
    ]);
    if (!root.left) {
      if (root.right) {
        memento.addSnapshot(
          {
            line: 9,
            name: "Delete",
          },
          mainRoot,
          root.right.id,
          ActionType.HIGHLIGHT_FULL,
          [{ id: root.id, role: "^" }]
        );
      } else {
        memento.addBlank({ line: 9, name: "Delete" }, mainRoot, undefined, [
          { id: root.id, role: "^" },
        ]);
      }
      return root.right;
    }
    if (!root.right) {
      memento.addBlank({ line: 10, name: "Delete" }, mainRoot, undefined, [
        { id: root.id, role: "^" },
      ]);
      if (root.left) {
        memento.addSnapshot(
          {
            line: 11,
            name: "Delete",
          },
          mainRoot,
          root.left.id,
          ActionType.HIGHLIGHT_LIGHT,
          [{ id: root.id, role: "^" }]
        );
      } else {
        memento.addBlank({ line: 11, name: "Delete" }, mainRoot, undefined, [
          { id: root.id, role: "^" },
        ]);
      }
      return root.left;
    }
    const successorNode = shadowGetMin(root.right);
    memento.addSnapshot(
      {
        line: 12,
        name: "Delete",
      },
      mainRoot,
      successorNode.id,
      ActionType.HIGHLIGHT_FULL,
      [
        { id: root.id, role: "^" },
        {
          id: successorNode.id,
          role: "M",
        },
      ]
    );
    root.value = successorNode.value;
    memento.addSnapshot(
      {
        line: 13,
        name: "Delete",
      },
      mainRoot,
      successorNode.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: root.id, role: "^" }]
    );
    root.id = BSTreeNode.getNextId(memento.getLastData());
    memento.addSnapshot(
      {
        line: 14,
        name: "Delete",
      },
      mainRoot,
      successorNode.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: root.id, role: "^" }]
    );
    root.right = deleteNode(root.right, successorNode.value, memento, mainRoot, isAvl);
  }
  memento.addBlank({ line: 15, name: "Delete" }, mainRoot, undefined, [{ id: root.id, role: "^" }]);

  return root;
}

export function deleteNodeWrapper(
  root: BSTreeNode | undefined,
  key: number,
  memento: BSTreeMemento,
  isAvl: boolean
) {
  const x = shadowSearch(root, key);
  if (!x) {
    throw new Error("Node not found");
  }
  deleteNode(root, key, memento, root, isAvl);
  if (isAvl) {
    updateHeights(root);
    checkForRotation(root, memento);
  }
}

export function getMinWrapper(
  root: BSTreeNode | undefined,
  memento: BSTreeMemento,
  mainRoot?: BSTreeNode,
  currentAlg = "Min",
  gap = 0
): BSTreeNode | undefined {
  const passedIds: number[] = [];
  function min(
    root: BSTreeNode | undefined,
    memento: BSTreeMemento,
    mainRoot?: BSTreeNode,
    currentAlg = "Min",
    gap = 0
  ): BSTreeNode | undefined {
    if (!root) {
      return root;
    }
    if (!mainRoot) {
      mainRoot = root;
    }
    passedIds.push(root.id);
    memento.addBlank(
      { line: gap + 1, name: currentAlg },
      mainRoot,
      undefined,
      [{ id: root.id, role: "X" }],
      [],
      passedIds
    );
    let temp = root;
    while (temp.left) {
      passedIds.push(temp.left.id);
      memento.addBlank(
        { line: gap + 2, name: currentAlg },
        mainRoot,
        undefined,
        [{ id: temp.left.id, role: "X" }],
        [],
        passedIds
      );
      temp = temp.left;
      memento.addBlank(
        { line: gap + 1, name: currentAlg },
        mainRoot,
        undefined,
        [{ id: temp.id, role: "X" }],
        [],
        passedIds
      );
    }
    memento.addBlank(
      { line: gap + 3, name: currentAlg },
      mainRoot,
      undefined,
      [{ id: temp.id, role: "X" }],
      [temp.id],
      passedIds
    );
    return temp;
  }
  return min(root, memento, mainRoot, currentAlg, gap);
}

function shadowGetMin(root: BSTreeNode): BSTreeNode {
  let temp = root;
  while (temp.left) {
    temp = temp.left;
  }
  return temp;
}

export function getMaxWrapper(
  root: BSTreeNode | undefined,
  memento: BSTreeMemento,
  mainRoot?: BSTreeNode,
  currentAlg = "Max",
  gap = 0
): BSTreeNode | undefined {
  const passedIds: number[] = [];
  function max(
    root: BSTreeNode | undefined,
    memento: BSTreeMemento,
    mainRoot?: BSTreeNode,
    currentAlg = "Max",
    gap = 0
  ): BSTreeNode | undefined {
    if (!root) {
      return root;
    }
    if (!mainRoot) {
      mainRoot = root;
    }
    passedIds.push(root.id);
    memento.addBlank(
      { line: gap + 1, name: currentAlg },
      mainRoot,
      undefined,
      [{ id: root.id, role: "X" }],
      [],
      passedIds
    );
    let temp = root;
    while (temp.right) {
      passedIds.push(temp.right.id);
      memento.addBlank(
        { line: gap + 2, name: currentAlg },
        mainRoot,
        undefined,
        [{ id: temp.right.id, role: "X" }],
        [],
        passedIds
      );
      temp = temp.right;
      memento.addBlank(
        { line: gap + 1, name: currentAlg },
        mainRoot,
        undefined,
        [{ id: temp.id, role: "X" }],
        [],
        passedIds
      );
    }
    memento.addBlank(
      { line: gap + 3, name: currentAlg },
      mainRoot,
      undefined,
      [{ id: temp.id, role: "X" }],
      [temp.id],
      passedIds
    );
    return temp;
  }
  return max(root, memento, mainRoot, currentAlg, gap);
}

export function successor(
  root: BSTreeNode | undefined,
  k: number,
  memento: BSTreeMemento
): BSTreeNode | undefined {
  if (!root) {
    return root;
  }
  const foundNode = shadowSearch(root, k);
  if (!foundNode) {
    throw new Error("Node not found");
  }
  memento.addBlank({ line: 1, name: "Successor" }, root, undefined, [
    { id: foundNode.id, role: "X" },
  ]);
  if (foundNode.right) {
    memento.addBlank({ line: 1, name: "Successor" }, root, undefined, [
      { id: foundNode.id, role: "X" },
    ]);
    memento.addSnapshot(
      { line: 2, name: "Successor" },
      root,
      foundNode.right.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: foundNode.right.id, role: "R" }]
    );
    return getMinWrapper(foundNode.right, memento, root, "Successor", 8);
  }
  let y = foundNode.parent;
  if (y) {
    memento.addSnapshot({ line: 3, name: "Successor" }, root, y.id, ActionType.HIGHLIGHT_LIGHT, [
      { id: y.id, role: "Y" },
      { id: foundNode.id, role: "X" },
    ]);
  } else {
    memento.addBlank({ line: 3, name: "Successor" }, root, undefined, [
      { id: root.id, role: "Y" },
      { id: foundNode.id, role: "X" },
    ]);
  }
  let x = foundNode;
  memento.addBlank({ line: 4, name: "Successor" }, root, undefined, [
    { id: x.id, role: "X" },
    { id: y!.id, role: "Y" },
  ]);
  while (y && x === y.right) {
    memento.addDoubleSnapShot(
      { line: 5, name: "Successor" },
      root,
      y.id,
      x.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: y.id, role: "X" }]
    );
    x = y;
    y = y.parent;
    if (y) {
      memento.addSnapshot({ line: 6, name: "Successor" }, root, y.id, ActionType.HIGHLIGHT_LIGHT, [
        { id: y.id, role: "Y" },
        { id: x.id, role: "X" },
      ]);
    } else {
      memento.addBlank({ line: 6, name: "Successor" }, root, undefined, [
        { id: root.id, role: "Y" },
        { id: x.id, role: "X" },
      ]);
    }
    memento.addBlank({ line: 4, name: "Successor" }, root, undefined, [
      { id: x.id, role: "X" },
      { id: y!.id, role: "Y" },
    ]);
  }
  if (y) {
    memento.addSnapshot({ line: 7, name: "Successor" }, root, y.id, ActionType.HIGHLIGHT_FULL, [
      { id: y.id, role: "Y" },
    ]);
  } else {
    memento.addError({ line: 7, name: "Successor" }, root, "Successor not found");
  }
  return y;
}

export function predecessor(
  root: BSTreeNode | undefined,
  k: number,
  memento: BSTreeMemento
): BSTreeNode | undefined {
  if (!root) {
    return root;
  }
  const foundNode = shadowSearch(root, k);
  if (!foundNode) {
    throw new Error("Node not found");
  }
  memento.addBlank({ line: 1, name: "Predecessor" }, root, undefined, [
    { id: foundNode.id, role: "X" },
  ]);
  if (foundNode.left) {
    memento.addSnapshot(
      { line: 2, name: "Predecessor" },
      root,
      foundNode.left.id,
      ActionType.HIGHLIGHT_LIGHT,
      [{ id: foundNode.left.id, role: "X" }]
    );
    return getMaxWrapper(foundNode.left, memento, root, "Predecessor", 8);
  }
  let y = foundNode.parent;
  if (y) {
    memento.addSnapshot({ line: 3, name: "Predecessor" }, root, y.id, ActionType.HIGHLIGHT_LIGHT, [
      { id: foundNode.id, role: "X" },
      { id: y.id, role: "Y" },
    ]);
  } else {
    memento.addBlank({ line: 3, name: "Predecessor" }, root, undefined, [
      { id: root.id, role: "Y" },
      { id: foundNode.id, role: "X" },
    ]);
  }
  let x = foundNode;
  memento.addBlank({ line: 4, name: "Predecessor" }, root, undefined, [
    { id: y!.id, role: "Y" },
    { id: x.id, role: "X" },
  ]);
  while (y && x === y.left) {
    memento.addDoubleSnapShot(
      { line: 5, name: "Predecessor" },
      root,
      y.id,
      x.id,
      ActionType.HIGHLIGHT_LIGHT,
      [
        { id: y.id, role: "Y" },
        { id: x.id, role: "X" },
      ]
    );
    x = y;
    memento.addBlank({ line: 1, name: "Predecessor" }, root, undefined, [{ id: y.id, role: "X" }]);
    y = y.parent;
    if (y) {
      memento.addSnapshot(
        { line: 6, name: "Predecessor" },
        root,
        y.id,
        ActionType.HIGHLIGHT_LIGHT,
        [
          { id: y.id, role: "Y" },
          { id: x.id, role: "X" },
        ]
      );
    } else {
      memento.addBlank({ line: 6, name: "Predecessor" }, root, undefined, [
        { id: root.id, role: "Y" },
        { id: x.id, role: "X" },
      ]);
    }
    memento.addBlank({ line: 4, name: "Predecessor" }, root, undefined, [
      { id: y!.id, role: "Y" },
      { id: x.id, role: "X" },
    ]);
  }
  if (y) {
    memento.addSnapshot({ line: 7, name: "Predecessor" }, root, y.id, ActionType.HIGHLIGHT_LIGHT, [
      { id: y.id, role: "Y" },
    ]);
  } else {
    memento.addError({ line: 7, name: "Successor" }, root, "Predecessor not found");
  }
  return y;
}

export function build(input: number[]): BSTreeNode | undefined {
  let root: BSTreeNode | undefined;
  for (let i = 0; i < input.length; i++) {
    const node: BSTreeNode = new BSTreeNode(input[i], i);
    root = insert(root, node);
  }
  const height = calculateHeight(root);
  if (height > 6) {
    throw new Error("Tree is too big, max height is 6");
  }
  return root;
}

export function randomBuildTree(input: number[]): BSTreeNode | undefined {
  let root: BSTreeNode | undefined;
  let temp: BSTreeNode | undefined;
  for (let i = 0; i < input.length; i++) {
    const node: BSTreeNode = new BSTreeNode(input[i], i);
    temp = insert(temp, node);
    if (calculateHeight(temp) > 6) {
      temp = BSTreeNode.deepCopy(root);
    } else {
      root = BSTreeNode.deepCopy(temp);
    }
  }
  return root;
}

// Pre-order traversal

export function preorderTraversal(node: BSTreeNode | undefined, memento: BSTreeMemento) {
  const idResult: number[] = [];
  const valResult: number[] = [];
  const passedNodes: number[] = [];

  function traversal(
    node: BSTreeNode | undefined,
    mainRoot: BSTreeNode | undefined,
    memento: BSTreeMemento
  ) {
    memento.addBlank(
      { line: 1, name: "Preorder" },
      mainRoot,
      undefined,
      [],
      idResult,
      passedNodes,
      valResult
    );
    if (node) {
      passedNodes.push(node.id);
      idResult.push(node.id);
      valResult.push(node.value);
      memento.addBlank(
        {
          line: 2,
          name: "Preorder",
        },
        mainRoot,
        undefined,
        [{ id: node.id, role: "x" }],
        idResult,
        passedNodes,
        valResult
      );
      memento.addBlank(
        { line: 3, name: "Preorder" },
        mainRoot,
        undefined,
        [
          {
            id: node.id,
            role: "x",
          },
        ],
        idResult,
        passedNodes,
        valResult
      );
      traversal(node.left, mainRoot, memento);
      memento.addBlank(
        { line: 4, name: "Preorder" },
        mainRoot,
        undefined,
        [
          {
            id: node.id,
            role: "x",
          },
        ],
        idResult,
        passedNodes,
        valResult
      );

      traversal(node.right, mainRoot, memento);
    }
  }

  traversal(node, node, memento);
}

// In-order traversal
export function inorderTraversal(node: BSTreeNode | undefined, memento: BSTreeMemento) {
  const idResult: number[] = [];
  const valResult: number[] = [];
  const passedNodes: number[] = [];

  function traversal(
    node: BSTreeNode | undefined,
    mainRoot: BSTreeNode | undefined,
    memento: BSTreeMemento
  ) {
    memento.addBlank(
      { line: 1, name: "Inorder" },
      mainRoot,
      undefined,
      [],
      idResult,
      passedNodes,
      valResult
    );

    if (node) {
      passedNodes.push(node.id);
      memento.addBlank(
        { line: 2, name: "Inorder" },
        mainRoot,
        undefined,
        [
          {
            id: node.id,
            role: "x",
          },
        ],
        idResult,
        passedNodes,
        valResult
      );
      traversal(node.left, mainRoot, memento);
      idResult.push(node.id);
      valResult.push(node.value);
      memento.addBlank(
        { line: 3, name: "Inorder" },
        mainRoot,
        undefined,
        [
          {
            id: node.id,
            role: "x",
          },
        ],
        idResult,
        passedNodes,
        valResult
      );
      memento.addBlank(
        { line: 4, name: "Inorder" },
        mainRoot,
        undefined,
        [
          {
            id: node.id,
            role: "x",
          },
        ],
        idResult,
        passedNodes,
        valResult
      );

      traversal(node.right, mainRoot, memento);
    }
  }

  traversal(node, node, memento);
}

// Post-order traversal

export function postorderTraversal(node: BSTreeNode | undefined, memento: BSTreeMemento) {
  const idResult: number[] = [];
  const valResult: number[] = [];
  const passedNodes: number[] = [];

  function traversal(
    node: BSTreeNode | undefined,
    mainRoot: BSTreeNode | undefined,
    memento: BSTreeMemento
  ) {
    memento.addBlank(
      { line: 1, name: "Postorder" },
      mainRoot,
      undefined,
      [],
      idResult,
      passedNodes,
      valResult
    );
    if (node) {
      passedNodes.push(node.id);
      memento.addBlank(
        { line: 2, name: "Postorder" },
        mainRoot,
        undefined,
        [
          {
            id: node.id,
            role: "x",
          },
        ],
        idResult,
        passedNodes,
        valResult
      );
      traversal(node.left, mainRoot, memento);
      memento.addBlank(
        { line: 3, name: "Postorder" },
        mainRoot,
        undefined,
        [
          {
            id: node.id,
            role: "x",
          },
        ],
        idResult,
        passedNodes,
        valResult
      );
      traversal(node.right, mainRoot, memento);
      idResult.push(node.id);
      valResult.push(node.value);
      memento.addBlank(
        {
          line: 4,
          name: "Postorder",
        },
        mainRoot,
        undefined,
        [
          {
            id: node.id,
            role: "x",
          },
        ],
        idResult,
        passedNodes,
        valResult
      );
    }
  }

  traversal(node, node, memento);
}
