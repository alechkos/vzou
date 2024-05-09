import { useState } from "react";

import stackPhoto from "../../../assets/Algorithms/S1.png";
import SqControlsPanel, {
  Item,
} from "../../../components/Simulation/ControlsPanels/SqControlsPanel";
import { stackPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import Stack from "../../../components/Simulation/Stack/Stack";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { stackActions } from "../../../store/reducers/stackReducer";
import { sleep } from "../../../utils/animation-helpers";
import SideBar from "../../../components/Layout/SideBar/SideBar";


const MAX_ELEMENTS = 10;

// The stack page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code

function StackPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.stack);
  const [ regsterActivity ] = useRegisterActivityMutation();
  const [ isAnimate, setIsAnimate ] = useState<boolean>(false);
  const popFromStack = async () => {
    setIsAnimate(true);
    regsterActivity({
      algorithm: "Pop",
      subject: "Stack",
    });
    dispatch(stackActions.setLine(3));
    await sleep(2000);
    if (state.data.length > 0) {
      // if the stack is not empty

      dispatch(stackActions.markTop());
      await sleep(2000);

      dispatch(stackActions.setLine(5));
      await sleep(1000);

      dispatch(stackActions.pop());
      await sleep(2000);
    }
    dispatch(stackActions.setLine(-1));

    setIsAnimate(false);
  };

  const pushToStack = async (value: string) => {
    // if (data.length === MAX_ELEMENTS) {
    //   window.alert(`A maximum of ${MAX_ELEMENTS} values can be entered`);
    // }
    regsterActivity({
      algorithm: "Push",
      subject: "Stack",
    });
    setIsAnimate(true);
    dispatch(stackActions.setLine(10));
    await sleep(2000);
    if (state.data.length < MAX_ELEMENTS) {
      // add new elment at the start
      // const key = data.length;
      dispatch(stackActions.incTop());
      await sleep(2000);
      dispatch(stackActions.setTopValue(value));
      await sleep(2000);
    }
    dispatch(stackActions.setLine(-1));

    setIsAnimate(false);
  };

  const setRandomInput = (newData: Item[]) => {
    dispatch(stackActions.init(newData));
  };

  return (
    <>
      <SideBar />
      {/* top section */}
      <SubjectImg
        name="Queue"
        src={stackPhoto}
        width="200px"
      />

      <SqControlsPanel
        removeHandler={popFromStack}
        addHandler={pushToStack}
        setRandomInput={setRandomInput}
        isRemovedEnabled={isAnimate}
        isAddEnabled={isAnimate}
        addBtnText="Push"
        removeBtnText="Pop"
        maxLengthOfValue={8}
      />

      <AnimationWrapper
        line={state.line}
        code={stackPseudoCode}
      >
        <Stack items={state.data} />
      </AnimationWrapper>
    </>
  );
}

export default StackPage;
