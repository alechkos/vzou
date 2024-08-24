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
import BasePage from "./BasePage";
import {
  setInputArray,
  setFrom,
  setTo,
  setWeight,
  setInputData,
  setCountRows,
  clearInputArray,
} from "../../../store/reducers/alghoritms/prim-reducer";
import {
  setEditingConstruction,
  setShowActions,
  setShowPseudoCode,
} from "../../../store/reducers/basePage-reducer";

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

  const viewportWidth = useAppSelector((state) => state.basePage.viewportWidth);
  const showActions = useAppSelector((state) => state.basePage.showActions);
  const editingConstruction = useAppSelector((state) => state.basePage.editingConstruction);

  const handleShowActions = () => {
    dispatch(setShowActions(true));
    dispatch(setShowPseudoCode(true));
  };

  const handleHideActions = () => {
    dispatch(setShowActions(false));
    dispatch(setEditingConstruction(false));
    dispatch(setShowPseudoCode(false));
  };

  const fitsAnimation = viewportWidth >= 1500;

  return (
    <BasePage
      controlPanel={
        <PrimControlPanel
          showActions={showActions}
          handleShowActions={handleShowActions}
          handleHideActions={handleHideActions}
          editingConstruction={editingConstruction}
          setShowPseudoCode={setShowPseudoCode}
          controller={controller}
        />
      }
      visualization={
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
      }
      table={<PrimTable />}
      playerControlPanel={
        <PlayerControlsPanel
          controller={controller}
          isPlaying={isPlaying}
        />
      }
      pseudoCode={
        <PseudoCodeContainer
          line={currentLine}
          code={combinePrimPseudoCode(currentAlg) as PseudoItem[]}
        />
      }
      subject={"Prim"}
      setInput={setInputArray}
      setFrom={setFrom}
      setTo={setTo}
      setWeight={setWeight}
      setCountRow={setCountRows}
      setInputData={setInputData}
      clearInputArray={clearInputArray}
    />
  );
};

export default DFSPage;
