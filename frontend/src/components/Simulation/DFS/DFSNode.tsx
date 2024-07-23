import { FC } from "react";
import { getAnimationsAndStyles } from "../BinaryTree/Helpers/Functions";
import { motion } from "framer-motion";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";
import Arrow from "../LinkedList/Arrow";
import styles from "./DFSNode.module.css";
import Branch from "../BinaryTree/Branch";
import ArrowForGraph from "./ArrowForGraph";
import branch from "../BinaryTree/Branch";

interface Props {
  nodeObj: DFSItemObj;
  dfsObjects: DFSItemObj[];
  directed: boolean;
}

const DFSNode: FC<Props> = ({ nodeObj, dfsObjects, directed }) => {
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

  const parent = dfsObjects.find((node) => node.id === nodeObj.pi);

  let nameForClass = `${styles.node} node-selected`;
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
        className={nodeObj.nodeRole ? nameForClass : styles.node}
      >
        <p>{nodeObj.value === -Infinity ? "−∞" : nodeObj.value}</p>
      </motion.span>
      {nodeObj.branches.length > 0 &&
        !directed &&
        nodeObj.branches.map((branch) => (
          <ArrowForGraph
            key={nodeObj.position.x}
            branch={branch}
            isPassed={parent?.position.x === branch.x1 ? nodeObj.isPassed : false}
            isVisited={parent?.position.x !== branch.x1 ? nodeObj.isVisited : false}
            speed={nodeObj.speed}
            className={"branch-for-graph"}
          />
        ))}
      {nodeObj.branches.length > 0 &&
        directed &&
        nodeObj.branches.map((branch) => (
          <Branch
            key={nodeObj.position.x}
            branch={branch}
            isPassed={parent?.position.x === branch.x1 ? nodeObj.isPassed : false}
            isVisited={parent?.position.x !== branch.x1 ? nodeObj.isVisited : false}
            speed={nodeObj.speed}
            className={"branch-for-graph"}
          />
        ))}
    </div>
  );
};

export default DFSNode;
