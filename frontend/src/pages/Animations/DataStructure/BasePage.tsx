import { FC, useEffect, useState } from "react";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import PhoneRotate from "../../../assets/rotateTablet.svg";
import { useAppSelector } from "../../../store/hooks";
import { setToInitial, setViewPortWidth } from "../../../store/reducers/basePage-reducer";
import { useDispatch } from "react-redux";

interface Props {
  controlPanel: React.ReactNode;
  visualization: React.ReactNode;
  array?: React.ReactNode;
  playerControlPanel: React.ReactNode;
  pseudoCode: React.ReactNode;
}

const BasePage: FC<Props> = ({
  controlPanel,
  visualization,
  playerControlPanel,
  array,
  pseudoCode,
}) => {
  const dispatch = useDispatch();

  const viewportWidth = useAppSelector((state) => state.basePage.viewportWidth);
  const showActions = useAppSelector((state) => state.basePage.showActions);
  const editingConstruction = useAppSelector((state) => state.basePage.editingConstruction);
  const showPseudoCode = useAppSelector((state) => state.basePage.showPseudoCode);
  const fitsAnimation = viewportWidth >= 1500;

  useEffect(() => {
    dispatch(setToInitial());
    function handleResize() {
      dispatch(setViewPortWidth(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <SideBar />
      {fitsAnimation ? (
        <div className="flex flex-col items-center justify-between">
          {controlPanel}
          {(showActions || editingConstruction) && visualization}
          {array && (
            <div className="container mx-auto max-w-7xl px-0 py-0 mt-96">
              <p className="mr-56">
                <b>Traversal Results</b>
              </p>
              {array}
            </div>
          )}
          {showActions && playerControlPanel}
          {showPseudoCode && (
            <div className="flex justify-end mr-5">
              <div className=" w-fit">{pseudoCode}</div>
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

export default BasePage;
