import "./LinkedList.css";

import { LinkedListItemObj } from "../../../ClassObjects/LinkedList/LinkedListItemObj";
import { FC } from "react";
import { getAnimationsAndStyles } from "../BinaryTree/Helpers/Functions";
import { motion } from "framer-motion";
import Branch from "../BinaryTree/Branch";

interface Props {
  nodeObj: LinkedListItemObj;
}

const ListNode: FC<Props> = ({ nodeObj }) => {
  // const { initial, animate, style } = getAnimationsAndStyles(
  //   nodeObj.position,
  //   nodeObj.swapPosition,
  //   nodeObj.position
  // );
  const initial = {
    opacity: 0,
  };
  const animate = {
    opacity: 1,
  };
  const style = {};
  let animateObj;
  if (nodeObj.isPassed || nodeObj.isVisited) {
    animateObj = {
      borderColor: nodeObj.isVisited ? "#3f0624" : "#84cc16",
      backgroundColor: nodeObj.isVisited ? "#dde11d" : nodeObj.isPassed ? "#abe7b6" : "#FFFFE0FF",
      ...(animate as any),
    };
  } else {
    animateObj = animate;
  }
  return (
    <div>
      <motion.span
        data-id={nodeObj.id}
        transition={{
          ease: "easeIn",
          duration: 0.4 * nodeObj.speed,
          delay: nodeObj.isPassed ? 0.5 * nodeObj.speed : 0,
        }}
        layout="position"
        initial={initial}
        animate={animateObj}
        key={`${nodeObj.id},${nodeObj.value}`}
        exit={{ opacity: 0, scale: 0.5 }}
        style={{
          ...style,
          top: nodeObj.position.y,
          left: nodeObj.position.x,
        }}
        className={"node"}
      >
        {nodeObj.value === -Infinity ? "−∞" : nodeObj.value}
      </motion.span>
      {nodeObj.branch && (
        <Branch
          branch={nodeObj.branch}
          key={`${nodeObj.id},${nodeObj.value}-Branch`}
          isPassed={nodeObj.isPassed}
          speed={nodeObj.speed}
        />
      )}
    </div>
  );
};

export default ListNode;
