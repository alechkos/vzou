import { LinkedListNodeType } from "./LinkedListTypes";
import { FC } from "react";
import { LinkedListItemObj } from "../../../ClassObjects/LinkedList/LinkedListItemObj";
import { AnimatePresence } from "framer-motion";
import BinaryTreeNode from "../BinaryTree/BinaryTreeNode";
import ListNode from "./ListNode";

interface LinkedListProps {
  head: LinkedListNodeType | undefined;
  speed: number;
  viewportWidth: number;
}

const LinkedList: FC<LinkedListProps> = ({ head, speed, viewportWidth }) => {
  const linkedListObjects = LinkedListItemObj.generateLinkedListObjects(viewportWidth, speed, head);
  return (
    <div>
      <AnimatePresence>
        {linkedListObjects.map((nodeObj) => (
          <ListNode
            nodeObj={nodeObj}
            key={nodeObj.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LinkedList;
