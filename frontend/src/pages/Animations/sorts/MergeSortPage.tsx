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


const MAX_ELEMENTS = 8;

function MergeSortPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.mergeSort);
  const [ regsterActivity ] = useRegisterActivityMutation();
  const controller = MergeSortController.getController(dispatch);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Merge",
      subject: "Sorts",
    });
    const opArr: MergeSortOperation[] = mergeSort([ ...state.tree[1].data ]);
    await controller.sort(opArr);
  };

  const setInput = (data: number[]) => {
    controller.init();
    dispatch(ActionKind.init(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS));
  };

  return (
    <>
        <SideBar />
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
      />

      {/* animation section */}
      <AnimationWrapper
        line={state.line}
        code={mergeSortPseudoCode}
        width={300}
        controller={controller}
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
    </>
  );
}

export default MergeSortPage;
