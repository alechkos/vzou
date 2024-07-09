import { FC } from "react";
import { getAnimationsAndStyles } from "../BinaryTree/Helpers/Functions";
import { motion } from "framer-motion";
import { HashTableItemObj } from "../../../ClassObjects/HashTable/HashTableItemObj";
import ListNode from "../LinkedList/ListNode";
import Branch from "../BinaryTree/Branch";
import Arrow from "../LinkedList/Arrow";

interface Props {
  nodeObj: HashTableItemObj;
}
const HashNode: FC<Props> = ({ nodeObj }) => {
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
        className={nodeObj.nodeRole ? "node-of-list hashNode-selected" : "node-of-list"}
      >
        <p>{nodeObj.value === -Infinity ? "−∞" : nodeObj.value}</p>

        {nodeObj.branch && (
          <Branch
            branch={nodeObj.branch}
            isPassed={nodeObj.isPassed}
            speed={nodeObj.speed}
          />
        )}
        {nodeObj.valuesForList &&
          nodeObj.valuesForList.length > 0 &&
          nodeObj.valuesForList.map((value) => (
            <ListNode
              nodeObj={value}
              length={nodeObj.valuesForList?.length}
              forHash={true}
            />
          ))}
      </motion.span>
    </div>
  );
};

export default HashNode;
