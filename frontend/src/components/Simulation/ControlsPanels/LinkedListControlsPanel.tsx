import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setError,
  setCurrentAlgorithm,
  setInput,
  setInputArray,
  clearInputArray,
} from "../../../store/reducers/alghoritms/linkedList-reducer";
import { generateRandomArrForHeap, getArrFromInputForHeap } from "../BinaryTree/Helpers/Functions";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { LinkedListAnimationController } from "../../../ClassObjects/LinkedList/LinkedListAnimationController";
import BaseControlPanel from "./BaseControlPanel";

interface Props {
  controller: LinkedListAnimationController;
  isButtonDisabled: boolean;
  showActions: boolean;
  editingConstruction: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
}

const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";

const LinkedListControlsPanel: FC<Props> = ({
  controller,
  isButtonDisabled,
  showActions,
  editingConstruction,
  handleShowActions,
  handleHideActions,
}) => {
  const inputArray = useAppSelector((state) => state.linkedList.inputArray);
  const inputValues = useAppSelector((state) => state.linkedList.inputValues);
  const error = useAppSelector((state) => state.linkedList.error);

  const algorithms = ["Search", "InsertToHead", "InsertToTail", "DeleteFromHead", "DeleteFromTail"];

  const [regsterActivity] = useRegisterActivityMutation();

  const dispatch = useAppDispatch();

  const [value, setValue] = useState("1");
  const [numberOfRandomNodes, setNumberOfRandomNodes] = useState(0);

  const handleRandomNodes = (e: any) => {
    const val = Number(e.target.value);
    if (val < 1 || val > 8) {
      setCurrentError("Please enter a value between 1-8");
      setNumberOfRandomNodes(0);
      return;
    }
    setNumberOfRandomNodes(val);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const setCurrentError = (error: string) => {
    dispatch(setError(error));
    setTimeout(() => {
      dispatch(setError(""));
    }, 5000);
  };

  const handleInput = (e: any) => {
    const val = Number(e.target.value);
    const key = e.target.name;
    if (val < 1000 && val > -1) {
      dispatch(setInput({ val, key }));
    } else {
      setCurrentError("Please enter a number between 0 and 999");
    }
  };

  const createLinkedListHandler = () => {
    const res = getArrFromInputForHeap(8, inputArray);
    if (typeof res !== "string") {
      try {
        controller.setListFromInput(res);
        handleShowActions();
        setValue("Search");
        dispatch(setCurrentAlgorithm("Search"));
      } catch (e: any) {
        setCurrentError(e.message);
      }
    } else {
      setCurrentError(res);
    }
  };

  const randomizeInput = () => {
    if (numberOfRandomNodes < 1 || numberOfRandomNodes > 8) {
      setCurrentError("Please enter the number of nodes to randomize.");
      return;
    }
    const randomArray = generateRandomArrForHeap(numberOfRandomNodes, 1, numberOfRandomNodes);
    controller.setListFromInput(randomArray);
    handleShowActions();
    setValue("Search");
    dispatch(setCurrentAlgorithm("Search"));
    dispatch(clearInputArray());
    dispatch(setInputArray(randomArray));
  };

  const Animate = async (animation: string) => {
    try {
      switch (animation) {
        case "Search":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "Search",
          });
          await controller.search(inputValues.Search);
          return;
        case "InsertToHead":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "Insert to Head",
          });
          await controller.insertToHead(inputValues.InsertToHead);
          return;
        case "InsertToTail":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "Insert to Tail",
          });
          await controller.insertToTail(inputValues.InsertToTail);
          return;
        case "DeleteFromHead":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "DeleteFromHead",
          });
          await controller.deleteFromHead(inputValues.DeleteFromHead);
          return;
        case "DeleteFromTail":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "DeleteFromTail",
          });
          await controller.deleteFromTail(inputValues.DeleteFromTail);
          return;
        case "Clear":
          controller.setListFromInput([]);
          dispatch(clearInputArray());
          return;
        default:
          return;
      }
    } catch (e: any) {
      setCurrentError(e.message);
    }
  };

  const setAlgorithm = (name: any) => {
    dispatch(setCurrentAlgorithm(name));
  };

  useEffect(() => {
    dispatch(clearInputArray());
  }, []);

  return (
    <BaseControlPanel
      error={error}
      setCurrentError={setCurrentError}
      isButtonDisabled={isButtonDisabled}
      showActions={showActions}
      editingConstruction={editingConstruction}
      handleHideActions={handleHideActions}
      handleShowActions={handleShowActions}
      setAlgorithm={setAlgorithm}
      algorithms={algorithms}
      inputArray={inputArray}
      setInputArray={(e) => {
        dispatch(setInputArray(e.target.value));
      }}
      createStructure={createLinkedListHandler}
      randomizeStructure={randomizeInput}
      animate={Animate}
      handleInput={handleInput}
      value={value}
      handleChange={handleChange}
      dataLabel={"Linked List"}
      dataForInput={"Build-Linked-List"}
      handleRandomNodes={handleRandomNodes}
    />
  );
};

export default LinkedListControlsPanel;
