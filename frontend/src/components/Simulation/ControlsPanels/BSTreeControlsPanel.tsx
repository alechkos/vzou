import React, { FC, useEffect, useState } from "react";

import BSTreeAnimationController from "../../../ClassObjects/BST/BSTreeAnimationController";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setError,
  setInput,
  setInputArray,
  setCurrentAlg,
} from "../../../store/reducers/alghoritms/bst-reducer";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { generateRandomArrForHeap, getArrFromInputForHeap } from "../BinaryTree/Helpers/Functions";
import { randomBuildTree } from "../BST/BST_Algorithms";
import BaseControlPanel from "./BaseControlPanel";

interface Props {
  controller: BSTreeAnimationController;
  isButtonDisabled: boolean;
  showActions: boolean;
  editingConstruction: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
}

const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";
/**
 * Renders the controls panel for the binary search tree.
 *
 * @param {Props} props - The props object.
 * @param {Controller} props.controller - The controller object.
 * @param {boolean} props.isButtonDisabled - Determines if the button is disabled.
 * @return {JSX.Element} The BSTreeControlsPanel component.
 */
const BSTreeControlsPanel: FC<Props> = ({
  controller,
  isButtonDisabled,
  showActions,
  editingConstruction,
  handleShowActions,
  handleHideActions,
}) => {
  const [regsterActivity] = useRegisterActivityMutation();
  const inputArray = useAppSelector((state) => state.bst.inputArray);
  const inputValues = useAppSelector((state) => state.bst.inputValues);
  const error = useAppSelector((state) => state.bst.error);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("1");

  const algorithms = [
    "Min / Max",
    "Traversals",
    "Successor",
    "Predecessor",
    "Search",
    "Insert",
    "Delete",
  ];

  const [numberOfRandomNodes, setNumberOfRandomNodes] = useState(0);

  const handleRandomNodes = (e: any) => {
    const val = Number(e.target.value);
    if (val < 1 || val > 20) {
      setCurrentError("Please enter a value between 1-20");
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
  /**
   * This function handles the creation of a Binary Search Tree from an input array.
   *
   * @return {Promise<void>} Returns nothing.
   */
  const createBSTreeHandler = async () => {
    const res = getArrFromInputForHeap(15, inputArray);
    if (typeof res !== "string") {
      try {
        controller.setTreeFromInput(res);
        handleShowActions();
        setValue("2");
        dispatch(setCurrentAlg("Min"));
      } catch (e: any) {
        setCurrentError(e.message);
      }
    } else {
      setCurrentError(res);
    }
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
  /**
   * Executes a specific animation based on the given string parameter.
   *
   * @param {string} animation - the name of the animation to be executed
   * @return {Promise<void>} returns a Promise that resolves when the animation is complete
   * and rejects with an error message in case of any exception
   */
  const Animate = async (animation: string) => {
    try {
      switch (animation) {
        case "Search":
          regsterActivity({
            subject: "BST",
            algorithm: "Search",
          });
          await controller.search(inputValues.Search);
          return;
        case "Insert":
          regsterActivity({
            subject: "BST",
            algorithm: "Insert",
          });
          await controller.insert(inputValues.Insert);
          return;
        case "Delete":
          regsterActivity({
            subject: "BST",
            algorithm: "Delete",
          });
          await controller.deleteNode(inputValues.Delete);
          return;
        case "Min":
          regsterActivity({
            subject: "BST",
            algorithm: "Min",
          });
          await controller.min();
          return;
        case "Max":
          regsterActivity({
            subject: "BST",
            algorithm: "Max",
          });
          await controller.max();
          return;
        case "Successor":
          regsterActivity({
            subject: "BST",
            algorithm: "Successor",
          });
          await controller.successor(inputValues.Successor);
          return;
        case "Predecessor":
          regsterActivity({
            subject: "BST",
            algorithm: "Predecessor",
          });
          await controller.predecessor(inputValues.Predecessor);
          return;
        case "Clear":
          controller.setTreeFromInput([]);
          return;
        case "Inorder":
          regsterActivity({
            subject: "BST",
            algorithm: "Inorder",
          });
          await controller.inorder();
          return;
        case "Preorder":
          regsterActivity({
            subject: "BST",
            algorithm: "Preorder",
          });
          await controller.preorder();
          return;
        case "Postorder":
          regsterActivity({
            subject: "BST",
            algorithm: "Postorder",
          });
          await controller.postorder();
          return;
        default:
          return;
      }
    } catch (e: any) {
      setCurrentError(e.message);
    }
  };
  const randomizeInput = () => {
    if (numberOfRandomNodes < 1 || numberOfRandomNodes > 20) {
      setCurrentError("Please enter the number of nodes to randomize.");
      return;
    }
    controller.setTreeFromInput(
      [],
      randomBuildTree(generateRandomArrForHeap(numberOfRandomNodes, 1, numberOfRandomNodes))
    );
    handleShowActions();
    setValue("2");
    dispatch(setCurrentAlg("Min"));
  };

  const setAlgorithm = (name: any) => {
    dispatch(setCurrentAlg(name));
  };

  // useEffect(() => {
  //   // create a random array whenever the page is loaded.
  //   controller.setTreeFromInput([2, 1, 3]);
  // }, []);

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
      createStructure={createBSTreeHandler}
      randomizeStructure={randomizeInput}
      animate={Animate}
      handleInput={handleInput}
      value={value}
      handleChange={handleChange}
      dataLabel={"BST"}
      dataForInput={"Build-BST-Tree"}
      minMax={["Min", "Max"]}
      traversals={["Inorder", "Preorder", "Postorder"]}
      handleRandomNodes={handleRandomNodes}
    />
  );
};

export default BSTreeControlsPanel;
