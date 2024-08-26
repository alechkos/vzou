import { FC } from "react";
import { Events, NodeRole } from "../BinaryTree/BinaryTreeTypes";
import { AnimatePresence } from "framer-motion";
import DFSNodes from "../DFS/DFSNode";
import { useAppDispatch } from "../../../store/hooks";
import { setGraphNodes } from "../../../store/reducers/alghoritms/kruskal-reducer";
import { KruskalTableType, linksType } from "../../../types/GraphTypes";
import { KruskalNode } from "../../../ClassObjects/Kruskal/KruskalNode";
import { KruskalItemObj } from "../../../ClassObjects/Kruskal/KruskalItemObj";

interface Props {
  graphData: KruskalNode[];
  speed: number;
  viewportWidth: number;
  passedNodes?: number[];
  visitedNodes?: number[];
  actions: Events | null;
  roles: NodeRole[];
  tableData?: KruskalTableType;
  T?: linksType;
  links?: linksType;
  directed: boolean;
}

const Kruskal: FC<Props> = ({
  graphData,
  speed,
  viewportWidth,
  passedNodes,
  visitedNodes,
  actions,
  roles,
  tableData,
  T,
  links,
  directed,
}) => {
  const dispatch = useAppDispatch();

  KruskalItemObj.positions = [];
  KruskalItemObj.space = 10;
  const kruskalObjects = KruskalItemObj.generatePrimObjects(viewportWidth, speed, graphData);

  KruskalItemObj.setActions(kruskalObjects, actions);
  KruskalItemObj.setRoles(kruskalObjects, roles);
  if (visitedNodes) {
    KruskalItemObj.setVisited(kruskalObjects, visitedNodes);
  }
  if (passedNodes) {
    KruskalItemObj.setPassed(kruskalObjects, passedNodes);
  }
  if (tableData) {
    KruskalItemObj.setTableDataForKruskal(kruskalObjects, tableData);
  }
  if (T) {
    KruskalItemObj.setT(T);
  }
  if (links) {
    KruskalItemObj.setLinks(links);
  }

  dispatch(setGraphNodes(kruskalObjects));

  return (
    <div>
      <AnimatePresence>
        {kruskalObjects.map((nodeObj) => (
          <DFSNodes
            dfsObjects={kruskalObjects}
            nodeObj={nodeObj}
            key={nodeObj.id}
            directed={directed}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Kruskal;
