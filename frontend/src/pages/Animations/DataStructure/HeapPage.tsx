import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import HeapAnimationController from "../../../ClassObjects/Heap/HeapAnimationController";
import BinaryTree from "../../../components/Simulation/BinaryTree/BinaryTree";
import {
  calculateHeight,
  combineHeapPseudoCodes,
} from "../../../components/Simulation/BinaryTree/Helpers/Functions";
import HeapControlsPanel from "../../../components/Simulation/ControlsPanels/HeapControlsPanel";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import HeapArray from "../../../components/Simulation/Heap/HeapArray/HeapArray";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import { useAppSelector } from "../../../store/hooks";
import BasePage from "./BasePage";
import {
  setEditingConstruction,
  setShowActions,
  setShowPseudoCode,
} from "../../../store/reducers/basePage-reducer";

const HeapPage: FC = () => {
  const root = useAppSelector((state) => state.heap.root);
  const currentActions = useAppSelector((state) => state.heap.currentActions);
  const currentArr = useAppSelector((state) => state.heap.currentArr);
  const currentAlg = useAppSelector((state) => state.heap.currentAlg);
  const currentLine = useAppSelector((state) => state.heap.currentLine);
  const currentHeapSize = useAppSelector((state) => state.heap.currentHeapSize);
  const currentRoles = useAppSelector((state) => state.heap.currentRoles);
  const isPlaying = useAppSelector((state) => state.heap.isPlaying);
  const controller = HeapAnimationController.getController(currentArr, useDispatch());

  const viewportWidth = useAppSelector((state) => state.basePage.viewportWidth);
  const showActions = useAppSelector((state) => state.basePage.showActions);

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

  useEffect(() => {
    handleShowActions();
  }, []);

  return (
    <BasePage
      controlPanel={
        <HeapControlsPanel
          isButtonDisabled={isPlaying}
          controller={controller}
          handleShowActions={handleShowActions}
          handleHideActions={handleHideActions}
          showActions={showActions}
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
          currentHeapSize={currentHeapSize}
        />
      }
      array={
        showActions && (
          <HeapArray
            items={currentArr}
            actions={currentActions}
            speed={controller.speed}
            currentHeapSize={currentHeapSize}
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
          code={combineHeapPseudoCodes(currentAlg)}
        />
      }
    />
  );
};

export default HeapPage;

//TODO: End of refactoring
