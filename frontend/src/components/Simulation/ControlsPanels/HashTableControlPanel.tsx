import React, { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { generateRandomArrForHeap, getArrFromInputForHeap } from "../BinaryTree/Helpers/Functions";
import { HashTableAnimationController } from "../../../ClassObjects/HashTable/HashTableAnimationController";
import {
  setError,
  setInputArray,
  clearInputArray,
  setInput,
  setCurrentAlgorithm,
} from "../../../store/reducers/alghoritms/hashTable-reducer";
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

interface Props {
  controller: HashTableAnimationController;
  isButtonDisabled: boolean;
  showActions: boolean;
  editingConstruction: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
}

const HashTableControlPanel: FC<Props> = ({
  controller,
  isButtonDisabled,
  showActions,
  editingConstruction,
  handleShowActions,
  handleHideActions,
}) => {
  const buttonClassname =
    "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";

  const inputArray = useAppSelector((state) => state.hashTable.inputArray);
  const inputValues = useAppSelector((state) => state.hashTable.inputValues);
  const error = useAppSelector((state) => state.hashTable.error);

  const [regsterActivity] = useRegisterActivityMutation();

  const dispatch = useAppDispatch();

  const [value, setValue] = useState("1");

  const algorithms = ["1", "2", "3", "4", "5"];

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

  const handleInput = (e: any) => {
    const val = Number(e.target.value);
    const key = e.target.name;
    if (val < 1000 && val > -1) {
      dispatch(setInput({ val, key }));
    } else {
      setCurrentError("Please enter a number between 0 and 999");
    }
  };

  const createHashTableHandler = () => {
    const res: number[] = [];
    // const res = getArrFromInputForHeap(15, inputArray);
    if (typeof res !== "string") {
      try {
        controller.setHashFromInput(res);
        handleShowActions();
        setValue("Search");
        // dispatch(setCurrentAlgorithm("Search"));
      } catch (e: any) {
        setCurrentError(e.message);
      }
    } else {
      setCurrentError(res);
    }
  };

  const randomizeInput = () => {
    const randomArray = generateRandomArrForHeap(7, 1);
    controller.setHashFromInput(randomArray);
    handleShowActions();
    setValue("Search");
    dispatch(setCurrentAlgorithm("Search"));
    dispatch(clearInputArray());
    dispatch(setInputArray([]));
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

  const setAlgorithm = (name: any) => {
    dispatch(setCurrentAlgorithm(name));
  };

  useEffect(() => {
    dispatch(clearInputArray());
  }, []);

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
                        label={`Create Hash Table construction`}
                        value="1"
                        disabled={isButtonDisabled}
                      />
                    )}
                    {(showActions || editingConstruction) && (
                      <Tab
                        label={`Change Hash Table construction`}
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
                      {algorithms.map((alg) => {
                        return (
                          <Tab
                            label={alg}
                            value={alg}
                            onClick={() => {
                              setAlgorithm(alg);
                            }}
                            disabled={isButtonDisabled}
                          />
                        );
                      })}
                    </TabList>
                  )}
                </Box>
                <TabPanel
                  value="1"
                  className={value === "1" ? "justify-start flex " : "hidden"}
                >
                  <TextField
                    placeholder="e.g 1,2,3,4,..."
                    size="small"
                    sx={{ width: "100px" }}
                    value={inputArray}
                    label="Enter Id"
                    variant="outlined"
                    onChange={(e) => setInputArray([])}
                  />
                  <TextField
                    placeholder="e.g 1,2,3,4,..."
                    size="small"
                    sx={{ width: "150px" }}
                    value={inputArray}
                    label="Enter Values"
                    variant="outlined"
                    onChange={(e) => setInputArray([])}
                  />
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[60px] h-[40px]`}
                    onClick={createHashTableHandler}
                  >
                    Add
                  </button>
                  <div className={"ml-10"}>
                    <TextField
                      sx={{ width: "150px" }}
                      name={"NumberOfRandom"}
                      size="small"
                      type="text"
                      variant="outlined"
                      label={"Number of nodes"}
                      inputProps={{
                        min: 0,
                        max: 999,
                        style: { textAlign: "center" },
                      }}
                      onChange={handleRandomNodes}
                    />
                    <button
                      disabled={isButtonDisabled}
                      className={`${buttonClassname} w-[140px] h-[40px]`}
                      onClick={randomizeInput}
                    >
                      <CasinoIcon />
                      Randomize
                    </button>
                  </div>
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[60px] h-[40px] ml-8`}
                    onClick={async () => Animate("Clear")}
                  >
                    Clear
                  </button>
                </TabPanel>
                {showActions &&
                  algorithms
                    .filter((alg) => !alg.includes("Min") && !alg.includes("Traversals"))
                    .map((text) => (
                      <TabPanel
                        key={text}
                        value={text}
                        className={value === text ? "justify-start " : "hidden"}
                      >
                        <TextField
                          sx={{ width: "138px" }}
                          name={text}
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
                          onClick={async () =>
                            Animate(text).catch((e) => {
                              setCurrentError(e.message);
                            })
                          }
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

export default HashTableControlPanel;
