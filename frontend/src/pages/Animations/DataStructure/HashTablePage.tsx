import { FC, useState } from "react";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import LinkedListControlsPanel from "../../../components/Simulation/ControlsPanels/LinkedListControlsPanel";
import LinkedList from "../../../components/Simulation/LinkedList/LinkedList";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import { combineLinkedListPseudoCode } from "../../../components/Simulation/LinkedList/Helpers/LinkedListHelpers";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import PhoneRotate from "../../../assets/rotateTablet.svg";
import HashTableControlPanel from "../../../components/Simulation/ControlsPanels/HashTableControlPanel";

const HashTablePage: FC = () => {
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false); //we will show pseudocode only if we have built data structure

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const fitsAnimation = viewportWidth >= 1500;

  return (
    <>
      <SideBar />
      {fitsAnimation ? (
        <div className="flex flex-col items-center justify-between">
          <HashTableControlPanel
            controller={"sa"}
            isButtonDisabled={false}
            showActions={showActions}
            handleShowActions={() => {}}
            handleHideActions={() => {}}
            editingConstruction={editingConstruction}
            setShowPseudoCode={setShowPseudoCode}
          />
          {(showActions || editingConstruction) && (
            <div className="container mx-auto max-w-7xl my-[150px]">
              {/*<LinkedList*/}
              {/*    head={head}*/}
              {/*    speed={controller.speed}*/}
              {/*    viewportWidth={viewportWidth}*/}
              {/*    passedNodes={passedNodes}*/}
              {/*    roles={currentRoles}*/}
              {/*    actions={currentActions}*/}
              {/*/>*/}
            </div>
          )}
          {/*{showActions && (*/}
          {/*    // <PlayerControlsPanel*/}
          {/*    //     controller={controller}*/}
          {/*    //     isPlaying={isPlaying}*/}
          {/*    // />*/}
          {/*)}*/}
          {showPseudoCode && (
            <div className="flex justify-end mr-5">
              {/*<div className=" w-fit">*/}
              {/*    <PseudoCodeContainer*/}
              {/*        line={currentLine}*/}
              {/*        code={combineLinkedListPseudoCode(currentAlg) as PseudoItem[]}*/}
              {/*    />*/}
              {/*</div>*/}
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

export default HashTablePage;

//TODO: reducer, func for back, front
