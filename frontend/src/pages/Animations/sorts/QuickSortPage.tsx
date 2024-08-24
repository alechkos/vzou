import quickSortPhoto from "../../../assets/Algorithms/QS1.png";
import QuickSortController from "../../../ClassObjects/SortControllers/QuickSortController";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { QuickSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import { QuickSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import QuickSort from "../../../components/Simulation/Sorts/QuickSort/QuickSort";
import { quickSort } from "../../../components/Simulation/Sorts/QuickSort/QuickSortAlgorithm";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { StyledTextDiv } from "../../../components/UI/StyledTextDiv";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { quickSortActions as ActionKind } from "../../../store/reducers/sorts/quickSortReducer";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { useAddUserInputMutation } from "../../../store/reducers/userInput-reducer-api";
import { useState } from "react";
import SavedInput from "../../../components/Layout/SideBar/SavedInput";

const MAX_ELEMENTS = 10;

// The Queue page divides to 3 col: left = control panel (navbar), middle = stack, rigth = psaudo code
export interface Position {
  curr: number;
  prev: number;
}

function QuickSortPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.quickSort);
  const user = useAppSelector((state) => state.auth.user);

  const [regsterActivity] = useRegisterActivityMutation();
  const [userInput, { error: userInpError, isLoading, isSuccess }] = useAddUserInputMutation();

  const controller = QuickSortController.getController(dispatch);
  const isSortStarted = useAppSelector((s) => s.animationController.isSortStarted);

  const [showPseudoCode, setShowPseudoCode] = useState(false);
  const Sort = async () => {
    regsterActivity({
      algorithm: "Quick",
      subject: "Sorts",
    });
    const opArr: QuickSortOperation[] = quickSort([...state.data]);
    await controller.sort(opArr);
  };

  const setInput = async (data: number[], isRandom?: boolean) => {
    controller.init();
    dispatch(ActionKind.init(data));

    if (!isRandom) {
      const userInputData = {
        userID: Number(user!.id),
        subject: "QuickSort",
        algorithm: "QuickSort",
        input: data.toString(),
        actionDate: new Date(),
        from: [],
        to: [],
        weight: [],
      };

      await userInput(userInputData);
    }
    setShowPseudoCode(true);
  };

  const setRandomInput = () => {
    const randInput = getRandomNumsArr(MAX_ELEMENTS);
    dispatch(ActionKind.setEnteredValue(randInput.toString()));

    setInput(randInput, true);
  };

  return (
    <>
      <SideBar />
      {!showPseudoCode && (
        <SavedInput
          subject={"QuickSort"}
          setInput={ActionKind.setEnteredValue}
        />
      )}
      {/* top section */}
      <SubjectImg
        name="Quick Sort"
        src={quickSortPhoto}
        width="200px"
      />
      <SortControlsPanel
        rightBtnHandler={Sort}
        inputHandler={setInput}
        leftBtnHandler={setRandomInput}
        inputBtnText="Set"
        rightBtnText="Sort"
        leftBtnText="Random"
        maxElements={MAX_ELEMENTS}
        enteredValue={state.enteredValue}
        setEnteredValue={ActionKind.setEnteredValue}
      />

      {showPseudoCode && (
        <AnimationWrapper
          line={state.line}
          code={QuickSortPseudoCode}
          controller={controller}
          showPseudoCode={showPseudoCode}
        >
          <IndexArray
            size={state.data.length + 1}
            i={state.i}
            j={state.j}
          />
          <QuickSort
            items={state.data}
            speed={controller.speed}
          />
          {isSortStarted ? (
            <>
              <StyledTextDiv text={`P -> ${state.p}`} />
              <StyledTextDiv text={`R -> ${state.r}`} />
            </>
          ) : (
            <></>
          )}
        </AnimationWrapper>
      )}
    </>
  );
}

export default QuickSortPage;
