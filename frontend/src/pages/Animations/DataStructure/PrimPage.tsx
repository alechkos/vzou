import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { combinePrimPseudoCode } from "../../../ClassObjects/Prim/PrimAlgorithms";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import { PrimAnimationController } from "../../../ClassObjects/Prim/PrimAnimationController";
import PrimControlPanel from "../../../components/Simulation/ControlsPanels/PrimControlPanel";
import Prim from "../../../components/Simulation/Prim/Prim";
import PrimTable from "../../../components/Simulation/Prim/PrimTable";

const DFSPage: FC = () => {
  const dispatch = useDispatch();
  const initialNode = useAppSelector((state) => state.prim.initialNode);
  const isPlaying = useAppSelector((state) => state.prim.isPlaying);
  const currentAlg = useAppSelector((state) => state.prim.currentAlg);
  const currentLine = useAppSelector((state) => state.prim.currentLine);
  const actions = useAppSelector((state) => state.prim.currentActions);
  const roles = useAppSelector((state) => state.prim.currentRoles);
  const passedNode = useAppSelector((state) => state.prim.passedNodes);
  const visitedNodes = useAppSelector((state) => state.prim.visitedNodes);
  const tableData = useAppSelector((state) => state.prim.tableData);
  const directed = useAppSelector((state) => state.prim.directed);
  const S = useAppSelector((state) => state.prim.S);
  const Q = useAppSelector((state) => state.prim.Q);
  const controller = PrimAnimationController.getController(initialNode, dispatch);

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
          <PrimControlPanel
            showActions={showActions}
            handleShowActions={handleShowActions}
            handleHideActions={handleHideActions}
            editingConstruction={editingConstruction}
            setShowPseudoCode={setShowPseudoCode}
            controller={controller}
          />
          {(showActions || editingConstruction) && (
            <Prim
              graphData={controller.graphNodes}
              speed={controller.speed}
              viewportWidth={viewportWidth}
              actions={actions}
              roles={roles}
              passedNodes={passedNode}
              visitedNodes={visitedNodes}
              tableData={tableData}
              S={S}
              Q={Q}
              directed={directed}
            />
          )}
          {showActions && <PrimTable />}
          {showPseudoCode && (
            <PlayerControlsPanel
              controller={controller}
              isPlaying={isPlaying}
            />
          )}
          {showPseudoCode && (
            <PseudoCodeContainer
              line={currentLine}
              code={combinePrimPseudoCode(currentAlg) as PseudoItem[]}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DFSPage;
