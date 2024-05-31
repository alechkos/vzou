import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PhoneRotate from "../../../assets/rotateTablet.svg";
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
import SideBar from "../../../components/Layout/SideBar/SideBar";

const HeapPage: FC = () => {
  const root = useAppSelector((state) => state.heap.root); // TODO:Randomize input
  const currentActions = useAppSelector((state) => state.heap.currentActions);
  const currentArr = useAppSelector((state) => state.heap.currentArr);
  const currentAlg = useAppSelector((state) => state.heap.currentAlg);
  const currentLine = useAppSelector((state) => state.heap.currentLine);
  const currentHeapSize = useAppSelector((state) => state.heap.currentHeapSize);
  const currentRoles = useAppSelector((state) => state.heap.currentRoles);
  const isPlaying = useAppSelector((state) => state.heap.isPlaying);
  const controller = HeapAnimationController.getController(currentArr, useDispatch());
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
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
  const fitsAnimation = viewportWidth >= 1120;

  return (
    <>
      <SideBar />
      {fitsAnimation ? (
        <>
          <HeapControlsPanel
            isButtonDisabled={isPlaying}
            controller={controller}
          />
          <div className="container mx-auto max-w-7xl px-0 py-0">
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
          </div>
          <div className="container mx-auto max-w-7xl px-0 py-0 mt-72">
            <HeapArray
              items={currentArr}
              actions={currentActions}
              speed={controller.speed}
              currentHeapSize={currentHeapSize}
            />
          </div>
          <PlayerControlsPanel
            controller={controller}
            isPlaying={isPlaying}
          />
          <div className="flex justify-end mr-5">
            <div className=" w-fit">
              <PseudoCodeContainer
                line={currentLine}
                code={combineHeapPseudoCodes(currentAlg)}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="relative grid place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:via-fuchsia-600 before:to-transparent before:blur-xl before:filter">
          <h2 className="title text-3xl font-black text-lime-600">
            Min supported width for this simulation
          </h2>
          <h2 className="cursive text-5xl font-thin text-lime-600">
            1120px current width : {viewportWidth}
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

export default HeapPage;
