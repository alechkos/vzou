import { FC } from "react";
import { DFSNode } from "../../../ClassObjects/DFS/DFSNode";
import { Events, NodeRole } from "../BinaryTree/BinaryTreeTypes";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";
import { AnimatePresence } from "framer-motion";
import DFSNodes from "./DFSNode";
import { useAppDispatch } from "../../../store/hooks";
import { setGraphNodes } from "../../../store/reducers/alghoritms/dfs-reducer";

interface Props {
  graphData: DFSNode[];
  speed: number;
  viewportWidth: number;
  passedNodes?: number[];
  visitedNodes?: number[];
  actions: Events | null;
  roles: NodeRole[];
}

const DFS: FC<Props> = ({
  graphData,
  speed,
  viewportWidth,
  passedNodes,
  visitedNodes,
  actions,
  roles,
}) => {
  const dispatch = useAppDispatch();

  DFSItemObj.positions = [];
  const bfsObjects = DFSItemObj.generateBFSObjects(viewportWidth, speed, graphData);

  DFSItemObj.setActions(bfsObjects, actions);
  DFSItemObj.setRoles(bfsObjects, roles);
  if (visitedNodes) {
    DFSItemObj.setVisited(bfsObjects, visitedNodes);
  }
  if (passedNodes) {
    DFSItemObj.setPassed(bfsObjects, passedNodes);
  }

  dispatch(setGraphNodes(bfsObjects));

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
