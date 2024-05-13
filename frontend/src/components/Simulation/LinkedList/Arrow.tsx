import { motion } from "framer-motion";
import { FC } from "react";

import { BranchObj } from "../../../ClassObjects/BranchObj";
import Branch from "../BinaryTree/Branch";

interface ArrowProps {
  topLineArrow: BranchObj;
  botLineArrow: BranchObj;
  branch: BranchObj;
  isPassed: boolean;
  speed: number;
  className?: string;
}

const Arrow: FC<ArrowProps> = ({
  topLineArrow,
  botLineArrow,
  branch,
  isPassed,
  speed,
  className,
}) => {
  return (
    <div>
      <Branch
        branch={topLineArrow}
        isPassed={isPassed}
        speed={speed}
        className={className}
      />
      <Branch
        branch={branch}
        isPassed={isPassed}
        speed={speed}
        className={className}
      />
      <Branch
        branch={botLineArrow}
        isPassed={isPassed}
        speed={speed}
        className={className}
      />
    </div>
  );
};

export default Arrow;
