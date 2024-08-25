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
  setT,
  setLinks,
} from "../../store/reducers/alghoritms/kruskal-reducer";
import { graphType, KruskalTableType, linksType, TableDataType } from "../../types/GraphTypes";
import { KruskalNode } from "./KruskalNode";
import { KruskalMemento } from "./KruskalMemento";
import { buildKruskalNodes, kruskalAnimation } from "./KruskalAlgorithms";

export class KruskalAnimationController extends AnimationController<
  KruskalNode | undefined,
  string
> {
  private static kruskalController: KruskalAnimationController | null = null;

  graphNodes: KruskalNode[];

  protected constructor(node: KruskalNode | undefined, dispatch: AppDispatch) {
    super(dispatch, new KruskalMemento(), node);
    this.graphNodes = [];
  }

  static getController(
    root: KruskalNode | undefined,
    dispatch: AppDispatch
  ): KruskalAnimationController {
    if (!this.kruskalController)
      this.kruskalController = new KruskalAnimationController(root, dispatch);
    return this.kruskalController;
  }

  setGraphNodes(graphData: KruskalNode[]) {
    this.graphNodes = graphData;
  }

  setPlaying(value: boolean) {
    this.dispatch(setPlaying(value));
  }

  setHead(node: KruskalNode | undefined) {
    this.dispatch(setInitialNode(node as KruskalNode));
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

  setTableData(tableData: KruskalTableType) {
    this.dispatch(setTableData(tableData));
  }

  setLinks(links: linksType) {
    this.dispatch(setLinks(links));
  }

  setT(T: linksType) {
    this.dispatch(setT(T));
  }

  setGraphFromInput(graphData: graphType) {
    const node = buildKruskalNodes(graphData, this);
    this.data = node;
    this.setHead(node);
    this.memento.clearSnapshots();
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
    this.setVisitedNodes([]);
    this.setTableData([]);
    this.setLinks([]);
    this.setT([]);
  }

  initData(data: KruskalNode | undefined) {
    this.setReference({ name: this.memento.getCurrentAlg(), line: 0 });
    this.setHead(data);
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
    this.setVisitedNodes([]);
    this.setTableData([]);
    this.setLinks([]);
    this.setT([]);
  }

  setAllData(index: number) {
    const actions = this.memento.getActions(index);
    this.setHead(this.memento.getData(index));
    this.setCurrentActions(actions);
    this.setCurrentRoles(this.memento.getRoles(index));
    this.setReference(this.memento.getCodeRef(index));
    this.setVisitedNodes((this.memento as KruskalMemento).getVisitedNodes(index));
    this.setPassedNodes((this.memento as KruskalMemento).getPassedNodes(index));
    this.setTableData((this.memento as KruskalMemento).getTableData(index));
    this.setLinks((this.memento as KruskalMemento).getLinks(index));
    this.setT((this.memento as KruskalMemento).getT(index));
    if (actions.length > 0 && actions[0].action === ActionType.ERROR) {
      this.setError(actions[0]?.error || "ERROR");
    }
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  //Animation
  async doKruskalAnimation(links: linksType) {
    await this.playAlgorithm(kruskalAnimation, this.memento, this.graphNodes, links);
  }
}
