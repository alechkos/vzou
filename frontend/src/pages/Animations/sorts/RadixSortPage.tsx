import radixSortPhoto from "../../../assets/Algorithms/RS1.png";
import RadixSortController from "../../../ClassObjects/SortControllers/RadixSortController";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { RadixSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { RadixSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { ValueArray } from "../../../components/Simulation/Sorts/helpers/ValueArray";
import { radixSort } from "../../../components/Simulation/Sorts/RadixSort/RadixSortAlgorithm";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { StyledTextDiv } from "../../../components/UI/StyledTextDiv";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { radixSortActions as actions } from "../../../store/reducers/sorts/radixSortReducer";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { useAddUserInputMutation } from "../../../store/reducers/userInput-reducer-api";
import { useState } from "react";
import SavedInput from "../../../components/Layout/SideBar/SavedInput";

const MAX_ELEMENTS = 10;

function RadixSortPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.radixSort);
  const user = useAppSelector((state) => state.auth.user);

  const [regsterActivity] = useRegisterActivityMutation();
  const [userInput, { error: userInpError, isLoading, isSuccess }] = useAddUserInputMutation();

  const controller = RadixSortController.getController(dispatch);
  const [showPseudoCode, setShowPseudoCode] = useState(false);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Radix",
      subject: "Sorts",
    });
    const opArr: RadixSortOperation[] = radixSort([...state.data]);
    await controller.sort(opArr);
  };

  const setInput = async (data: number[], isRandom?: boolean) => {
    controller.init();
    dispatch(actions.setData(data));

    if (!isRandom) {
      const userInputData = {
        userID: Number(user!.id),
        subject: "RadixSort",
        algorithm: "RadixSort",
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
    const randInput = getRandomNumsArr(MAX_ELEMENTS, 1000);
    dispatch(actions.setEnteredValue(randInput.toString()));

    setInput(randInput, true);
  };

  return (
    <>
      <SideBar />
      {!showPseudoCode && (
        <SavedInput
          subject={"RadixSort"}
          setInput={actions.setEnteredValue}
        />
      )}
      {/* top section */}
      <SubjectImg
        name="Radix Sort"
        src={radixSortPhoto}
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
        maxInputNum={999}
        enteredValue={state.enteredValue}
        setEnteredValue={actions.setEnteredValue}
      />

      {/* animation section */}
      {showPseudoCode && (
        <AnimationWrapper
          line={state.line}
          code={RadixSortPseudoCode}
          controller={controller}
          showPseudoCode={showPseudoCode}
        >
          <ValueArray
            data={state.sortData}
            speed={controller.speed}
          />
          <SortArray
            items={state.data}
            speed={controller.speed}
          />
          {state.currDigit >= 0 ? (
            <StyledTextDiv
              style={{ marginTop: "20px" }}
              text={`Current digit position -> ${state.currDigit}`}
            />
          ) : (
            <></>
          )}
        </AnimationWrapper>
      )}
    </>
  );
}

export default RadixSortPage;
