import React, { FC, useEffect, useState } from "react";
import { AlertError } from "../../UI/Controls/AlertError";
import MediumCard from "../../UI/MediumCard";
import { TextField, ThemeProvider } from "@mui/material";
import { theme } from "../../UI/Controls/ControlsTheme";
import { ControlsToolTip } from "../../UI/Controls/ControlsToolTip";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import {
  clearInputArray,
  setCurrentAlgorithm,
  setError,
  setInput,
  setInputArray,
} from "../../../store/reducers/alghoritms/linkedList-reducer";
import TabPanel from "@mui/lab/TabPanel";
import CasinoIcon from "@mui/icons-material/Casino";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { generateRandomArrForHeap, getArrFromInputForHeap } from "../BinaryTree/Helpers/Functions";

interface Props {
  controller: string;
  isButtonDisabled: boolean;
  showActions: boolean;
  editingConstruction: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
  setShowPseudoCode: (show: boolean) => void; //pseudo code only after building
}

const HashTableControlPanel: FC<Props> = ({
  controller,
  isButtonDisabled,
  showActions,
  editingConstruction,
  handleShowActions,
  handleHideActions,
  setShowPseudoCode,
}) => {
  const buttonClassname =
    "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";

  const inputArray = useAppSelector((state) => state.hashTable.inputArray);
  const inputValues = useAppSelector((state) => state.hashTable.inputValues);
  const error = useAppSelector((state) => state.hashTable.error);

  const [regsterActivity] = useRegisterActivityMutation();

  const dispatch = useAppDispatch();

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
    const res = getArrFromInputForHeap(15, inputArray);
    if (typeof res !== "string") {
      try {
        // controller.setListFromInput(res);
        handleShowActions();
        setValue("Search");
        // dispatch(setCurrentAlgorithm("Search"));
        setShowPseudoCode(true); //after build
      } catch (e: any) {
        setCurrentError(e.message);
      }
    } else {
      setCurrentError(res);
    }
  };

  const randomizeInput = () => {
    const randomArray = generateRandomArrForHeap(7, 1);
    // controller.setListFromInput(randomArray);
    handleShowActions();
    setValue("Search");
    dispatch(setCurrentAlgorithm("Search"));
    dispatch(clearInputArray());
    dispatch(setInputArray(randomArray));
    setShowPseudoCode(true); //after build
  };

  const Animate = async (animation: string) => {
    try {
      switch (animation) {
        case "Search":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "Search",
          });
          // await controller.search(inputValues.Search);
          return;
        case "InsertToHead":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "Insert to Head",
          });
          // await controller.insertToHead(inputValues.InsertToHead);
          return;
        case "InsertToTail":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "Insert to Tail",
          });
          // await controller.insertToTail(inputValues.InsertToTail);
          return;
        case "DeleteFromHead":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "DeleteFromHead",
          });
          // await controller.deleteFromHead(inputValues.DeleteFromHead);
          return;
        case "DeleteFromTail":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "DeleteFromTail",
          });
          // await controller.deleteFromTail(inputValues.DeleteFromTail);
          return;
        case "Clear":
          // controller.setListFromInput([]);
          dispatch(clearInputArray());
          return;
        default:
          return;
      }
    } catch (e: any) {
      setCurrentError(e.message);
    }
  };

  useEffect(() => {
    dispatch(clearInputArray());
  }, []);

  return <div></div>;
};

export default HashTableControlPanel;
