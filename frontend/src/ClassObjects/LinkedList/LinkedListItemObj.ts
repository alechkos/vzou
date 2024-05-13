/** Self-implementation of a LinkedListItem object, has the classic attributes like position, id, value...
 *  Used in LinkedList data type
 */
import { BranchObj } from "../BranchObj";
import { BaseObj } from "../BaseObj";
import { LinkedListNodeType } from "../../components/Simulation/LinkedList/LinkedListTypes";

export class LinkedListItemObj extends BaseObj {
  static width = 6; //Used to calculate X gap

  static gapY = 0;

  parent: LinkedListItemObj | undefined;

  constructor(
    position: { x: number; y: number },
    speed: number,
    id: number,
    value: number,
    parent: LinkedListItemObj | undefined,
    type: "head" | "tail" | "node",
    viewportWidth: number
  ) {
    super(position, speed, id, value, type, viewportWidth, parent);
    this.parent = parent;
    this.calculatePosition();
    this.createBranch();
  }

  getXGap() {
    if (this.parent) {
      return (
        Math.min(this.viewportWidth, LinkedListItemObj.availableSpace) / LinkedListItemObj.width
      );
    }
    return 0;
  }

  calculatePosition() {
    if (this.parent)
      this.position = {
        x: this.parent.position.x + this.getXGap(),
        y: this.parent.position.y + LinkedListItemObj.gapY,
      };
  }

  static generateLinkedListObjects(
    viewportWidth: number,
    speed: number,
    head: LinkedListNodeType | undefined
  ) {
    if (!head) return [];
    const linkedListObjects = [];
    const stack = [
      {
        node: head,
        nodeObj: new LinkedListItemObj(
          { x: viewportWidth / 2 - 120, y: 325 },
          speed,
          head.id,
          head.value,
          undefined,
          "head",
          viewportWidth
        ),
      },
    ];

    while (stack.length) {
      const item = stack.pop();
      if (!item) break;
      const { node, nodeObj } = item;
      if (node.next) {
        stack.push({
          node: node.next,
          nodeObj: new LinkedListItemObj(
            { x: 0, y: 0 }, // will be calculated according to the previous item
            speed,
            node.next.id,
            node.next.value,
            nodeObj,
            "node",
            viewportWidth
          ),
        });
      }
      linkedListObjects.push(nodeObj);
    }

    linkedListObjects.sort((a, b) => a.id - b.id);
    return linkedListObjects;
  }
}
