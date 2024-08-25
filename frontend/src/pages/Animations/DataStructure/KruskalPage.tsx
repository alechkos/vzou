import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import BasePage from "./BasePage";
import {
  setInputArray,
  setFrom,
  setTo,
  setWeight,
  setInputData,
  setCountRows,
  clearInputArray,
} from "../../../store/reducers/alghoritms/kruskal-reducer";
import {
  setEditingConstruction,
  setShowActions,
  setShowPseudoCode,
} from "../../../store/reducers/basePage-reducer";
import { KruskalAnimationController } from "../../../ClassObjects/Kruskal/KruskalAnimationController";
import KruskalControlPanel from "../../../components/Simulation/ControlsPanels/KruskalControlPanel";
import Kruskal from "../../../components/Simulation/Kruskal/Kruskal";
import KruskalTable from "../../../components/Simulation/Kruskal/KruskalTable";
import { combineKruskalPseudoCode } from "../../../ClassObjects/Kruskal/KruskalAlgorithms";

const KruskalPage: FC = () => {
  const dispatch = useDispatch();
  const initialNode = useAppSelector((state) => state.kruskal.initialNode);
  const isPlaying = useAppSelector((state) => state.kruskal.isPlaying);
  const currentAlg = useAppSelector((state) => state.kruskal.currentAlg);
  const currentLine = useAppSelector((state) => state.kruskal.currentLine);
  const actions = useAppSelector((state) => state.kruskal.currentActions);
  const roles = useAppSelector((state) => state.kruskal.currentRoles);
  const passedNode = useAppSelector((state) => state.kruskal.passedNodes);
  const visitedNodes = useAppSelector((state) => state.kruskal.visitedNodes);
  const tableData = useAppSelector((state) => state.kruskal.tableData);
  const directed = useAppSelector((state) => state.kruskal.directed);
  const T = useAppSelector((state) => state.kruskal.T);
  const links = useAppSelector((state) => state.kruskal.links);
  const controller = KruskalAnimationController.getController(initialNode, dispatch);

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
        <KruskalControlPanel
          showActions={showActions}
          handleShowActions={handleShowActions}
          handleHideActions={handleHideActions}
          editingConstruction={editingConstruction}
          setShowPseudoCode={setShowPseudoCode}
          controller={controller}
        />
      }
      visualization={
        <Kruskal
          graphData={controller.graphNodes}
          speed={controller.speed}
          viewportWidth={viewportWidth}
          actions={actions}
          roles={roles}
          passedNodes={passedNode}
          visitedNodes={visitedNodes}
          tableData={tableData}
          T={T}
          links={links}
          directed={directed}
        />
      }
      table={<KruskalTable />}
      playerControlPanel={
        <PlayerControlsPanel
          controller={controller}
          isPlaying={isPlaying}
        />
      }
      pseudoCode={
        <PseudoCodeContainer
          line={currentLine}
          code={combineKruskalPseudoCode(currentAlg) as PseudoItem[]}
        />
      }
      subject={"Kruskal"}
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

export default KruskalPage;
