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
  setA,
  addValuesForHash,
  deleteValuesFromHash,
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
  const A = useAppSelector((state) => state.hashTable.A);
  const hashTableSize = useAppSelector((state) => state.hashTable.hashTableSize);
  const hashTableValues = useAppSelector((state) => state.hashTable.hashTableValues);
  const error = useAppSelector((state) => state.hashTable.error);

  const [regsterActivity] = useRegisterActivityMutation();

  const dispatch = useAppDispatch();

  const [value, setValue] = useState("Chaining");
  const [selected, setSelected] = useState(
    value === "Chaining" ? "divisionMethod" : "linearProbing"
  );
  const [numberOfRandomNodes, setNumberOfRandomNodes] = useState(0);
  const [index, setIndex] = useState(0);

  const algorithms = [
    ["ChainingSearch", "ChainingInsert", "ChainingDelete"],
    ["Search", "Insert", "Delete"],
  ];

  const handleSetA = (e: any) => {
    const val = Number(e.target.value);
    if (isNaN(val)) {
      setCurrentError("Please enter a numeric value for A!");
      dispatch(setA(""));
      return;
    }
    if (val < 0) {
      setCurrentError(`A has to be greater than 0`);
      dispatch(setA(""));
      return;
    }
    if (val >= 1) {
      setCurrentError("A has to be lower than 1");
      dispatch(setA(""));
      return;
    }
    dispatch(setA(e.target.value));
  };

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
    if (newValue === "Open Addressing") setSelected("linearProbing");
    if (newValue === "Chaining") setSelected("divisionMethod");
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
    if (hashTableSize === "") {
      setCurrentError("Enter the size of table please!");
      return;
    }
    let keys: number[] = [];
    if (hashTableValues !== "") keys = hashTableValues.split(",").map((value) => Number(value));

    const inpArray = { size: Number(hashTableSize), keys, method: selected, A: Number(A) };
    dispatch(setInputArray(inpArray));

    controller.setHashFromInput(inpArray);
    handleShowActions();
    setValue(index === 0 ? "ChainingSearch" : "Search");
    dispatch(setCurrentAlgorithm(index === 0 ? "ChainingSearch1" : "Search1"));
  };

  const randomizeInput = () => {
    if (hashTableSize === "") {
      setCurrentError("Enter the size of table please!");
      return;
    }
    const randomA = Math.random();
    dispatch(setA(randomA.toString()));
    const randomArray = generateRandomArrForHeap(5, 1);
    dispatch(setValuesForHash(randomArray.toString()));

    const inpArray = {
      size: Number(hashTableSize),
      keys: randomArray,
      method: selected,
      A: randomA,
    };
    dispatch(setInputArray(inpArray));

    controller.setHashFromInput(inpArray);
    handleShowActions();
    setValue(index === 0 ? "ChainingSearch" : "Search");
    dispatch(
      setCurrentAlgorithm(
        index === 0 && selected === "divisionMethod"
          ? "ChainingSearch1"
          : index === 0 && selected === "multiplicationMethod"
          ? "ChainingSearch2"
          : selected === "linearProbing"
          ? "Search1"
          : "Search2"
      )
    );
  };

  const Animate = async (animation: string) => {
    try {
      switch (animation) {
        case "ChainingSearch":
          regsterActivity({
            subject: "HashTable",
            algorithm: "ChainingSearch",
          });
          if (selected === "multiplicationMethod")
            await controller.chainingSearch(inputValues.ChainingSearch, inputArray.size, Number(A));
          else await controller.chainingSearch(inputValues.ChainingSearch, inputArray.size);
          return;
        case "ChainingInsert":
          regsterActivity({
            subject: "HashTable",
            algorithm: "ChainingInsert",
          });
          dispatch(addValuesForHash(inputValues.ChainingInsert));
          if (selected === "multiplicationMethod")
            await controller.chainingInsert(inputValues.ChainingInsert, inputArray.size, Number(A));
          else await controller.chainingInsert(inputValues.ChainingInsert, inputArray.size);
          return;
        case "ChainingDelete":
          regsterActivity({
            subject: "HashTable",
            algorithm: "ChainingDelete",
          });
          dispatch(deleteValuesFromHash(inputValues.ChainingDelete));
          if (selected === "multiplicationMethod")
            await controller.chainingDelete(inputValues.ChainingDelete, inputArray.size, Number(A));
          else await controller.chainingDelete(inputValues.ChainingDelete, inputArray.size);
          return;
        case "Search":
          regsterActivity({
            subject: "HashTable",
            algorithm: "AddressSearch",
          });
          if (selected === "doubleHashing")
            await controller.search(inputValues.Search, inputArray.size, "double");
          else await controller.search(inputValues.Search, inputArray.size);
          return;
        case "Insert":
          regsterActivity({
            subject: "HashTable",
            algorithm: "AddressInsert",
          });
          if (selected === "doubleHashing")
            await controller.insert(inputValues.Insert, inputArray.size, "double");
          else await controller.insert(inputValues.Insert, inputArray.size);
          return;
        case "Delete":
          regsterActivity({
            subject: "HashTable",
            algorithm: "AddressDelete",
          });
          if (selected === "doubleHashing")
            await controller.delete(inputValues.Delete, inputArray.size, "double");
          else await controller.delete(inputValues.Delete, inputArray.size);
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

  const setAlgorithm = (name: any) => {
    let algName: string = "";
    switch (selected) {
      case "divisionMethod":
        algName = name + "1";
        break;
      case "linearProbing":
        algName = name + "1";
        break;
      case "multiplicationMethod":
        algName = name + "2";
        break;
      case "doubleHashing":
        algName = name + "2";
        break;
    }
    dispatch(setCurrentAlgorithm(algName));
  };

  useEffect(() => {
    dispatch(clearInputArray());
  }, []);

  useEffect(() => {
    if (selected === "divisionMethod" || selected === "multiplicationMethod") setIndex(0);
    else setIndex(1);
  }, [selected]);

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
        maxWidth="max-w-6xl"
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
                            key={alg}
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
                      {algorithms[index].map((alg) => {
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
                      {selected === "multiplicationMethod" && (
                        <TextField
                          sx={{ width: "100px", marginRight: "10px" }}
                          name={text}
                          size="small"
                          type="text"
                          variant="outlined"
                          label={"Enter A"}
                          inputProps={{
                            min: 0,
                            max: 999,
                            style: { textAlign: "center" },
                          }}
                          value={A}
                          onChange={handleSetA}
                        />
                      )}
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
                          label={"Size of Table"}
                          inputProps={{
                            min: 0,
                            max: 999,
                            style: { textAlign: "center" },
                          }}
                          value={hashTableSize}
                          onChange={handleSetSize}
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
                  algorithms[index]
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
