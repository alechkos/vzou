import { HashTableNodeType } from "./HashTableNodeType";
import { Events, NodeRole } from "../BinaryTree/BinaryTreeTypes";
import { FC } from "react";
import { HashTableItemObj } from "../../../ClassObjects/HashTable/HashTableItemObj";
import { AnimatePresence } from "framer-motion";
import ListNode from "../LinkedList/ListNode";

interface Props {
  head: HashTableNodeType | undefined;
  speed: number;
  viewportWidth: number;
  passedNodes?: number[];
  visitedNodes?: number[];
  actions: Events | null;
  roles: NodeRole[];
}

const HashTable: FC<Props> = ({
  head,
  speed,
  viewportWidth,
  passedNodes,
  visitedNodes,
  actions,
  roles,
}) => {
  const hashTableObjects = HashTableItemObj.generateHashTableObjects(viewportWidth, speed, head);
  HashTableItemObj.setActions(hashTableObjects, actions);
  HashTableItemObj.setRoles(hashTableObjects, roles);
  if (visitedNodes) {
    HashTableItemObj.setVisited(hashTableObjects, visitedNodes);
  }
  if (passedNodes) {
    HashTableItemObj.setPassed(hashTableObjects, passedNodes);
  }
  return (
    <div>
      <AnimatePresence>
        {hashTableObjects.map((nodeObj) => (
          <div></div>
          // <ListNode
          //   nodeObj={nodeObj}
          //   length={length > 0 ? length : linkedListObjects.length - 2}
          //   key={nodeObj.id}
          // />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HashTable;
