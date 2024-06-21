import React, { FC, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { generateRandomArrForHeap, getArrFromInputForHeap } from "../BinaryTree/Helpers/Functions";
import { HashTableAnimationController } from "../../../ClassObjects/HashTable/HashTableAnimationController";
import {
  setError,
  clearInputArray,
  setInput,
  setCurrentAlgorithm,
  setSizeForHash,
  setValuesForHash,
  setInputArray,
} from "../../../store/reducers/alghoritms/hashTable-reducer";
import { AlertError } from "../../UI/Controls/AlertError";
import MediumCard from "../../UI/MediumCard";
import { Checkbox, FormControlLabel, FormGroup, TextField, ThemeProvider } from "@mui/material";
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
  const hashTableSize = useAppSelector((state) => state.hashTable.hashTableSize);
  const hashTableValues = useAppSelector((state) => state.hashTable.hashTableValues);
  const error = useAppSelector((state) => state.hashTable.error);

  const [regsterActivity] = useRegisterActivityMutation();

  const dispatch = useAppDispatch();

  const [value, setValue] = useState("Chaining");
  const [selected, setSelected] = useState("divisionMethod" || "linearProbing");
  const [numberOfRandomNodes, setNumberOfRandomNodes] = useState(0);

  const algorithms = ["1", "2", "3", "4", "5"];

  const handleSetValuesForHash = (e: any) => {
    const res = getArrFromInputForHeap(15, e.target.value, true);
    if (typeof res !== "string") {
      try {
        dispatch(setValuesForHash(e.target.value));
      } catch (e: any) {
        setCurrentError(e.message);
      }
    } else {
      setCurrentError(res);
    }
  };

  const handleSetSize = (e: any) => {
    const val = Number(e.target.value);
    if (isNaN(val)) {
      setCurrentError("Please enter a numeric value for Id!");
      dispatch(setSizeForHash(""));
      return;
    }
    if (val < 0) {
      setCurrentError(`Size has to be greater than 0}`);
      dispatch(setSizeForHash(""));
      return;
    }
    if (val > 10) {
      setCurrentError("Max size of hash table is 10");
      dispatch(setSizeForHash(""));
      return;
    }
    dispatch(setSizeForHash(e.target.value));
  };

  const handleRandomNodes = (e: any) => {
    const val = Number(e.target.value);
    if (val < 1 || val > 20) {
      setCurrentError("Please enter a value between 1-20");
      setNumberOfRandomNodes(0);
      return;
    }
    setNumberOfRandomNodes(val);
  };

  const handleChangeSelect = (event: any) => {
    setSelected(event.target.name);
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
    const keys = hashTableValues.split(",").map((value) => Number(value));

    const inpArray = { size: Number(hashTableSize), keys, method: selected };

    dispatch(setInputArray(inpArray));

    controller.setHashFromInput(inpArray);
    handleShowActions();
    // setValue("Search");
    // dispatch(setCurrentAlgorithm("Search"));
  };

  const randomizeInput = () => {
    const randomArray = generateRandomArrForHeap(7, 1);
    // controller.setHashFromInput(randomArray);
    handleShowActions();
    setValue("Search");
    dispatch(setCurrentAlgorithm("Search"));
    dispatch(clearInputArray());
    // dispatch(setInputArray([]));
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
                        value="Chaining"
                        disabled={isButtonDisabled}
                      />
                    )}
                    {(showActions || editingConstruction) && (
                      <Tab
                        label={`Change Hash Table construction`}
                        value="Chaining"
                        onClick={handleHideActions}
                        disabled={isButtonDisabled}
                      />
                    )}
                  </TabList>
                  {!showActions && !editingConstruction && (
                    <TabList
                      onChange={handleChange}
                      aria-label="algorithms and actions"
                      centered
                    >
                      {["Chaining", "Open Addressing"].map((alg) => {
                        return (
                          <Tab
                            label={alg}
                            value={alg}
                            disabled={isButtonDisabled}
                          />
                        );
                      })}
                    </TabList>
                  )}
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
                {!showActions &&
                  !editingConstruction &&
                  ["Chaining", "Open Addressing"].map((text) => (
                    <TabPanel
                      key={text}
                      value={text}
                      className={value === text ? "justify-start flex w-max " : "hidden"}
                    >
                      <TextField
                        sx={{ width: "138px", marginRight: "10px" }}
                        name={text}
                        size="small"
                        type="text"
                        variant="outlined"
                        label={"Size of Table"}
                        inputProps={{
                          min: 0,
                          max: 999,
                          style: { textAlign: "center" },
                        }}
                        value={hashTableSize}
                        onChange={handleSetSize}
                      />
                      <TextField
                        sx={{ width: "138px", marginRight: "10px" }}
                        name={text}
                        size="small"
                        type="text"
                        variant="outlined"
                        label={"Enter Values"}
                        inputProps={{
                          min: 0,
                          max: 999,
                          style: { textAlign: "center" },
                        }}
                        value={hashTableValues}
                        onChange={handleSetValuesForHash}
                      />
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                selected === "divisionMethod" || selected === "linearProbing"
                              }
                              name={text === "Chaining" ? "divisionMethod" : "linearProbing"}
                              sx={{ marginRight: "10px" }}
                              onChange={handleChangeSelect}
                            />
                          }
                          label={text === "Chaining" ? "Division Method" : "Linear Probing"}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                selected === "multiplicationMethod" || selected === "doubleHashing"
                              }
                              name={text === "Chaining" ? "multiplicationMethod" : "doubleHashing"}
                              sx={{ marginRight: "10px" }}
                              onChange={handleChangeSelect}
                            />
                          }
                          label={text === "Chaining" ? "Multiplication Method" : "Double Hashing"}
                        />
                      </FormGroup>
                      <button
                        disabled={isButtonDisabled}
                        className={`${buttonClassname} w-[40px] h-[40px]`}
                        onClick={createHashTableHandler}
                      >
                        Go
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
                  ))}
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
