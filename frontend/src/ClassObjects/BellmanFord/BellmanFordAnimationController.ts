import { DFSAnimationController } from "../DFS/DFSAnimationController";
import { AppDispatch } from "../../store/store";
import { BellmanFordNode } from "./BellmanFordNode";
import { GraphNode } from "../GraphNode";
import { setInitialNode } from "../../store/reducers/alghoritms/bellmanFord-reducer";
import { graphType } from "../../types/GraphTypes";
import { buildBellmanFordNodes } from "./BellmanFordAlgorithms";

export class BellmanFordAnimationController extends DFSAnimationController {
  private static bellmanFordController: BellmanFordAnimationController | null = null;

  initialNode: BellmanFordNode | undefined;

  grNodes: BellmanFordNode[];

  private constructor(node: BellmanFordNode | undefined, dispatch: AppDispatch) {
    super(node, dispatch);
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

  //Animation

  async bellmanFordAnimation() {}
}
