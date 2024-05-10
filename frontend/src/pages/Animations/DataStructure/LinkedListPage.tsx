import { FC, useEffect, useState } from "react";
import AvlControlsPanel from "../../../components/Simulation/ControlsPanels/AvlControlsPanel";
import BinaryTree from "../../../components/Simulation/BinaryTree/BinaryTree";
import {
  calculateHeight,
  combineBSTPseudoCodes,
} from "../../../components/Simulation/BinaryTree/Helpers/Functions";
import HeapArray from "../../../components/Simulation/Heap/HeapArray/HeapArray";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import PhoneRotate from "../../../assets/rotateTablet.svg";
import LinkedListControlsPanel from "../../../components/Simulation/ControlsPanels/LinkedListControlsPanel";

const LinkedListPage: FC = () => {
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false); //we will show pseudocode only if we have built data structure

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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
      {fitsAnimation ? (
        <div className="flex flex-col items-center justify-between">
          <LinkedListControlsPanel
            // isButtonDisabled={isPlaying}
            isButtonDisabled={false}
            showActions={showActions}
            handleShowActions={handleShowActions}
            handleHideActions={handleHideActions}
            editingConstruction={editingConstruction}
            setShowPseudoCode={setShowPseudoCode}
          />
          {(showActions || editingConstruction) && (
            <div className="container mx-auto max-w-7xl my-[150px]">
              {/*linked list construction*/}
            </div>
          )}
          {/*{showActions && (*/}
          {/*  // <PlayerControlsPanel*/}
          {/*  //   controller={controller}*/}
          {/*  //   isPlaying={isPlaying}*/}
          {/*  // />*/}
          {/*)}*/}
          {/*{showPseudoCode && (*/}
          {/*  <div className="flex justify-end mr-5">*/}
          {/*    <div className=" w-fit">*/}
          {/*      <PseudoCodeContainer*/}
          {/*        line={currentLine}*/}
          {/*        code={combineBSTPseudoCodes(currentAlg) as PseudoItem[]}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
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

export default LinkedListPage;
