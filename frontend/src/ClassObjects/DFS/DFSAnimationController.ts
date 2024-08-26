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
  setVisitedNodes,
  setTableData,
} from "../../store/reducers/alghoritms/dfs-reducer";
import { dfsAnimation, buildDFSNodes } from "./DFSAlgorithms";
import { graphType, TableDataType } from "../../types/GraphTypes";
import { DFSNode } from "./DFSNode";
import { GraphNode } from "../GraphNode";

export class DFSAnimationController extends AnimationController<GraphNode | undefined, string> {
  private static dfsController: DFSAnimationController | null = null;

  graphNodes: DFSNode[];

  protected constructor(node: GraphNode | undefined, dispatch: AppDispatch) {
    super(dispatch, new DFSMemento(), node);
    this.graphNodes = [];
  }

  static getController(root: GraphNode | undefined, dispatch: AppDispatch): DFSAnimationController {
    if (!this.dfsController) this.dfsController = new DFSAnimationController(root, dispatch);
    return this.dfsController;
  }

  setGraphNodes(graphData: DFSNode[]) {
    this.graphNodes = graphData;
  }

  setPlaying(value: boolean) {
    this.dispatch(setPlaying(value));
  }

  setHead(node: GraphNode | undefined) {
    this.dispatch(setInitialNode(node as DFSNode));
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

  setVisitedNodes(visitedNodes: number[]) {
    this.dispatch(setVisitedNodes(visitedNodes));
  }

  setTableData(tableData: TableDataType) {
    this.dispatch(setTableData(tableData));
  }

  setGraphFromInput(graphData: graphType) {
    const node = buildDFSNodes(graphData, this);
    this.data = node;
    this.setHead(node);
    this.memento.clearSnapshots();
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
    this.setVisitedNodes([]);
    this.setTableData([]);
  }

  initData(data: GraphNode | undefined) {
    this.setReference({ name: this.memento.getCurrentAlg(), line: 0 });
    this.setHead(data);
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
    this.setVisitedNodes([]);
    this.setTableData([]);
  }

  setAllData(index: number) {
    const actions = this.memento.getActions(index);
    this.setHead(this.memento.getData(index));
    this.setCurrentActions(actions);
    this.setCurrentRoles(this.memento.getRoles(index));
    this.setReference(this.memento.getCodeRef(index));
    this.setVisitedNodes((this.memento as DFSMemento).getVisitedNodes(index));
    this.setPassedNodes((this.memento as DFSMemento).getPassedNodes(index));
    this.setTableData((this.memento as DFSMemento).getTableData(index));
    if (actions.length > 0 && actions[0].action === ActionType.ERROR) {
      this.setError(actions[0]?.error || "ERROR");
    }
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  //Animation
  async dfsAnimation() {
    this.graphNodes.forEach((node) => {
      node.setF(0);
      node.setColor("");
      node.setD(0);
      node.setPi(undefined);
    });
    await this.playAlgorithm(dfsAnimation, this.memento, this.graphNodes);
  }
}
