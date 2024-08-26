import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { DFSAnimationController } from "../../../ClassObjects/DFS/DFSAnimationController";
import DFSControlsPanel from "../../../components/Simulation/ControlsPanels/DFSControlsPanel";
import { useAppSelector } from "../../../store/hooks";
import { combineDFSPseudoCode } from "../../../ClassObjects/DFS/DFSAlgorithms";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import DFS from "../../../components/Simulation/DFS/DFS";
import DFSTable from "../../../components/Simulation/DFS/DFSTable";
import BasePage from "./BasePage";
import { setInputArray } from "../../../store/reducers/alghoritms/dfs-reducer";
import {
  setEditingConstruction,
  setShowActions,
  setShowPseudoCode,
} from "../../../store/reducers/basePage-reducer";

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
  const directed = useAppSelector((state) => state.dfs.directed);
  const controller = DFSAnimationController.getController(initialNode, dispatch);

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
        <DFSControlsPanel
          showActions={showActions}
          handleShowActions={handleShowActions}
          handleHideActions={handleHideActions}
          editingConstruction={editingConstruction}
          setShowPseudoCode={setShowPseudoCode}
          controller={controller}
        />
      }
      visualization={
        <DFS
          graphData={controller.graphNodes}
          speed={controller.speed}
          viewportWidth={viewportWidth}
          actions={actions}
          roles={roles}
          passedNodes={passedNode}
          visitedNodes={visitedNodes}
          tableData={tableData}
          directed={directed}
        />
      }
      table={<DFSTable />}
      playerControlPanel={
        <PlayerControlsPanel
          controller={controller}
          isPlaying={isPlaying}
        />
      }
      pseudoCode={
        <PseudoCodeContainer
          line={currentLine}
          code={combineDFSPseudoCode(currentAlg) as PseudoItem[]}
        />
      }
      subject={"DFS"}
      setInput={setInputArray}
    />
  );
};

export default DFSPage;
