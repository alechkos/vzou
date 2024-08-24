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
import BasePage from "./BasePage";
import {
  setInputArray,
  setFrom,
  setTo,
  setWeight,
  setInputData,
  setCountRows,
  clearInputArray,
} from "../../../store/reducers/alghoritms/bellmanFord-reducer";
import {
  setEditingConstruction,
  setShowActions,
  setShowPseudoCode,
} from "../../../store/reducers/basePage-reducer";

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

  return (
    <BasePage
      controlPanel={
        <BellmanFordControlPanel
          controller={controller}
          showActions={showActions}
          handleShowActions={handleShowActions}
          handleHideActions={handleHideActions}
          editingConstruction={editingConstruction}
          setShowPseudoCode={setShowPseudoCode}
        />
      }
      visualization={
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
      }
      table={<BellmanFordTable />}
      playerControlPanel={
        <PlayerControlsPanel
          controller={controller}
          isPlaying={isPlaying}
        />
      }
      pseudoCode={
        <PseudoCodeContainer
          line={currentLine}
          code={combineBellmanFordPseudoCode(currentAlg) as PseudoItem[]}
        />
      }
      subject={"BellmanFord"}
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

export default BellmanFordPage;
