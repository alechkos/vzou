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

const MAX_ELEMENTS = 10;

function RadixSortPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.radixSort);
  const [regsterActivity] = useRegisterActivityMutation();
  const controller = RadixSortController.getController(dispatch);

  const Sort = async () => {
    regsterActivity({
      algorithm: "Radix",
      subject: "Sorts",
    });
    const opArr: RadixSortOperation[] = radixSort([...state.data]);
    await controller.sort(opArr);
  };

  const setInput = (data: number[]) => {
    controller.init();
    dispatch(actions.setData(data));
  };

  const setRandomInput = () => {
    setInput(getRandomNumsArr(MAX_ELEMENTS, 1000));
  };

  return (
    <>
      <SideBar />
      {/* top section */}
      <SubjectImg
        name="Insertion Sort"
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
      />

      {/* animation section */}
      <AnimationWrapper
        line={state.line}
        code={RadixSortPseudoCode}
        controller={controller}
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
    </>
  );
}

export default RadixSortPage;
