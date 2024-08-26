import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { AvlAnimationController } from "../../../ClassObjects/BST/AvlAnimationController";
import BinaryTree from "../../../components/Simulation/BinaryTree/BinaryTree";
import {
  calculateHeight,
  combineBSTPseudoCodes,
} from "../../../components/Simulation/BinaryTree/Helpers/Functions";
import AvlControlsPanel from "../../../components/Simulation/ControlsPanels/AvlControlsPanel";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import HeapArray from "../../../components/Simulation/Heap/HeapArray/HeapArray";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import { useAppSelector } from "../../../store/hooks";
import BasePage from "./BasePage";
import {
  setEditingConstruction,
  setShowActions,
  setShowPseudoCode,
  setViewPortWidth,
} from "../../../store/reducers/basePage-reducer";
import { setInputArray } from "../../../store/reducers/alghoritms/bst-reducer";

const AvlPage: FC = () => {
  const root = useAppSelector((state) => state.bst.currentRoot);
  const currentActions = useAppSelector((state) => state.bst.currentActions);
  const currentAlg = useAppSelector((state) => state.bst.currentAlg);
  const currentLine = useAppSelector((state) => state.bst.currentLine);
  const currentRoles = useAppSelector((state) => state.bst.currentRoles);
  const visitedNodes = useAppSelector((state) => state.bst.visitedNodes);
  const passedNodes = useAppSelector((state) => state.bst.passedNodes);
  const traversalResults = useAppSelector((state) => state.bst.traversalResults);
  const isPlaying = useAppSelector((state) => state.bst.isPlaying);
  const controller = AvlAnimationController.getController(root, useDispatch());

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
        <AvlControlsPanel
          isButtonDisabled={isPlaying}
          controller={controller}
          showActions={showActions}
          handleShowActions={handleShowActions}
          handleHideActions={handleHideActions}
          editingConstruction={editingConstruction}
        />
      }
      visualization={
        <BinaryTree
          viewportWidth={viewportWidth}
          root={root}
          level={0}
          height={calculateHeight(root)}
          speed={controller.speed}
          actions={currentActions}
          roles={currentRoles}
          isBST
          visitedNodes={visitedNodes}
          passedNodes={passedNodes}
        />
      }
      array={
        traversalResults.length > 0 && (
          <HeapArray
            items={traversalResults}
            actions={currentActions}
            speed={controller.speed}
          />
        )
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
          code={combineBSTPseudoCodes(currentAlg) as PseudoItem[]}
        />
      }
      subject={"AVL"}
      setInput={setInputArray}
    />
  );
};

export default AvlPage;
