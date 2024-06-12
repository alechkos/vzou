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
import BasePage from "./BasePage";

const HashTablePage: FC = () => {
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false); //we will show pseudocode only if we have built data structure

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const fitsAnimation = viewportWidth >= 1500;

  return (
    // <BasePage
    //   controlPanel={HashTableControlPanel}
    //   visualization={}
    //   playerControlPanel={}
    //   pseudoCode={}
    // />
    <div></div>
  );
};

export default HashTablePage;
