import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";

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
import { useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { bucketSortActions as actions } from "../../../store/reducers/sorts/bucketSortReducer";
import SideBar from "../../../components/Layout/SideBar/SideBar";


export function BucketSortPage() {
  const MAX_ELEMENTS = 10;
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.bucketSort);
  const [ regsterActivity ] = useRegisterActivityMutation();
  const controller = BucketSortController.getController(dispatch);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Bucket",
      subject: "Sorts",
    });
    const opArr: BucketSortOperation[] = BucketSort(state.data);
    await controller.sort(opArr);
  };

  const setInput = (data: number[]) => {
    controller.init();
    dispatch(actions.setData(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS, 21));
  };

  return (
    <>
      <SideBar />
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
      />

      {/* animation section */}
      <AnimationWrapper
        line={state.line}
        code={BucketSortPseudoCode}
        controller={controller}
        width={290}
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
    </>
  );
}
