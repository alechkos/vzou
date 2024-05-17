import { LinkedListNodeType } from "./LinkedListTypes";
import { FC } from "react";
import { LinkedListItemObj } from "../../../ClassObjects/LinkedList/LinkedListItemObj";
import { AnimatePresence } from "framer-motion";
import ListNode from "./ListNode";
import { Events, NodeRole } from "../BinaryTree/BinaryTreeTypes";
import { LinkedListNode } from "../../../ClassObjects/LinkedList/LinkedListNode";
import { useAppSelector } from "../../../store/hooks";

interface LinkedListProps {
  head: LinkedListNodeType | undefined;
  speed: number;
  viewportWidth: number;
  passedNodes: number[];
  actions: Events | null;
  roles: NodeRole[];
}

const LinkedList: FC<LinkedListProps> = ({
  head,
  speed,
  viewportWidth,
  roles,
  actions,
  passedNodes,
}) => {
  const linkedListObjects = LinkedListItemObj.generateLinkedListObjects(viewportWidth, speed, head);
  const length = useAppSelector((state) => state.linkedList.currentLength);
  LinkedListItemObj.setRoles(linkedListObjects, roles);
  LinkedListItemObj.setActions(linkedListObjects, actions);
  if (passedNodes) {
    LinkedListItemObj.setPassed(linkedListObjects, passedNodes);
  }
  return (
    <div>
      <AnimatePresence>
        {linkedListObjects.map((nodeObj) => (
          <ListNode
            nodeObj={nodeObj}
            length={length > 0 ? length : linkedListObjects.length - 2}
            key={nodeObj.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LinkedList;
