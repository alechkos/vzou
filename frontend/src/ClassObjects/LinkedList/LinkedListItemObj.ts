/** Self-implementation of a LinkedListItem object, has the classic attributes like position, id, value...
 *  Used in LinkedList data type
 */

export class LinkedListItemObj {
  static availableSpace = 600; // Used to calculate where to place the node.

  static width = 2; //Used to calculate X gap

  static gapY = 65; // Gap from the top of the screen

  position: { x: number; y: number }; //tuple for calculating position

  speed: number;

  id: number;

  value: number;

  arrow: undefined;

  prev: LinkedListItemObj | undefined;

  type: "head" | "tail";

  isVisited: boolean;

  isPassed: boolean;

  viewportWidth: number;

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    arrow: undefined,
    prev: LinkedListItemObj | undefined,
    type: "head" | "tail",
    isVisited: boolean,
    isPassed: boolean,
    viewportWidth: number
  ) {
    this.position = position;
    this.speed = speed;
    this.id = id;
    this.value = value;
    this.arrow = arrow;
    this.prev = prev;
    this.type = type;
    this.isVisited = isVisited;
    this.isPassed = isPassed;
    this.viewportWidth = viewportWidth;
  }

  getXGap() {
    if (this.prev) {
      return (
        Math.min(this.viewportWidth, LinkedListItemObj.availableSpace) / LinkedListItemObj.width
      );
    }
    return 0;
  }

  calculatePosition() {
    if (this.prev)
      this.position = {
        x: this.prev.position.x + this.getXGap(),
        y: this.prev.position.y + LinkedListItemObj.gapY,
      };
  }

  //TODO Create arrow class and methods for create arrow
}
