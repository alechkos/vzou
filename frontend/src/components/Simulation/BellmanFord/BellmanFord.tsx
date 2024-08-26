import { FC } from "react";
import { Events, NodeRole } from "../BinaryTree/BinaryTreeTypes";
import { AnimatePresence } from "framer-motion";
import DFSNodes from "../DFS/DFSNode";
import { useAppDispatch } from "../../../store/hooks";
import { setGraphNodes } from "../../../store/reducers/alghoritms/bellmanFord-reducer";
import { TableDataType } from "../../../types/GraphTypes";
import { BellmanFordItemObj } from "../../../ClassObjects/BellmanFord/BellmanFordItemObj";
import { BellmanFordNode } from "../../../ClassObjects/BellmanFord/BellmanFordNode";

interface Props {
  graphData: BellmanFordNode[];
  speed: number;
  viewportWidth: number;
  passedNodes?: number[];
  visitedNodes?: number[];
  actions: Events | null;
  roles: NodeRole[];
  tableData?: TableDataType;
  directed: boolean;
}

const BellmanFord: FC<Props> = ({
  graphData,
  speed,
  viewportWidth,
  passedNodes,
  visitedNodes,
  actions,
  roles,
  tableData,
  directed,
}) => {
  const dispatch = useAppDispatch();

  BellmanFordItemObj.positions = [];
  BellmanFordItemObj.space = 10;
  const bfObjects = BellmanFordItemObj.generateBFObjects(viewportWidth, speed, graphData);

  BellmanFordItemObj.setActions(bfObjects, actions);
  BellmanFordItemObj.setRoles(bfObjects, roles);
  if (visitedNodes) {
    BellmanFordItemObj.setVisited(bfObjects, visitedNodes);
  }
  if (passedNodes) {
    BellmanFordItemObj.setPassed(bfObjects, passedNodes);
  }
  if (tableData) {
    BellmanFordItemObj.setTableData(bfObjects, tableData);
  }

  dispatch(setGraphNodes(bfObjects));

  return (
    <div>
      <AnimatePresence>
        {bfObjects.map((nodeObj) => (
          <DFSNodes
            dfsObjects={bfObjects}
            nodeObj={nodeObj}
            key={nodeObj.id}
            directed={directed}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BellmanFord;
