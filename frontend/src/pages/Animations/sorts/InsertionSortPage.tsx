import insertionSortPhoto from "../../../assets/Algorithms/IS1.png";
import InsertionSortController from "../../../ClassObjects/SortControllers/InsertionSortController";
import { SortControlsPanel } from "../../../components/Simulation/ControlsPanels/SortControlsPanel";
import { InsertionSortPseudoCode } from "../../../components/Simulation/PseudoCode/PseudoCodeData";
import ArrayElement from "../../../components/Simulation/Sorts/helpers/ArrayElement";
import { getRandomNumsArr } from "../../../components/Simulation/Sorts/helpers/functions";
import { IndexArray } from "../../../components/Simulation/Sorts/helpers/IndexArray";
import SortArray from "../../../components/Simulation/Sorts/helpers/SortArray";
import { InsertionSortOperation } from "../../../components/Simulation/Sorts/helpers/types";
import { insertionSort } from "../../../components/Simulation/Sorts/InsertionSort/InsertionSortAlgorithm";
import { AnimationWrapper } from "../../../components/Simulation/Wrappers/AnimationWrapper";
import { SubjectImg } from "../../../components/UI/SubjectImg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import {
  insertionSortActions as actions,
  ItemColor,
} from "../../../store/reducers/sorts/insertionSortReducer";
import SideBar from "../../../components/Layout/SideBar/SideBar";


const MAX_ELEMENTS = 10;

function InsertionSortPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.insertionSort);
  const [ regsterActivity ] = useRegisterActivityMutation();
  const controller = InsertionSortController.getController(dispatch);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Insertion",
      subject: "Sorts",
    });
    const opArr: InsertionSortOperation[] = insertionSort([ ...state.data ]);
    await controller.sort(opArr);
  };

  const setInput = (data: number[]) => {
    controller.init();
    dispatch(actions.setData(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS));
  };

  return (
    <>
      <SideBar />
      {/* top section */}
      <SubjectImg
        name="Insertion Sort"
        src={insertionSortPhoto}
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
      />

      {/* animation section */}
      <AnimationWrapper
        line={state.line}
        code={InsertionSortPseudoCode}
        controller={controller}
      >
        <IndexArray
          size={state.data.length + 1}
          i={state.i}
          j={state.j}
        />
        <SortArray
          items={state.data}
          speed={controller.speed}
        />
        <div style={{ marginTop: "40px" }}>
          {state.keyValue ? (
            <ArrayElement
              name="key"
              keyVal={1}
              value={state.keyValue}
              color={state.line === 7 ? ItemColor.MARKED : ItemColor.BASE}
              speed={controller.speed}
            />
          ) : (
            <></>
          )}
        </div>
      </AnimationWrapper>
    </>
  );
}

export default InsertionSortPage;
