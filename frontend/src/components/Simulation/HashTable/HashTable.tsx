import { HashTableNodeType } from "./HashTableNodeType";
import { Events, NodeRole } from "../BinaryTree/BinaryTreeTypes";
import { FC } from "react";
import { HashTableItemObj } from "../../../ClassObjects/HashTable/HashTableItemObj";
import { AnimatePresence } from "framer-motion";
import HashNode from "./HashNode";
import { LinkedListItemObj } from "../../../ClassObjects/LinkedList/LinkedListItemObj";

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
  hashTableObjects.forEach((obj) => {
    if (obj.valuesForList) {
      LinkedListItemObj.setRoles(obj.valuesForList, roles);
      LinkedListItemObj.setActions(obj.valuesForList, actions);
      if (passedNodes) {
        LinkedListItemObj.setPassed(obj.valuesForList, passedNodes);
      }
    }
  });
  return (
    <div>
      <AnimatePresence>
        {hashTableObjects.map((nodeObj) => (
          <HashNode
            nodeObj={nodeObj}
            key={nodeObj.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HashTable;
