import {BranchObj} from "./BranchObj";
import {ActionType} from "../components/Simulation/BinaryTree/BinaryTreeTypes";

/*
 * The base class for objects for data structures vizualization
 * */

export abstract class BaseObj {
  static availableSpace = 600; // Used to calculate where to place the node.

  static gapY = 65; // Gap from the top of the screen

  position: { x: number; y: number }; //tuple for calculating position

  speed: number;

  id: number;

  value: number;

  branch: BranchObj | null;

  type: string;

  isVisited: boolean;

  isPassed: boolean;

  viewportWidth: number;

  parent: BaseObj | undefined;

  action: ActionType;

  nodeRole?: string;

  protected constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    type: string,
    viewportWidth: number,
    parent: BaseObj | undefined
  ) {
    this.action = ActionType.NONE;
    this.position = position;
    this.speed = speed;
    this.id = id;
    this.value = value;
    this.branch = null;
    this.type = type;
    this.isVisited = false;
    this.isPassed = false;
    this.viewportWidth = viewportWidth;
    this.parent = parent;
  }

  getXGap(): any {
    //implement is subClass
  }

  calculatePosition() {
    //implement in subclass
  }

  createBranch() {
    if (this.type === "root" || this.type === "head") {
      // waht have to be here?
    } else if (this.parent === undefined || this.parent.position === undefined) {
      throw new Error("parent is null or parent position is null");
    } else {
      this.branch = new BranchObj({
        x1: this.parent.position.x,
        x2: this.position.x,
        y1: this.parent.position.y,
        y2: this.position.y,
      });
    }
  }
}
