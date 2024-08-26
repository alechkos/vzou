import AnimationController from "../AnimationController";
import { AppDispatch } from "../../store/store";
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
  setS,
  setQ,
} from "../../store/reducers/alghoritms/prim-reducer";
import { graphType, TableDataType } from "../../types/GraphTypes";
import { PrimNode } from "./PrimNode";
import { PrimMemento } from "./PrimMemento";
import { buildPrimNodes, primAlgorithm } from "./PrimAlgorithms";

export class PrimAnimationController extends AnimationController<PrimNode | undefined, string> {
  private static primController: PrimAnimationController | null = null;

  graphNodes: PrimNode[];

  protected constructor(node: PrimNode | undefined, dispatch: AppDispatch) {
    super(dispatch, new PrimMemento(), node);
    this.graphNodes = [];
  }

  static getController(root: PrimNode | undefined, dispatch: AppDispatch): PrimAnimationController {
    if (!this.primController) this.primController = new PrimAnimationController(root, dispatch);
    return this.primController;
  }

  setGraphNodes(graphData: PrimNode[]) {
    this.graphNodes = graphData;
  }

  setPlaying(value: boolean) {
    this.dispatch(setPlaying(value));
  }

  setHead(node: PrimNode | undefined) {
    this.dispatch(setInitialNode(node as PrimNode));
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

  setS(S: number[]) {
    this.dispatch(setS(S));
  }

  setQ(Q: PrimNode[]) {
    this.dispatch(setQ(Q));
  }

  setGraphFromInput(graphData: graphType) {
    const node = buildPrimNodes(graphData, this);
    this.data = node;
    this.setHead(node);
    this.memento.clearSnapshots();
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
    this.setVisitedNodes([]);
    this.setTableData([]);
    this.setS([]);
    this.setQ([]);
  }

  initData(data: PrimNode | undefined) {
    this.setReference({ name: this.memento.getCurrentAlg(), line: 0 });
    this.setHead(data);
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
    this.setVisitedNodes([]);
    this.setTableData([]);
    this.setS([]);
    this.setQ([]);
  }

  setAllData(index: number) {
    const actions = this.memento.getActions(index);
    this.setHead(this.memento.getData(index));
    this.setCurrentActions(actions);
    this.setCurrentRoles(this.memento.getRoles(index));
    this.setReference(this.memento.getCodeRef(index));
    this.setVisitedNodes((this.memento as PrimMemento).getVisitedNodes(index));
    this.setPassedNodes((this.memento as PrimMemento).getPassedNodes(index));
    this.setTableData((this.memento as PrimMemento).getTableData(index));
    this.setQ((this.memento as PrimMemento).getQ(index));
    this.setS((this.memento as PrimMemento).getS(index));
    if (actions.length > 0 && actions[0].action === ActionType.ERROR) {
      this.setError(actions[0]?.error || "ERROR");
    }
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  //Animation
  async primAnimation(
    initialNode: number,
    links: { source: number; target: number; weight?: number }[]
  ) {
    this.graphNodes.forEach((node) => {
      node.setD(Infinity);
      node.setPi(undefined);
    });

    await this.playAlgorithm(primAlgorithm, this.memento, this.graphNodes, initialNode, links);
  }
}
