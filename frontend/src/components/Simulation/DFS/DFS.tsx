import { FC } from "react";
import { DFSNode } from "../../../ClassObjects/DFS/DFSNode";
import { Events, NodeRole } from "../BinaryTree/BinaryTreeTypes";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";
import { AnimatePresence } from "framer-motion";
import DFSNodes from "./DFSNode";

interface Props {
  initialNode: DFSNode | undefined;
  speed: number;
  viewportWidth: number;
  passedNodes?: number[];
  visitedNodes?: number[];
  actions: Events | null;
  roles: NodeRole[];
}

const DFS: FC<Props> = ({
  initialNode,
  speed,
  viewportWidth,
  passedNodes,
  visitedNodes,
  actions,
  roles,
}) => {
  DFSItemObj.positions = [];
  const bfsObjects = DFSItemObj.generateBFSObjects(viewportWidth, speed, initialNode);

  console.log(bfsObjects);

  DFSItemObj.setActions(bfsObjects, actions);
  DFSItemObj.setRoles(bfsObjects, roles);
  if (visitedNodes) {
    DFSItemObj.setVisited(bfsObjects, visitedNodes);
  }
  if (passedNodes) {
    DFSItemObj.setPassed(bfsObjects, passedNodes);
  }

  return (
    <div>
      <AnimatePresence>
        {bfsObjects.map((nodeObj) => (
          <DFSNodes
            nodeObj={nodeObj}
            key={nodeObj.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DFS;
