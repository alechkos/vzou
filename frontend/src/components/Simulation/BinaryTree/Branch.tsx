import "./BinaryTree.css";

import { motion } from "framer-motion";
import { FC } from "react";

import { BranchObj } from "../../../ClassObjects/BranchObj";
import { BFBranch } from "../../../ClassObjects/BellmanFord/BFBranch";

interface BranchProps {
  branch: BranchObj | BFBranch;
  isPassed: boolean;
  isVisited?: boolean;
  speed: number;
  className?: string;
}

const Branch: FC<BranchProps> = ({ branch, isPassed, speed, className, isVisited }) => {
  const isBFBranch = branch instanceof BFBranch;

  return (
    <motion.span
      className={className ? className : "branch"}
      exit={{ opacity: 0 }}
      style={branch.getStyle(isPassed, false, isVisited)}
      transition={branch.getAnimationStyle(speed, isPassed)[1]}
      animate={branch.getAnimationStyle(speed, isPassed)[0]}
    >
      <span
        style={{
          position: "absolute",
          transform: branch.rotate > 90 ? `rotate(180deg)` : "",
          top: "0",
          left: "70%",
        }}
      >
        {isBFBranch && branch.weight}
      </span>
    </motion.span>
  );
};
export default Branch;
