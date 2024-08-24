import { AnimatePresence, motion } from "framer-motion";

import bucketSortPhoto from "../../../assets/Algorithms/BS1.png";
import BucketSortController from "../../../ClassObjects/SortControllers/BucketSortController";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { BucketSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import { BucketSort } from "../../../components/Simulation/Sorts/BucketSort/BucketSort";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { BucketSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { setEnteredValue, setData } from "../../../store/reducers/sorts/bucketSortReducer";
// import { bucketSortActions as actions } from "../../../store/reducers/sorts/bucketSortReducer";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { useAddUserInputMutation } from "../../../store/reducers/userInput-reducer-api";
import { useState } from "react";
import SavedInput from "../../../components/Layout/SideBar/SavedInput";

export function BucketSortPage() {
  const MAX_ELEMENTS = 10;
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.bucketSort);
  const enteredValue = useAppSelector((state) => state.bucketSort.enteredValue);
  const user = useAppSelector((state) => state.auth.user);

  const [regsterActivity] = useRegisterActivityMutation();
  const [userInput, { error: userInpError, isLoading, isSuccess }] = useAddUserInputMutation();
  const controller = BucketSortController.getController(dispatch);

  const [showPseudoCode, setShowPseudoCode] = useState(false);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Bucket",
      subject: "Sorts",
    });
    const opArr: BucketSortOperation[] = BucketSort(state.data);
    await controller.sort(opArr);
  };

  const setInput = async (data: number[], isRandom?: boolean) => {
    controller.init();
    dispatch(setData(data));

    if (!isRandom) {
      const userInputData = {
        userID: Number(user!.id),
        subject: "BucketSort",
        algorithm: "BucketSort",
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
    const randInput = getRandomNumsArr(MAX_ELEMENTS, 21);
    dispatch(setEnteredValue(randInput.toString()));

    setInput(randInput, true);
  };

  return (
    <>
      <SideBar />
      {!showPseudoCode && (
        <SavedInput
          subject={"BucketSort"}
          setInput={setEnteredValue}
        />
      )}

      {/* top section */}
      <SubjectImg
        name="Bucket Sort"
        src={bucketSortPhoto}
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
        maxInputNum={20}
        enteredValue={enteredValue}
        setEnteredValue={setEnteredValue}
      />

      {/* animation section */}
      {showPseudoCode && (
        <AnimationWrapper
          line={state.line}
          code={BucketSortPseudoCode}
          controller={controller}
          width={290}
          showPseudoCode={showPseudoCode}
        >
          <SortArray
            items={state.data}
            speed={1}
          />
          <div className="mt-20" />
          <div className="pl-56">
            <AnimatePresence mode="sync">
              {state.buckets.map((e, index) => (
                <div
                  className="flex justify-left mt-6"
                  key={index}
                >
                  <motion.b
                    style={{ width: "80px", fontFamily: "monaco" }}
                    transition={{ duration: 1 }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      color: state.bucketIndex === index ? "#84cc16" : "",
                    }}
                    exit={{ opacity: 0, x: -50, transition: { duration: 1 } }}
                  >
                    {e.title}
                  </motion.b>
                  <div>
                    <SortArray
                      items={e.data}
                      speed={1}
                    />
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </AnimationWrapper>
      )}
    </>
  );
}
