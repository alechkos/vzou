import { FC } from "react";
import { getAnimationsAndStyles } from "../BinaryTree/Helpers/Functions";
import { motion } from "framer-motion";
import { BfsItemObj } from "../../../ClassObjects/BFS/BfsItemObj";
import Arrow from "../LinkedList/Arrow";
import styles from "./BFSNode.module.css";
import Branch from "../BinaryTree/Branch";
import ArrowForGraph from "./ArrowForGraph";

interface Props {
  nodeObj: BfsItemObj;
}

const ListNode: FC<Props> = ({ nodeObj }) => {
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

  let nameForClass = "node-of-list node-selected";
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
        // className={nodeObj.nodeRole ? nameForClass : "node-of-list"}
        className={styles.node}
      >
        <p>{nodeObj.value === -Infinity ? "−∞" : nodeObj.value}</p>
      </motion.span>
      {nodeObj.branch && (
        // <Arrow
        //   className={"branch-for-graph"}
        //   topLineArrow={nodeObj.topLineForArrow}
        //   botLineArrow={nodeObj.botLineForArrow}
        //   branch={nodeObj.branch}
        //   key={`${nodeObj.id},${nodeObj.value}-Branch`}
        //   isPassed={nodeObj.isPassed}
        //   speed={nodeObj.speed}
        // />
        <ArrowForGraph
          branch={nodeObj.branch}
          isPassed={nodeObj.isPassed}
          speed={nodeObj.speed}
          className={"branch-for-graph"}
        />
      )}
      {/*{nodeObj.branch && (*/}
      {/*  <Branch*/}
      {/*    branch={nodeObj.branch}*/}
      {/*    isPassed={nodeObj.isPassed}*/}
      {/*    speed={nodeObj.speed}*/}
      {/*    className={"branch-for-graph"}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};

export default ListNode;
