import { FC, useState } from "react";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import HashTableControlPanel from "../../../components/Simulation/ControlsPanels/HashTableControlPanel";
import BasePage from "./BasePage";
import { useAppSelector } from "../../../store/hooks";
import { HashTableAnimationController } from "../../../ClassObjects/HashTable/HashTableAnimationController";
import { useDispatch } from "react-redux";
import {
  setEditingConstruction,
  setShowActions,
  setShowPseudoCode,
} from "../../../store/reducers/basePage-reducer";
import HashTable from "../../../components/Simulation/HashTable/HashTable";
import { combineHashTablePseudoCode } from "../../../components/Simulation/HashTable/Helpers/HashTableHelpers";
import { HashTablePseudoCodeKeys } from "../../../components/Simulation/PseudoCode/HashTablePseudoCodeData";

const HashTablePage: FC = () => {
  const head = useAppSelector((state) => state.hashTable.head);
  const currentActions = useAppSelector((state) => state.hashTable.currentActions);
  const currentAlg = useAppSelector((state) => state.hashTable.currentAlg);
  const currentLine = useAppSelector((state) => state.hashTable.currentLine);
  const currentRoles = useAppSelector((state) => state.hashTable.currentRoles);
  const visitedNodes = useAppSelector((state) => state.hashTable.visitedNodes);
  const passedNodes = useAppSelector((state) => state.hashTable.passedNodes);
  const isPlaying = useAppSelector((state) => state.hashTable.isPlaying);
  const inputArray = useAppSelector((state) => state.hashTable.inputArray);
  const controller = HashTableAnimationController.getController(head, useDispatch());

  const viewportWidth = useAppSelector((state) => state.basePage.viewportWidth);
  const showActions = useAppSelector((state) => state.basePage.showActions);
  const editingConstruction = useAppSelector((state) => state.basePage.editingConstruction);

  const dispatch = useDispatch();

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
        <HashTableControlPanel
          controller={controller}
          showActions={showActions}
          handleShowActions={handleShowActions}
          editingConstruction={editingConstruction}
          handleHideActions={handleHideActions}
          isButtonDisabled={isPlaying}
        />
      }
      visualization={
        <HashTable
          speed={controller.speed}
          head={head}
          actions={currentActions}
          roles={currentRoles}
          viewportWidth={viewportWidth}
          passedNodes={passedNodes}
          visitedNodes={visitedNodes}
        />
      }
      playerControlPanel={
        <PlayerControlsPanel
          controller={controller}
          isPlaying={isPlaying}
        />
      }
      pseudoCode={
        <PseudoCodeContainer
          line={currentLine}
          code={combineHashTablePseudoCode(currentAlg as HashTablePseudoCodeKeys) as PseudoItem[]}
        />
      }
    />
  );
};

export default HashTablePage;
