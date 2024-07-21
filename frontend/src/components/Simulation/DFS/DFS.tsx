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
  tableData?: { id: number; data: { color: string; pi: number; d: number; f: number } }[];
}

const DFS: FC<Props> = ({
  graphData,
  speed,
  viewportWidth,
  passedNodes,
  visitedNodes,
  actions,
  roles,
  tableData,
}) => {
  const dispatch = useAppDispatch();

  DFSItemObj.positions = [];
  DFSItemObj.space = 10;
  const dfsObjects = DFSItemObj.generateBFSObjects(viewportWidth, speed, graphData);

  DFSItemObj.setActions(dfsObjects, actions);
  DFSItemObj.setRoles(dfsObjects, roles);
  if (visitedNodes) {
    DFSItemObj.setVisited(dfsObjects, visitedNodes);
  }
  if (passedNodes) {
    DFSItemObj.setPassed(dfsObjects, passedNodes);
  }
  if (tableData) {
    DFSItemObj.setTableData(dfsObjects, tableData);
  }

  dispatch(setGraphNodes(dfsObjects));

  return (
    <div>
      <AnimatePresence>
        {dfsObjects.map((nodeObj) => (
          <DFSNodes
            dfsObjects={dfsObjects}
            nodeObj={nodeObj}
            key={nodeObj.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DFS;
