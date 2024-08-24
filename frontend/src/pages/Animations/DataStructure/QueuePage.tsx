import { useState } from "react";

import queuePhoto from "../../../assets/Algorithms/Q1.png";
import ControlsPanel, { Item } from "../../../components/Simulation/ControlsPanels/SqControlsPanel";
import { queuePseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import Queue from "../../../components/Simulation/Queue/Queue";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { queueActions } from "../../../store/reducers/queueReducer";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { sleep } from "../../../utils/animation-helpers";
import SideBar from "../../../components/Layout/SideBar/SideBar";

const MAX_ELEMENTS = 10;

// The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

function QueuePage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.queue);
  const [regsterActivity] = useRegisterActivityMutation();
  const [isAnimate, setIsAnimate] = useState<boolean>(false);

  const Dequeue = async () => {
    regsterActivity({
      algorithm: "Dequeue",
      subject: "Queue",
    });
    setIsAnimate(true);
    dispatch(queueActions.setLine(3));
    await sleep(2000);
    if (state.data.length > 0) {
      // if the queue is not empty

      dispatch(queueActions.markHead());
      await sleep(2000);

      dispatch(queueActions.incHead());
      dispatch(queueActions.incHead());
      await sleep(2000);

      dispatch(queueActions.dequeue());
      await sleep(2000);
    }
    dispatch(queueActions.setLine(-1));
    setIsAnimate(false);
  };

  const Enqueue = async (value: string) => {
    regsterActivity({
      algorithm: "Enqueue",
      subject: "Queue",
    });
    setIsAnimate(true);

    dispatch(queueActions.setLine(10));
    await sleep(2000);
    if (state.data.length < MAX_ELEMENTS) {
      // add new elment at the start
      dispatch(queueActions.incTail());
      await sleep(2000);

      dispatch(queueActions.enqueue(value));
      await sleep(2000);
    }
    dispatch(queueActions.setLine(-1));
    setIsAnimate(false);
  };

  const setRandomInput = (newData: Item[]) => {
    dispatch(queueActions.inputData(newData));
  };
  /// /

  return (
    <>
      <SideBar />
      {/* top section */}
      <SubjectImg
        name="Queue"
        src={queuePhoto}
        width="200px"
      />

      <ControlsPanel
        removeHandler={Dequeue}
        addHandler={Enqueue}
        setRandomInput={setRandomInput}
        isRemovedEnabled={isAnimate}
        isAddEnabled={isAnimate}
        addBtnText="Enqueue"
        removeBtnText="Dequeue"
        maxLengthOfValue={4}
      />
      <AnimationWrapper
        line={state.line}
        code={queuePseudoCode}
        showPseudoCode={true}
      >
        <Queue
          headPosition={state.headPosition}
          tailPosition={state.tailPosition}
          items={state.data}
        />
      </AnimationWrapper>
    </>
  );
}

export default QueuePage;
