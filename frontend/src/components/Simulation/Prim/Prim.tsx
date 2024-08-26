import { FC } from "react";
import { Events, NodeRole } from "../BinaryTree/BinaryTreeTypes";
import { AnimatePresence } from "framer-motion";
import DFSNodes from "../DFS/DFSNode";
import { useAppDispatch } from "../../../store/hooks";
import { setGraphNodes, setQ, setS } from "../../../store/reducers/alghoritms/prim-reducer";
import { TableDataType } from "../../../types/GraphTypes";
import { PrimNode } from "../../../ClassObjects/Prim/PrimNode";
import { PrimItemObj } from "../../../ClassObjects/Prim/PrimItemObj";

interface Props {
  graphData: PrimNode[];
  speed: number;
  viewportWidth: number;
  passedNodes?: number[];
  visitedNodes?: number[];
  actions: Events | null;
  roles: NodeRole[];
  tableData?: TableDataType;
  S?: number[];
  Q?: PrimNode[];
  directed: boolean;
}

const Prim: FC<Props> = ({
  graphData,
  speed,
  viewportWidth,
  passedNodes,
  visitedNodes,
  actions,
  roles,
  tableData,
  S,
  Q,
  directed,
}) => {
  const dispatch = useAppDispatch();

  PrimItemObj.positions = [];
  PrimItemObj.space = 10;
  const primObjects = PrimItemObj.generatePrimObjects(viewportWidth, speed, graphData);

  PrimItemObj.setActions(primObjects, actions);
  PrimItemObj.setRoles(primObjects, roles);
  if (visitedNodes) {
    PrimItemObj.setVisited(primObjects, visitedNodes);
  }
  if (passedNodes) {
    PrimItemObj.setPassed(primObjects, passedNodes);
  }
  if (tableData) {
    PrimItemObj.setTableData(primObjects, tableData);
  }
  if (S) {
    PrimItemObj.setS(S);
  }
  if (Q) {
    PrimItemObj.setQ(Q);
  }

  dispatch(setGraphNodes(primObjects));

  return (
    <div>
      <AnimatePresence>
        {primObjects.map((nodeObj) => (
          <DFSNodes
            dfsObjects={primObjects}
            nodeObj={nodeObj}
            key={nodeObj.id}
            directed={directed}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Prim;
