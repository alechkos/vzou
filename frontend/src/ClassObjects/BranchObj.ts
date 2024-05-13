/** Self-implemented class for branches, as used in every tree representation in the project.
 * The branches have a tuple of (x1, y1, x2, y2) coordinates, marking where they appear on the page.
 *
 */
export class BranchObj {
  static baseSize = 18;

  x1: number;

  x2: number;

  y1: number;

  y2: number;

  isArrow?: boolean;

  constructor(position: { x1: number; y1: number; x2: number; y2: number }, isArrow?: boolean) {
    const { x1, x2, y1, y2 } = position;
    this.x1 = x1 + BranchObj.baseSize;
    this.x2 = x2 + BranchObj.baseSize;
    this.y1 = y1 + BranchObj.baseSize;
    this.y2 = y2 + BranchObj.baseSize;
    this.isArrow = isArrow;
  }

  getBranchLength() {
    if (this.isArrow) {
      this.x1 = this.x1 + 19;
      return Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2);
    }
    return Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2);
  }

  getRotateAngle() {
    return (Math.atan2(this.y2 - this.y1, this.x2 - this.x1) * 180) / Math.PI;
  }

  getBranchPosition() {
    return {
      x1: this.x1,
      x2: this.x2,
      y1: this.y1,
      y2: this.y2,
    };
  }

  /** Get the style of the branch, depending on if we're currently in a 'passing algorithm'
   * <br>
   * A passing algorithm is one such algorithm where a traversal is displayed, much like an inorder scan.
   * In that case, we use a special style for the branch to represent the path.
   */
  getStyle(isPassed = false) {
    if (!isPassed) {
      return {
        top: `${this.y1}px`,
        left: `${this.x1}px`,
        width: `${this.getBranchLength()}px`,
        transform: `rotate(${this.getRotateAngle()}deg)`,
      };
    }
    return {
      top: `${this.y1}px`,
      left: `${this.x1}px`,
      width: `${this.getBranchLength()}px`,
      transform: `rotate(${this.getRotateAngle()}deg)`,
      background: "linear-gradient(to right, black, red)",
      backgroundSize: "200% 100%",
      backgroundPosition: "100% 0%",
    };
  }

  /** Very similar to getStyle, except used for when an animation needs to be played on the branch.
   *
   * @see getStyle
   */
  getAnimationStyle(speed: number, isPassed = false) {
    if (!isPassed) {
      return [{}, {}];
    }
    return [
      { backgroundPosition: "-100% 0%", height: "3px" },
      { ease: "linear", duration: 0.4 * speed },
    ];
  }
}
