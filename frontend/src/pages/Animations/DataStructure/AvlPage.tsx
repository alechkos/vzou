import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PhoneRotate from "../../../assets/rotateTablet.svg";
import { AvlAnimationController } from "../../../ClassObjects/AvlAnimationController";
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
import SideBar from "../../../components/Layout/SideBar/SideBar";

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
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false); //we will show pseudocode only if we have biult our tree

  const handleShowActions = () => {
    setShowActions(true);
  };

  const handleHideActions = () => {
    setShowActions(false);
    setEditingConstruction(true);
    setShowPseudoCode(false);
  };

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fitsAnimation = viewportWidth >= 1500;

  return (
    <>
      <SideBar />
      {fitsAnimation ? (
        <div className="flex flex-col items-center justify-between">
          <AvlControlsPanel
            isButtonDisabled={isPlaying}
            controller={controller}
            showActions={showActions}
            handleShowActions={handleShowActions}
            handleHideActions={handleHideActions}
            editingConstruction={editingConstruction}
            setShowPseudoCode={setShowPseudoCode}
          />
          {(showActions || editingConstruction) && (
            <div className="container mx-auto max-w-7xl my-[150px]">
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
            </div>
          )}
          {traversalResults.length > 0 && (
            <div className="container mx-auto max-w-7xl px-0 py-0">
              <p className="mr-56">
                <b>Traversal Results</b>
              </p>
              <HeapArray
                items={traversalResults}
                actions={currentActions}
                speed={controller.speed}
              />
            </div>
          )}
          {showActions && (
            <PlayerControlsPanel
              controller={controller}
              isPlaying={isPlaying}
            />
          )}
          {showPseudoCode && (
            <div className="flex justify-end mr-5">
              <div className=" w-fit">
                <PseudoCodeContainer
                  line={currentLine}
                  code={combineBSTPseudoCodes(currentAlg) as PseudoItem[]}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative grid place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:via-fuchsia-600 before:to-transparent before:blur-xl before:filter">
          <h2 className="title text-3xl font-black text-lime-600">
            Min supported width for this simulation
          </h2>
          <h2 className="cursive text-5xl font-thin text-lime-600">
            1500px current width : {viewportWidth}
          </h2>
          <img
            src={PhoneRotate}
            alt="Rotate device"
          />
        </div>
      )}
    </>
  );
};

export default AvlPage;
