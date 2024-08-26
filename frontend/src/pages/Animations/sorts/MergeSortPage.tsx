import mergeSortPhoto from "../../../assets/Algorithms/MS1.png";
import MergeSortController from "../../../ClassObjects/SortControllers/MergeSortController";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { mergeSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { MergeSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { mergeSort } from "../../../components/Simulation/Sorts/mergeSort/mergeSortAlgorithm";
import MergeSortTree from "../../../components/Simulation/Sorts/mergeSort/mergeSortTree";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { mergeSortActions as ActionKind } from "../../../store/reducers/sorts/mergeSortReducer";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { useAddUserInputMutation } from "../../../store/reducers/userInput-reducer-api";
import { useState } from "react";
import SavedInput from "../../../components/Layout/SideBar/SavedInput";

const MAX_ELEMENTS = 8;

function MergeSortPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.mergeSort);
  const user = useAppSelector((state) => state.auth.user);

  const [regsterActivity] = useRegisterActivityMutation();
  const [userInput, { error: userInpError, isLoading, isSuccess }] = useAddUserInputMutation();

  const controller = MergeSortController.getController(dispatch);

  const [isRandom, setIsRandom] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Merge",
      subject: "Sorts",
    });
    const opArr: MergeSortOperation[] = mergeSort([...state.tree[1].data]);
    await controller.sort(opArr);
  };

  const setInput = async (data: number[], isRandom?: boolean) => {
    controller.init();
    dispatch(ActionKind.init(data));

    if (!isRandom) {
      const userInputData = {
        userID: Number(user!.id),
        subject: "MergeSort",
        algorithm: "MergeSort",
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
          subject={"MergeSort"}
          setInput={ActionKind.setEnteredValue}
        />
      )}
      {/* top section */}

      <SubjectImg
        name="Quick Sort"
        src={mergeSortPhoto}
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

      {/* animation section */}
      {showPseudoCode && (
        <AnimationWrapper
          line={state.line}
          code={mergeSortPseudoCode}
          width={300}
          controller={controller}
          showPseudoCode={showPseudoCode}
        >
          {/* <IndexArray size={state.data.length + 1} i={state.i} j={state.j} />
        <SortArray items={state.data} speed={controller.speed} /> */}
          {state.tree.length ? (
            <MergeSortTree
              tree={state.tree}
              left={state.left}
              right={state.right}
              speed={controller.speed}
            />
          ) : (
            <></>
          )}
        </AnimationWrapper>
      )}
    </>
  );
}

export default MergeSortPage;
