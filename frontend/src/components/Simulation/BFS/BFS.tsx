import { FC } from "react";
import { BfsNode } from "../../../ClassObjects/BFS/BfsNode";
import { Events, NodeRole } from "../BinaryTree/BinaryTreeTypes";
import { BfsItemObj } from "../../../ClassObjects/BFS/BfsItemObj";
import { AnimatePresence } from "framer-motion";
import BFSNode from "./BFSNode";
import { useAppSelector } from "../../../store/hooks";
import { useDispatch } from "react-redux";
import { setBfsObjects } from "../../../store/reducers/alghoritms/bfs-reducer";

interface Props {
  initialNode: BfsNode | undefined;
  speed: number;
  viewportWidth: number;
  passedNodes?: number[];
  visitedNodes?: number[];
  actions: Events | null;
  roles: NodeRole[];
}

const BFS: FC<Props> = ({
  initialNode,
  speed,
  viewportWidth,
  passedNodes,
  visitedNodes,
  actions,
  roles,
}) => {
  const dispatch = useDispatch();

  let bfsObjects = useAppSelector((state) => state.bfs.bfsObjects);
  if (bfsObjects.length === 0) {
    bfsObjects = BfsItemObj.generateBFSObjects(viewportWidth, speed, initialNode);
    dispatch(setBfsObjects(bfsObjects));
  }
  BfsItemObj.setActions(bfsObjects, actions);
  BfsItemObj.setRoles(bfsObjects, roles);
  if (visitedNodes) {
    BfsItemObj.setVisited(bfsObjects, visitedNodes);
  }
  if (passedNodes) {
    BfsItemObj.setPassed(bfsObjects, passedNodes);
  }

  return (
    <div>
      <AnimatePresence>
        {bfsObjects.map((nodeObj) => (
          <BFSNode
            nodeObj={nodeObj}
            key={nodeObj.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BFS;
