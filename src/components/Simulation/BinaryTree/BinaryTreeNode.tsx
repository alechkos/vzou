import "./BinaryTree.css";

import { motion } from "framer-motion";
import { FC } from "react";

import Branch from "./Branch";
import { getAnimationsAndStyles } from "./Helpers/Functions";

import { NodeObj } from "../../../ClassObjects/NodeObj";


interface BinaryTreeNodeProps {
  nodeObj: NodeObj;
}

const BinaryTreeNode: FC<BinaryTreeNodeProps> = ({ nodeObj }) => {
  const { initial, animate, style } = getAnimationsAndStyles(
    nodeObj.action,
    nodeObj.swapPosition,
    nodeObj.position,
  );
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
        data-id={nodeObj.nodeRole}
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
        className={nodeObj.nodeRole ? "node node-selected" : "node"}
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

export default BinaryTreeNode;
