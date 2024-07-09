import AnimationController from "../AnimationController";
import { BFSNode } from "./BFSNode";
import { AppDispatch } from "../../store/store";
import { BFSMemento } from "./BFSMemento";
import { NodeRole } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { Events } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import { ActionType } from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import {
  setPlaying,
  setInitialNode,
  setRoles,
  setActions,
  setPassedNodes,
  setError,
} from "../../store/reducers/alghoritms/bfs-reducer";
import { bfsAnimation, buildBFSNodes, graphType } from "./BFSAlgorithms";

export class BfsAnimationController extends AnimationController<BFSNode | undefined, string> {
  private static bfsController: BfsAnimationController | null = null;

  private constructor(node: BFSNode | undefined, dispatch: AppDispatch) {
    super(dispatch, new BFSMemento(), node);
  }

  static getController(root: BFSNode | undefined, dispatch: AppDispatch): BfsAnimationController {
    if (!this.bfsController) this.bfsController = new BfsAnimationController(root, dispatch);
    return this.bfsController;
  }

  setPlaying(value: boolean) {
    this.dispatch(setPlaying(value));
  }

  setHead(node: BFSNode | undefined) {
    this.dispatch(setInitialNode(node));
  }

  setCurrentRoles(roles: NodeRole[]) {
    this.dispatch(setRoles(roles));
  }

  setCurrentActions(actions: Events) {
    this.dispatch(setActions(actions));
  }

  // setReference(ref: any) {
  //   this.dispatch(setCodeRef(ref));
  // }

  setPassedNodes(passedNodes: number[]) {
    this.dispatch(setPassedNodes(passedNodes));
  }

  setGraphFromInput(graphData: graphType, initialNode: number) {
    const node = buildBFSNodes(graphData, initialNode);
    this.data = node;
    this.setHead(node);
    this.memento.clearSnapshots();
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
  }

  initData(data: BFSNode | undefined) {
    this.setReference({ name: this.memento.getCurrentAlg(), line: 0 });
    this.setHead(data);
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
  }

  setAllData(index: number) {
    const actions = this.memento.getActions(index);
    this.setHead(this.memento.getData(index));
    this.setCurrentActions(actions);
    this.setCurrentRoles(this.memento.getRoles(index));
    this.setReference(this.memento.getCodeRef(index));
    this.setPassedNodes((this.memento as BFSMemento).getPassedNodes(index));
    if (actions.length > 0 && actions[0].action === ActionType.ERROR) {
      this.setError(actions[0]?.error || "ERROR");
    }
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  //Animation

  async bfsAnimation() {
    await this.playAlgorithm(bfsAnimation, this.memento);
  }
}
