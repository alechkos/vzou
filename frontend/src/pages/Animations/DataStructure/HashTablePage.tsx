import { FC } from "react";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import { combineLinkedListPseudoCode } from "../../../components/Simulation/LinkedList/Helpers/LinkedListHelpers";
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

const HashTablePage: FC = () => {
  const head = useAppSelector((state) => state.hashTable.head);
  const currentActions = useAppSelector((state) => state.hashTable.currentActions);
  const currentAlg = useAppSelector((state) => state.hashTable.currentAlg);
  const currentLine = useAppSelector((state) => state.hashTable.currentLine);
  const currentRoles = useAppSelector((state) => state.hashTable.currentRoles);
  const visitedNodes = useAppSelector((state) => state.hashTable.visitedNodes);
  const passedNodes = useAppSelector((state) => state.hashTable.passedNodes);
  const isPlaying = useAppSelector((state) => state.hashTable.isPlaying);
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
    dispatch(setEditingConstruction(true));
    dispatch(setShowPseudoCode(false));
  };

  return (
    <BasePage
      controlPanel={
        <HashTableControlPanel
          controller={controller}
          showActions={showActions}
          handleShowActions={handleHideActions}
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
        <div></div>
        // <PseudoCodeContainer
        //   line={currentLine}
        //   code={combineBSTPseudoCodes(currentAlg) as PseudoItem[]}
        // />
      }
    />
  );
};

export default HashTablePage;
