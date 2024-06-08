import React, { FC, useEffect, useState } from "react";

import { AvlAnimationController } from "../../../ClassObjects/BST/AvlAnimationController";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setError,
  setInput,
  setInputArray,
  setCurrentAlg,
  clearInputArray,
} from "../../../store/reducers/alghoritms/bst-reducer";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { buildTree } from "../AVL/AVL_Algorithms";
import { generateRandomArrForHeap, getArrFromInputForHeap } from "../BinaryTree/Helpers/Functions";
import BaseControlPanel from "./BaseControlPanel";

interface Props {
  controller: AvlAnimationController;
  isButtonDisabled: boolean;
  showActions: boolean;
  editingConstruction: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
}

/**
 * Renders the controls panel for the binary search tree.
 *
 * @param {Props} props - The props object.
 * @param {Controller} props.controller - The controller object.
 * @param {boolean} props.isButtonDisabled - Determines if the button is disabled.
 * @return {JSX.Element} The BSTreeControlsPanel component.
 */
const AvlControlsPanel: FC<Props> = ({
  controller,
  isButtonDisabled,
  handleHideActions,
  handleShowActions,
  showActions,
  editingConstruction,
}) => {
  const inputArray = useAppSelector((state) => state.bst.inputArray);
  const inputValues = useAppSelector((state) => state.bst.inputValues);
  const error = useAppSelector((state) => state.bst.error);
  const dispatch = useAppDispatch();
  const [regsterActivity] = useRegisterActivityMutation();

  const algorithms = [
    "Min / Max",
    "Traversals",
    "Successor",
    "Predecessor",
    "Search",
    "Insert",
    "Delete",
  ];

  const [value, setValue] = useState("1");

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
            subject: "AVL",
            algorithm: "Search",
          });
          await controller.search(inputValues.Search);
          return;
        case "Insert":
          regsterActivity({
            subject: "AVL",
            algorithm: "Insert",
          });
          await controller.insert(inputValues.Insert);
          return;
        case "DeleteNode":
          regsterActivity({
            subject: "AVL",
            algorithm: "DeleteNode",
          });
          await controller.deleteNode(inputValues.DeleteNode);
          return;
        case "Min":
          regsterActivity({
            subject: "AVL",
            algorithm: "Min",
          });
          await controller.min();
          return;
        case "Max":
          regsterActivity({
            subject: "AVL",
            algorithm: "Max",
          });
          await controller.max();
          return;
        case "Successor":
          regsterActivity({
            subject: "AVL",
            algorithm: "Successor",
          });
          await controller.successor(inputValues.Successor);
          return;
        case "Predecessor":
          regsterActivity({
            subject: "AVL",
            algorithm: "Predecessor",
          });
          await controller.predecessor(inputValues.Predecessor);
          return;
        case "Clear":
          controller.setTreeFromInput([]);
          dispatch(clearInputArray());
          return;
        case "Inorder":
          regsterActivity({
            subject: "AVL",
            algorithm: "Inorder",
          });
          await controller.inorder();
          return;
        case "Preorder":
          regsterActivity({
            subject: "AVL",
            algorithm: "Preorder",
          });
          await controller.preorder();
          return;
        case "Postorder":
          regsterActivity({
            subject: "AVL",
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
    const randomArray = generateRandomArrForHeap(9, 7);
    controller.setTreeFromInput([], buildTree(randomArray));
    handleShowActions();
    setValue("2");
    dispatch(setCurrentAlg("Min"));
    dispatch(clearInputArray());
    dispatch(setInputArray(randomArray));
  };

  const setAlgorithm = (name: any) => {
    dispatch(setCurrentAlg(name));
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
      createStructure={createBSTreeHandler}
      randomizeStructure={randomizeInput}
      animate={Animate}
      handleInput={handleInput}
      value={value}
      handleChange={handleChange}
    />
  );
};

export default AvlControlsPanel;
