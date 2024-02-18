import { BSTreeMemento } from "ClassObjects/BSTreeMemento";

import BSTreeAnimationController from "./BSTreeAnimationController";
import { BSTreeNode } from "./BSTreeNode";

import {
  build,
  deleteNode,
  getBalance, getRotateSignal,
  insert,
  leftRotateWithAnimation, rightRotateWithAnimation,
} from "../components/Simulation/AVL/AVL_Algorithms";
import { calculateHeight } from "../components/Simulation/BinaryTree/Helpers/Functions";
import { insertWithAnimations } from "../components/Simulation/BST/BST_Algorithms";
import { AppDispatch } from "../store/store";





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
    const newNode: BSTreeNode =  BSTreeNode.createNewNode(data, value, 0);
    await this.playAlgorithm(
      insertWithAnimations,
      newNode,
      this.memento as BSTreeMemento,
      true,
    );

    const signal = getRotateSignal(data);
    if  (signal !== true) {
      const { node, rotate } = signal;
      console.log(node, rotate);


      // If this node(y -> accessor of new node) becomes unbalanced, then there are 4 cases
      // 1.Left Left Case
      if ( rotate === "Right" ) {
        await this.playAlgorithm(
          rightRotateWithAnimation,
          node,
          this.memento as BSTreeMemento,
        );
      }
      // 2.Right right case
      if (rotate === "Left") {
        await this.playAlgorithm(
          leftRotateWithAnimation,
          node,
          this.memento as BSTreeMemento,
        );
      }
      // 3.Left Right case
      if (rotate === "Left-Right") {
        await this.playAlgorithm(
          leftRotateWithAnimation,
          node.left,
          this.memento as BSTreeMemento,
        );
        await this.playAlgorithm(
          rightRotateWithAnimation,
          node,
          this.memento as BSTreeMemento,
        );
      }
      // 4.Right Left case
      if (rotate === "Right-Left") {
        await this.playAlgorithm(
          rightRotateWithAnimation,
          node.right,
          this.memento as BSTreeMemento,
        );
        await this.playAlgorithm(
          leftRotateWithAnimation,
          node,
          this.memento as BSTreeMemento,
        );
      }
    }


    // this.setTreeFromInput([], tempRoot);
  }

  async deleteNode(key: number) {
    const node = deleteNode(BSTreeNode.deepCopy(this.data), key);
    this.setTreeFromInput([], node);
  }

  setTreeFromInput(arr: number[], newRoot?: BSTreeNode) {
    let root: BSTreeNode | undefined;
    if (newRoot) {
      root = newRoot;
    } else {
      root = build(arr);
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
