import "./LinkedList.css";

import { LinkedListItemObj } from "../../../ClassObjects/LinkedList/LinkedListItemObj";
import { FC } from "react";
import { getAnimationsAndStyles } from "../BinaryTree/Helpers/Functions";
import { motion } from "framer-motion";
import Arrow from "./Arrow";

interface Props {
  nodeObj: LinkedListItemObj;
  length: number;
}

const ListNode: FC<Props> = ({ nodeObj, length }) => {
  const { initial, animate, style } = getAnimationsAndStyles(
      nodeObj.action,
      null,
      nodeObj.position
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
      {nodeObj.id === -1 && (
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
          className={"null-node"}
        >
          <span className={"line-for-null"} />
        </motion.span>
      )}
      {nodeObj.id !== -1 && (
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
          className={"node-of-list"}
        >
          {length === 2 && <span className={"head-of-list"}>
            {"Head | Tail"}
          </span>}
          {nodeObj.id === 0 && length !== 2 && <span className={"head-of-list"}>
            {"Head"}
          </span>}
          {nodeObj.id === length - 2 && length !== 2 && <span className={"head-of-list"}>
            {"Tail"}
          </span>}
          <p className={"half"}>{nodeObj.value === -Infinity ? "−∞" : nodeObj.value}</p>
          <p className={"half2"}>{"Next"}</p>
        </motion.span>
      )}
      {nodeObj.branch && nodeObj.topLineForArrow && nodeObj.botLineForArrow && (
        <Arrow
          className={"branch-of-list"}
          topLineArrow={nodeObj.topLineForArrow}
          botLineArrow={nodeObj.botLineForArrow}
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
