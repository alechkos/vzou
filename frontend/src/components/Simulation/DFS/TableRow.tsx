import { motion } from "framer-motion";
import { FC } from "react";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";
import styles from "./DFSNode.module.css";
import { getAnimationsAndStylesForRow } from "./AnimationFunc";

interface Props {
  rowData: string | number;
  nodeObj: DFSItemObj;
}

const TableRow: FC<Props> = ({ nodeObj, rowData }) => {
  const { initial, animate, style } = getAnimationsAndStylesForRow(nodeObj.action, null);

  let animateObj;
  if (nodeObj.isPassed || nodeObj.isVisited) {
    animateObj = {
      borderColor: nodeObj.isVisited ? "#3f0624" : "#84cc16",
      backgroundColor: nodeObj.isVisited ? "#dde11d" : "#FFFFE0FF",
      ...(animate as any),
    };
  } else {
    animateObj = animate;
  }

  let nameForClass = `${styles.node} node-selected`;

  return (
    <motion.td
      data-id={nodeObj.nodeRole}
      layout="position"
      initial={initial}
      animate={animateObj}
      key={`${nodeObj.id},${nodeObj.value}`}
      exit={{ opacity: 0, scale: 0.5 }}
      style={{
        ...style,
      }}
      // className={nodeObj.nodeRole ? nameForClass : styles.node}
    >
      {rowData}
    </motion.td>
  );
};

export default TableRow;
