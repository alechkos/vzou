import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DFSAnimationController } from "../../../ClassObjects/DFS/DFSAnimationController";
import DFSControlsPanel from "../../../components/Simulation/ControlsPanels/DFSControlsPanel";
import { useAppSelector } from "../../../store/hooks";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { combineDFSPseudoCode } from "../../../ClassObjects/DFS/DFSAlgorithms";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import DFS from "../../../components/Simulation/DFS/DFS";
import DFSTable from "../../../components/Simulation/DFS/DFSTable";

const DFSPage: FC = () => {
  const dispatch = useDispatch();
  const initialNode = useAppSelector((state) => state.dfs.initialNode);
  const isPlaying = useAppSelector((state) => state.dfs.isPlaying);
  const currentAlg = useAppSelector((state) => state.dfs.currentAlg);
  const currentLine = useAppSelector((state) => state.dfs.currentLine);
  const actions = useAppSelector((state) => state.dfs.currentActions);
  const roles = useAppSelector((state) => state.dfs.currentRoles);
  const passedNode = useAppSelector((state) => state.dfs.passedNodes);
  const visitedNodes = useAppSelector((state) => state.dfs.visitedNodes);
  const tableData = useAppSelector((state) => state.dfs.tableData);
  const controller = DFSAnimationController.getController(initialNode, dispatch);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);

  const handleShowActions = () => setShowActions(true);
  const handleHideActions = () => {
    setShowActions(false);
    setEditingConstruction(true);
    setShowPseudoCode(false);
  };

  const fitsAnimation = viewportWidth >= 1500;

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <SideBar />
      {fitsAnimation && (
        <div>
          <DFSControlsPanel
            showActions={showActions}
            handleShowActions={handleShowActions}
            handleHideActions={handleHideActions}
            editingConstruction={editingConstruction}
            setShowPseudoCode={setShowPseudoCode}
            controller={controller}
          />
          {(showActions || editingConstruction) && (
            <DFS
              graphData={controller.graphNodes}
              speed={controller.speed}
              viewportWidth={viewportWidth}
              actions={actions}
              roles={roles}
              passedNodes={passedNode}
              visitedNodes={visitedNodes}
              tableData={tableData}
            />
          )}
          {showActions && <DFSTable />}
          {showPseudoCode && (
            <PlayerControlsPanel
              controller={controller}
              isPlaying={isPlaying}
            />
          )}
          {showPseudoCode && (
            <PseudoCodeContainer
              line={currentLine}
              code={combineDFSPseudoCode(currentAlg) as PseudoItem[]}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DFSPage;
