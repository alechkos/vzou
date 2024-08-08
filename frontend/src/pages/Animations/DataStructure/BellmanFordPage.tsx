import React, { FC, useEffect, useState } from "react";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useDispatch } from "react-redux";
import { BellmanFordAnimationController } from "../../../ClassObjects/BellmanFord/BellmanFordAnimationController";
import BellmanFordControlPanel from "../../../components/Simulation/ControlsPanels/BellmanFordControlPanel";
import BellmanFord from "../../../components/Simulation/BellmanFord/BellmanFord";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import { combineBellmanFordPseudoCode } from "../../../ClassObjects/BellmanFord/BellmanFordAlgorithms";
import BellmanFordTable from "../../../components/Simulation/BellmanFord/BellmanFordTable";

const BellmanFordPage: FC = () => {
  const dispatch = useDispatch();
  const initialNode = useAppSelector((state) => state.bellmanFord.initialNode);
  const isPlaying = useAppSelector((state) => state.bellmanFord.isPlaying);
  const currentAlg = useAppSelector((state) => state.bellmanFord.currentAlg);
  const currentLine = useAppSelector((state) => state.bellmanFord.currentLine);
  const actions = useAppSelector((state) => state.bellmanFord.currentActions);
  const roles = useAppSelector((state) => state.bellmanFord.currentRoles);
  const passedNode = useAppSelector((state) => state.bellmanFord.passedNodes);
  const visitedNodes = useAppSelector((state) => state.bellmanFord.visitedNodes);
  const tableData = useAppSelector((state) => state.bellmanFord.tableData);
  const directed = useAppSelector((state) => state.bellmanFord.directed);
  const controller = BellmanFordAnimationController.getController(initialNode, dispatch);

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
          <BellmanFordControlPanel
            controller={controller}
            showActions={showActions}
            handleShowActions={handleShowActions}
            handleHideActions={handleHideActions}
            editingConstruction={editingConstruction}
            setShowPseudoCode={setShowPseudoCode}
          />
        </div>
      )}
      {(showActions || editingConstruction) && (
        <BellmanFord
          graphData={controller.grNodes}
          speed={controller.speed}
          viewportWidth={viewportWidth}
          actions={actions}
          roles={roles}
          directed={directed}
          passedNodes={passedNode}
          visitedNodes={visitedNodes}
          tableData={tableData}
        />
      )}
      {showActions && <BellmanFordTable />}
      {showPseudoCode && (
        <PlayerControlsPanel
          controller={controller}
          isPlaying={isPlaying}
        />
      )}
      {showPseudoCode && (
        <PseudoCodeContainer
          line={currentLine}
          code={combineBellmanFordPseudoCode(currentAlg) as PseudoItem[]}
        />
      )}
    </>
  );
};

export default BellmanFordPage;
