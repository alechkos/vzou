import countingSortPhoto from "../../../assets/Algorithms/CS1.png";
import CountingSortController from "../../../ClassObjects/SortControllers/CountingSortController";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { CountingSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { CountingSort } from "../../../components/Simulation/Sorts/CountingSort/CountingSortAlgorithem";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { CountingSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { StyledTextDiv } from "../../../components/UI/StyledTextDiv";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { init } from "../../../store/reducers/sorts/countingSortReducer";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { useAddUserInputMutation } from "../../../store/reducers/userInput-reducer-api";
import { useState } from "react";
import SavedInput from "../../../components/Layout/SideBar/SavedInput";
import { setEnteredValue } from "../../../store/reducers/sorts/countingSortReducer";

const MAX_ELEMENTS = 10;

function CountingSortPage() {
  const dispatch = useAppDispatch();
  const isSortStarted = useAppSelector((s) => s.animationController.isSortStarted);
  const state = useAppSelector((state) => state.countingSort);
  const user = useAppSelector((state) => state.auth.user);

  const [regsterActivity] = useRegisterActivityMutation();
  const [userInput, { error: userInpError, isLoading, isSuccess }] = useAddUserInputMutation();

  const controller = CountingSortController.getController(dispatch);

  const [showPseudoCode, setShowPseudoCode] = useState(false);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Counting",
      subject: "Sorts",
    });
    const opArr: CountingSortOperation[] = CountingSort([...state.A], state.k);
    await controller.sort(opArr);
  };

  const setInput = async (data: number[], isRandom?: boolean) => {
    controller.init();
    dispatch(init({ data, arrName: "A" }));

    if (!isRandom) {
      const userInputData = {
        userID: Number(user!.id),
        subject: "CountingSort",
        algorithm: "CountingSort",
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
    const randInput = getRandomNumsArr(MAX_ELEMENTS, 11);
    dispatch(setEnteredValue(randInput.toString()));

    setInput(randInput, true);
  };

  return (
    <>
      <SideBar />
      {!showPseudoCode && (
        <SavedInput
          subject={"CountingSort"}
          setInput={setEnteredValue}
        />
      )}
      {/* top section */}
      <SubjectImg
        name="Counting Sort"
        src={countingSortPhoto}
        width="260px"
      />

      <SortControlsPanel
        rightBtnHandler={Sort}
        inputHandler={setInput}
        leftBtnHandler={setRandomInput}
        inputBtnText="Set"
        rightBtnText="Sort"
        leftBtnText="Random"
        maxElements={MAX_ELEMENTS}
        maxInputNum={9}
        enteredValue={state.enteredValue}
        setEnteredValue={setEnteredValue}
      />

      {/* animation section */}
      {showPseudoCode && (
        <AnimationWrapper
          line={state.line}
          code={CountingSortPseudoCode}
          controller={controller}
          showPseudoCode={showPseudoCode}
        >
          {state.A.length > 0 ? (
            <StyledTextDiv
              text={`A[${state.A.length}]`}
              style={{ height: "20px" }}
            />
          ) : (
            <></>
          )}
          <IndexArray
            size={state.A.length + 1}
            i={state.indexA}
          />
          <SortArray
            items={state.A}
            speed={controller.speed}
          />

          <div style={{ marginTop: "40px" }}>
            {state.C.length > 0 ? (
              <StyledTextDiv
                text={`C[${state.C.length}]`}
                style={{ height: "20px" }}
              />
            ) : (
              <></>
            )}
            <IndexArray
              size={state.C.length + 1}
              i={state.indexC}
            />
            <SortArray
              items={state.C}
              speed={controller.speed}
            />
          </div>

          <div style={{ marginTop: "40px" }}>
            {state.B.length > 0 ? (
              <StyledTextDiv
                text={`B[${state.B.length}]`}
                style={{ height: "20px" }}
              />
            ) : (
              <></>
            )}
            <IndexArray
              size={state.B.length + 1}
              i={state.indexB}
            />
            <SortArray
              items={state.B}
              speed={controller.speed}
            />
          </div>

          {isSortStarted ? (
            <StyledTextDiv
              text={`K -> ${state.k}`}
              style={{ marginTop: "20px" }}
            />
          ) : (
            <></>
          )}
        </AnimationWrapper>
      )}
    </>
  );
}

export default CountingSortPage;
