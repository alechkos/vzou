import { BSTreeMemento } from "./BSTreeMemento";
import BSTreeAnimationController from "./BSTreeAnimationController";
import { BSTreeNode } from "./BSTreeNode";

import { buildTree, insert } from "../../components/Simulation/AVL/AVL_Algorithms";
import { calculateHeight } from "../../components/Simulation/BinaryTree/Helpers/Functions";
import {
  deleteNodeWrapper,
  insertWithAnimations,
} from "../../components/Simulation/BST/BST_Algorithms";
import { AppDispatch } from "../../store/store";
import { addToInputArray, deleteFromInputArray } from "../../store/reducers/alghoritms/bst-reducer";

export class BfsAnimationController extends BSTreeAnimationController {
  private static bfsController: BfsAnimationController | null = null;

  private constructor(root: BSTreeNode | undefined, dispatch: AppDispatch) {
    super(root, dispatch);
  }

  static getController(
    root: BSTreeNode | undefined,
    dispatch: AppDispatch
  ): BfsAnimationController {
    if (!this.bfsController) this.bfsController = new BfsAnimationController(root, dispatch);
    return this.bfsController;
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

  setGraphFromInput(arr: number[]) {
    let root: BSTreeNode | undefined;
    root = buildTree(arr); // Пример: используем buildTree для простоты
    this.data = root;
    this.memento.clearSnapshots();
    this.setRoot(root);
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setVisitedNodes([]);
    this.setPassedNodes([]);
    this.setTraversalResult([]);
  }

  async startBFS() {
    // Добавьте логику для запуска анимации BFS
    // Например, можете использовать метод this.playAlgorithm для выполнения BFS
    console.log("Starting BFS animation...");
  }
}
