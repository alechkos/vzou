import AnimationController from "../AnimationController";
import { AppDispatch } from "../../store/store";
import { DFSMemento } from "./DFSMemento";
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
  setCodeRef,
} from "../../store/reducers/alghoritms/dfs-reducer";
import { dfsAnimation, buildDFSNodes } from "./DFSAlgorithms";
import { graphType } from "../../types/GraphTypes";
import { DFSNode } from "./DFSNode";

export class DFSAnimationController extends AnimationController<DFSNode | undefined, string> {
  private static dfsController: DFSAnimationController | null = null;

  graphNodes: DFSNode[];

  private constructor(node: DFSNode | undefined, dispatch: AppDispatch) {
    super(dispatch, new DFSMemento(), node);
    this.graphNodes = [];
  }

  static getController(root: DFSNode | undefined, dispatch: AppDispatch): DFSAnimationController {
    if (!this.dfsController) this.dfsController = new DFSAnimationController(root, dispatch);
    return this.dfsController;
  }

  setGraphNodes(graphData: DFSNode[]) {
    this.graphNodes = graphData;
  }

  setPlaying(value: boolean) {
    this.dispatch(setPlaying(value));
  }

  setHead(node: DFSNode | undefined) {
    this.dispatch(setInitialNode(node));
  }

  setCurrentRoles(roles: NodeRole[]) {
    this.dispatch(setRoles(roles));
  }

  setCurrentActions(actions: Events) {
    this.dispatch(setActions(actions));
  }

  setReference(ref: any) {
    this.dispatch(setCodeRef(ref));
  }

  setPassedNodes(passedNodes: number[]) {
    this.dispatch(setPassedNodes(passedNodes));
  }

  setGraphFromInput(graphData: graphType) {
    const node = buildDFSNodes(graphData, this);
    this.data = node;
    this.setHead(node);
    this.memento.clearSnapshots();
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
  }

  initData(data: DFSNode | undefined) {
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
    this.setPassedNodes((this.memento as DFSMemento).getPassedNodes(index));
    if (actions.length > 0 && actions[0].action === ActionType.ERROR) {
      this.setError(actions[0]?.error || "ERROR");
    }
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  //Animation
  async dfsAnimation(initialValue: number) {
    await this.playAlgorithm(dfsAnimation, this.memento, initialValue, this.graphNodes);
  }
}
