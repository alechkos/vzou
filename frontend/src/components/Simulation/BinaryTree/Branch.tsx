import "./BinaryTree.css";

import { motion } from "framer-motion";
import { FC } from "react";

import { BranchObj } from "../../../ClassObjects/BranchObj";

interface BranchProps {
  branch: BranchObj;
  isPassed: boolean;
  isVisited?: boolean;
  speed: number;
  className?: string;
}

const Branch: FC<BranchProps> = ({ branch, isPassed, speed, className, isVisited }) => (
  <motion.span
    className={className ? className : "branch"}
    exit={{ opacity: 0 }}
    style={branch.getStyle(isPassed, false, isVisited)}
    transition={branch.getAnimationStyle(speed, isPassed)[1]}
    animate={branch.getAnimationStyle(speed, isPassed)[0]}
  />
);
export default Branch;

//
