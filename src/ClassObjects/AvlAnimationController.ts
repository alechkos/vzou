import { BSTreeMemento } from "../ClassObjects/BSTreeMemento";

import BSTreeAnimationController from "./BSTreeAnimationController";
import { BSTreeNode } from "./BSTreeNode";

import { buildTree, insert } from "../components/Simulation/AVL/AVL_Algorithms";
import { calculateHeight } from "../components/Simulation/BinaryTree/Helpers/Functions";
import {
  deleteNodeWrapper,
  insertWithAnimations,
} from "../components/Simulation/BST/BST_Algorithms";
import { AppDispatch } from "../store/store";
import { addToInputArray, deleteFromInputArray } from "../store/reducers/alghoritms/bst-reducer";

export class AvlAnimationController extends BSTreeAnimationController {
  private static avlController: null | AvlAnimationController = null;

  private constructor(root: BSTreeNode | undefined, dispatch: AppDispatch) {
    super(root, dispatch);
  }

  static getController(root: BSTreeNode | undefined, dispatch: AppDispatch) {
    if (!this.avlController) this.avlController = new AvlAnimationController(root, dispatch);
    return this.avlController;
  }

  async insert(value: number) {
    let data;
    if (this.memento.getLength()) {
      data = this.memento.getLastData();
    } else {
      data = this.data;
    }
    const tempData = BSTreeNode.deepCopy(data);
    const tempRoot = insert(tempData, value, tempData);
    if (calculateHeight(tempRoot) > 6) {
      throw new Error("Tree is too big, max height is 6");
    }

    const newNode: BSTreeNode = BSTreeNode.createNewNode(data, value, 1);
    await this.playAlgorithm(insertWithAnimations, newNode, this.memento as BSTreeMemento, true);
    this.dispatch(addToInputArray(value));
  }

  async deleteNode(key: number) {
    let data;
    if (this.memento.getLength()) {
      data = this.memento.getLastData();
    } else {
      data = this.data;
    }
    await this.playAlgorithm(deleteNodeWrapper, key, this.memento as BSTreeMemento, true);
    this.dispatch(deleteFromInputArray(key));
  }

  setTreeFromInput(arr: number[], newRoot?: BSTreeNode) {
    let root: BSTreeNode | undefined;
    if (newRoot) {
      root = newRoot;
    } else {
      root = buildTree(arr);
    }
    this.data = root;
    this.memento.clearSnapshots();
    this.setRoot(root);
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setVisitedNodes([]);
    this.setPassedNodes([]);
    this.setTraversalResult([]);
  }
}
