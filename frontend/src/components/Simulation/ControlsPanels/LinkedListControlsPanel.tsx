import React, { FC, useState } from "react";
import { AlertError } from "../../UI/Controls/AlertError";
import MediumCard from "../../UI/MediumCard";
import { TextField, ThemeProvider } from "@mui/material";
import { theme } from "../../UI/Controls/ControlsTheme";
import { ControlsToolTip } from "../../UI/Controls/ControlsToolTip";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import CasinoIcon from "@mui/icons-material/Casino";
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

interface Props {
  isButtonDisabled: boolean;
  showActions: boolean;
  editingConstruction: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
  setShowPseudoCode: (show: boolean) => void; //pseudo code only after building
}

const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";

const LinkedListControlsPanel: FC<Props> = ({
  isButtonDisabled,
  showActions,
  editingConstruction,
  handleShowActions,
  handleHideActions,
  setShowPseudoCode,
}) => {
  const inputArray = useAppSelector((state) => state.linkedList.inputArray);
  const inputValues = useAppSelector((state) => state.linkedList.inputValues);
  const error = useAppSelector((state) => state.linkedList.error);

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
        // controller.setTreeFromInput(res);
        handleShowActions();
        setValue("2");
        dispatch(setCurrentAlgorithm("Search"));
        setShowPseudoCode(true); //after build
      } catch (e: any) {
        setCurrentError(e.message);
      }
    } else {
      setCurrentError(res);
    }
  };

  const randomizeInput = () => {
    const randomArray = generateRandomArrForHeap();
    // controller.setTreeFromInput([], buildTree(randomArray));
    handleShowActions();
    setValue("2");
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
        case "Insert":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "Insert",
          });
          // await controller.insert(inputValues.Insert);
          return;
        case "Delete":
          regsterActivity({
            subject: "LinkedList",
            algorithm: "Delete",
          });
          // await controller.deleteNode(inputValues.DeleteNode);
          return;
        case "Clear":
          dispatch(clearInputArray());
          return;
        default:
          return;
      }
    } catch (e: any) {
      setCurrentError(e.message);
    }
  };

  return (
    <>
      {error && (
        <AlertError
          error={error}
          onClose={() => {
            setCurrentError("");
          }}
        />
      )}
      <MediumCard
        isSmaller
        maxWidth="max-w-5xl"
      >
        <ThemeProvider theme={theme}>
          <ControlsToolTip isButtonDisabled={isButtonDisabled}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="algorithms and actions"
                    centered
                  >
                    {!showActions && !editingConstruction && (
                      <Tab
                        label="Create Linked List"
                        value="1"
                        disabled={isButtonDisabled}
                      />
                    )}
                    {(showActions || editingConstruction) && (
                      <Tab
                        label="Change Linked List"
                        value="1"
                        onClick={handleHideActions}
                        disabled={isButtonDisabled}
                      />
                    )}
                  </TabList>
                  {showActions && (
                    <TabList
                      onChange={handleChange}
                      aria-label="algorithms and actions"
                      centered
                    >
                      <Tab
                        label="Search"
                        value="Search"
                        onClick={() => {
                          dispatch(setCurrentAlgorithm("Search"));
                        }}
                        disabled={isButtonDisabled}
                      />
                      <Tab
                        label="Insert"
                        value="Insert"
                        onClick={() => {
                          dispatch(setCurrentAlgorithm("Insert"));
                        }}
                        disabled={isButtonDisabled}
                      />
                      <Tab
                        label="Delete"
                        value="Delete"
                        onClick={() => {
                          dispatch(setCurrentAlgorithm("Delete"));
                        }}
                        disabled={isButtonDisabled}
                      />
                    </TabList>
                  )}
                </Box>
                <TabPanel
                  value="1"
                  className={value === "1" ? "justify-start " : "hidden"}
                >
                  <TextField
                    placeholder="e.g 1,2,3,4,..."
                    size="small"
                    sx={{ width: "150px" }}
                    value={inputArray}
                    label="Build-Linked-List"
                    variant="outlined"
                    onChange={(e) => dispatch(setInputArray(e.target.value))}
                  />
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[40px] h-[40px]`}
                    onClick={createLinkedListHandler}
                  >
                    Go
                  </button>
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[140px] h-[40px] ml-8`}
                    onClick={randomizeInput}
                  >
                    <CasinoIcon />
                    Randomize
                  </button>
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[60px] h-[40px] ml-8`}
                    // onClick={async () => Animate("Clear")}
                  >
                    Clear
                  </button>
                </TabPanel>
                {["Insert, Delete, Search"].map((text) => (
                  <TabPanel
                    key={text}
                    value={text}
                    className={value === text ? "justify-start " : "hidden"}
                  >
                    <TextField
                      sx={{ width: "138px" }}
                      name={text as "Search" | "Insert" | "Delete"}
                      size="small"
                      type="text"
                      variant="outlined"
                      label={"Your value here"}
                      inputProps={{
                        min: 0,
                        max: 999,
                        style: { textAlign: "center" },
                      }}
                      onChange={handleInput}
                    />
                    <button
                      disabled={isButtonDisabled}
                      className={`${buttonClassname} w-[40px] h-[40px]`}
                      // onClick={async () =>
                      //   Animate(text).catch((e) => {
                      //     setCurrentError(e.message);
                      //   })
                      // }
                    >
                      Go
                    </button>
                  </TabPanel>
                ))}
              </TabContext>
            </Box>
          </ControlsToolTip>
        </ThemeProvider>
      </MediumCard>
    </>
  );
};

export default LinkedListControlsPanel;
