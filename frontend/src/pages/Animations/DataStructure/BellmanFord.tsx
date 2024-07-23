import { FC, useEffect, useState } from "react";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { useAppDispatch } from "../../../store/hooks";

const BellmanFord: FC = () => {
  const dispatch = useAppDispatch();

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);

  const handleShowActions = () => setShowActions(true);
  const handleHideActions = () => {
    setShowActions(false);
    setEditingConstruction(true);
    setShowPseudoCode(false);
  };

  const fitsAnimation = viewportWidth >= 1500;

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <SideBar />
    </>
  );
};

export default BellmanFord;
