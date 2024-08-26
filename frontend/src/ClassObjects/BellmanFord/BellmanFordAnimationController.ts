import { AppDispatch } from "../../store/store";
import { BellmanFordNode } from "./BellmanFordNode";
import { GraphNode } from "../GraphNode";
import { setInitialNode } from "../../store/reducers/alghoritms/bellmanFord-reducer";
import { graphType, TableDataType } from "../../types/GraphTypes";
import { bellmanFordAnimation, buildBellmanFordNodes } from "./BellmanFordAlgorithms";
import { DFSNode } from "../DFS/DFSNode";
import {
  ActionType,
  Events,
  NodeRole,
} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import {
  setActions,
  setCodeRef,
  setRoles,
  setError,
  setVisitedNodes,
  setPassedNodes,
  setTableData,
  setPlaying,
} from "../../store/reducers/alghoritms/bellmanFord-reducer";
import AnimationController from "../AnimationController";
import { BellmanFordMemento } from "./BellmanFordMemento";

export class BellmanFordAnimationController extends AnimationController<
  GraphNode | undefined,
  string
> {
  private static bellmanFordController: BellmanFordAnimationController | null = null;

  initialNode: BellmanFordNode | undefined;

  grNodes: BellmanFordNode[];

  private constructor(node: BellmanFordNode | undefined, dispatch: AppDispatch) {
    super(dispatch, new BellmanFordMemento(), node);
    this.initialNode = node;
    this.grNodes = [];
  }

  static getController(
    root: BellmanFordNode | undefined,
    dispatch: AppDispatch
  ): BellmanFordAnimationController {
    if (!this.bellmanFordController)
      this.bellmanFordController = new BellmanFordAnimationController(root, dispatch);
    return this.bellmanFordController;
  }

  setHead(node: GraphNode | undefined) {
    this.dispatch(setInitialNode(node as BellmanFordNode));
  }

  setGraphNodes(graphData: BellmanFordNode[]) {
    this.grNodes = graphData;
  }

  setGraphFromInput(graphData: graphType) {
    const node = buildBellmanFordNodes(graphData, this);
    this.data = node;
    this.setHead(node);
    this.memento.clearSnapshots();
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
    this.setVisitedNodes([]);
    this.setTableData([]);
  }

  setPlaying(value: boolean) {
    this.dispatch(setPlaying(value));
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
    this.setVisitedNodes((this.memento as BellmanFordMemento).getVisitedNodes(index));
    this.setPassedNodes((this.memento as BellmanFordMemento).getPassedNodes(index));
    this.setTableData((this.memento as BellmanFordMemento).getTableData(index));
    if (actions.length > 0 && actions[0].action === ActionType.ERROR) {
      this.setError(actions[0]?.error || "ERROR");
    }
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  //Animation

  async bellmanFordAnimation(
    initialNode: number,
    links: { source: number; target: number; weight?: number }[]
  ) {
    this.grNodes.forEach((node) => {
      node.setD(-1);
      node.setPi(undefined);
    });

    await this.playAlgorithm(bellmanFordAnimation, this.memento, this.grNodes, initialNode, links);
  }
}
