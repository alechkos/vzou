import { BranchObj } from "../BranchObj";

export class BFBranch extends BranchObj {
  weight: number;
  constructor(
    position: { x1: number; y1: number; x2: number; y2: number },
    weight: number,
    isArrow?: boolean,
    isGraph?: boolean
  ) {
    super(position, isArrow, isGraph);
    this.weight = weight;
  }
}
