import { FC, useEffect, useState } from "react";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import LinkedListControlsPanel from "../../../components/Simulation/ControlsPanels/LinkedListControlsPanel";
import LinkedList from "../../../components/Simulation/LinkedList/LinkedList";
import { useAppSelector } from "../../../store/hooks";
import { LinkedListAnimationController } from "../../../ClassObjects/LinkedList/LinkedListAnimationController";
import { useDispatch } from "react-redux";
import { combineLinkedListPseudoCode } from "../../../components/Simulation/LinkedList/Helpers/LinkedListHelpers";
import BasePage from "./BasePage";
import {
  setEditingConstruction,
  setShowActions,
  setShowPseudoCode,
} from "../../../store/reducers/basePage-reducer";

const LinkedListPage: FC = () => {
  const head = useAppSelector((state) => state.linkedList.head);
  const isPlaying = useAppSelector((state) => state.linkedList.isPlaying);
  const currentLine = useAppSelector((state) => state.linkedList.currentLine);
  const currentAlg = useAppSelector((state) => state.linkedList.currentAlg);
  const currentRoles = useAppSelector((state) => state.linkedList.currentRoles);
  const passedNodes = useAppSelector((state) => state.linkedList.passedNodes);
  const currentActions = useAppSelector((state) => state.linkedList.currentActions);

  const controller = LinkedListAnimationController.getController(head, useDispatch());

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
    dispatch(setEditingConstruction(true));
    dispatch(setShowPseudoCode(false));
  };

  return (
    <BasePage
      controlPanel={
        <LinkedListControlsPanel
          controller={controller}
          isButtonDisabled={isPlaying}
          showActions={showActions}
          handleShowActions={handleShowActions}
          handleHideActions={handleHideActions}
          editingConstruction={editingConstruction}
        />
      }
      visualization={
        <LinkedList
          head={head}
          speed={controller.speed}
          viewportWidth={viewportWidth}
          passedNodes={passedNodes}
          roles={currentRoles}
          actions={currentActions}
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
          code={combineLinkedListPseudoCode(currentAlg) as PseudoItem[]}
        />
      }
    />
  );
};

export default LinkedListPage;
