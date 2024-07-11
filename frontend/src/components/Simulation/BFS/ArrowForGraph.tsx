import { FC } from "react";
import { BranchObj } from "../../../ClassObjects/BranchObj";
import Branch from "../BinaryTree/Branch";
import "./ArrowForGraph.css";
import { motion } from "framer-motion";

interface Props {
  branch: BranchObj;
  isPassed: boolean;
  speed: number;
  className?: string;
}

const ArrowForGraph: FC<Props> = ({ branch, isPassed, speed, className }) => {
  return (
    <div>
      <Branch
        branch={branch}
        isPassed={isPassed}
        speed={speed}
        className={className}
      />
      <motion.span
        className={"arrow-right"}
        exit={{ opacity: 0 }}
        style={branch.getStyle(isPassed, true)}
        transition={branch.getAnimationStyle(speed, isPassed)[1]}
        animate={branch.getAnimationStyle(speed, isPassed)[0]}
      />
    </div>
  );
};

export default ArrowForGraph;
