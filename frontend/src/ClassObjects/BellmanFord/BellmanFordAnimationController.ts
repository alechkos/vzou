import { DFSAnimationController } from "../DFS/DFSAnimationController";
import { AppDispatch } from "../../store/store";
import { BellmanFordNode } from "./BellmanFordNode";
import { GraphNode } from "../GraphNode";
import { setInitialNode } from "../../store/reducers/alghoritms/bellmanFord-reducer";

export class BellmanFordAnimationController extends DFSAnimationController {
  private static bellmanFordController: BellmanFordAnimationController | null = null;

  initialNode: BellmanFordNode | undefined;

  private constructor(node: BellmanFordNode | undefined, dispatch: AppDispatch) {
    super(node, dispatch);
    this.initialNode = node;
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
}
