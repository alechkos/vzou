import React, { FC, useEffect, useRef, useState } from "react";
import {
  TextField,
  ThemeProvider,
  Tab,
  Box,
  Slider,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { AlertError } from "../../UI/Controls/AlertError";
import { theme } from "../../UI/Controls/ControlsTheme";
import { ControlsToolTip } from "../../UI/Controls/ControlsToolTip";
import MediumCard from "../../UI/MediumCard";
import {
  setError,
  setInputArray,
  setGraphData,
  clearInputArray,
  setDirected,
  setInitialNode,
  setCountRows,
  setInputData,
  changeInputData,
} from "../../../store/reducers/alghoritms/bellmanFord-reducer";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";
import CasinoIcon from "@mui/icons-material/Casino";
import { BellmanFordAnimationController } from "../../../ClassObjects/BellmanFord/BellmanFordAnimationController";
import { BellmanFordNode } from "../../../ClassObjects/BellmanFord/BellmanFordNode";

interface Props {
  controller: BellmanFordAnimationController;
  showActions: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
  editingConstruction: boolean;
  setShowPseudoCode: (show: boolean) => void;
}

const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";

const BellmanFordControlPanel: FC<Props> = ({
  handleHideActions,
  handleShowActions,
  showActions,
  editingConstruction,
  setShowPseudoCode,
  controller,
}) => {
  const [regsterActivity] = useRegisterActivityMutation();
  const inputArray = useAppSelector((state) => state.bellmanFord.inputArray);
  const error = useAppSelector((state) => state.bellmanFord.error);
  const isButtonDisabled = useAppSelector((state) => state.bellmanFord.isPlaying);
  const directed = useAppSelector((state) => state.bellmanFord.directed);
  const graphData = useAppSelector((state) => state.bellmanFord.graphData);
  const rowCount = useAppSelector((state) => state.bellmanFord.countRows);
  const inputData = useAppSelector((state) => state.bellmanFord.inputData);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("1");
  const [initialNodeInput, setInitialNodeInput] = useState<string>("");
  const [numberOfRandomNodes, setNumberOfRandomNodes] = useState(0);
  const [selected, setSelected] = useState(directed);

  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);

  const handleAddValues = (event: any) => {
    dispatch(setCountRows(1));
    const button = event.currentTarget;
    button.disabled = true;
    fromRef.current!.disabled = true;
    toRef.current!.disabled = true;
    weightRef.current!.disabled = true;

    dispatch(
      setInputData({
        source: Number(fromRef.current!.value),
        target: Number(toRef.current!.value),
        weight: Number(weightRef.current!.value),
      })
    );
  };

  const handleChangeValues = (event: any, index: number) => {
    console.log(index);

    const button = event.currentTarget;
    button.disabled = true;

    fromRef.current!.disabled = true;
    toRef.current!.disabled = true;
    weightRef.current!.disabled = true;

    dispatch(
      changeInputData({
        source: Number(fromRef.current!.value),
        target: Number(toRef.current!.value),
        weight: Number(weightRef.current!.value),
        index,
      })
    );
  };

  const handleChangeSelect = (event: any) => {
    const newSelected = !selected;
    setSelected(newSelected);
    dispatch(setDirected(newSelected));
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

  const Animate = async (animation: string) => {
    try {
      switch (animation) {
        case "Search":
          regsterActivity({
            subject: "BellmanFord",
            algorithm: "Search",
          });
          const initialNode = graphData.nodes.find((data) => data === Number(initialNodeInput));
          if (initialNode === undefined) {
            setCurrentError("The node doesn't exist");
            setInitialNodeInput("");
            return;
          }
          dispatch(
            setInitialNode(new BellmanFordNode(Number(initialNodeInput), Number(initialNodeInput)))
          );

          // await controller.dfsAnimation();
          return;
        case "Clear":
          dispatch(clearInputArray());
          controller.setGraphFromInput({ nodes: [], links: [] });
          return;
        default:
          return;
      }
    } catch (e: any) {
      setCurrentError(e.message);
    }
  };

  const handleRandomNodes = (e: any) => {
    const val = Number(e.target.value);
    if (val < 1 || val > 10) {
      setCurrentError("Please enter a value between 1-10");
      setNumberOfRandomNodes(0);
      return;
    }
    setNumberOfRandomNodes(val);
  };

  const handleInitialNodeInput = (e: any) => {
    const val = Number(e.target.value);
    if (isNaN(val)) {
      setCurrentError("Please enter a numeric data format for node!");
      setInitialNodeInput("");
      return;
    }
    setInitialNodeInput(e.target.value);
  };

  const randomizeStructure = () => {
    if (numberOfRandomNodes < 1 || numberOfRandomNodes > 10) {
      setCurrentError("Please enter a value between 1-10");
      setNumberOfRandomNodes(0);
      return;
    }
    let randomString = "";
    let i = 1;
    for (i; i <= numberOfRandomNodes; i++) {
      let randomChar = Math.random() < 0.7 ? "-" : ",";
      if (randomChar === "-") {
        let randomNumber = Math.floor(Math.random() * numberOfRandomNodes) + 1;
        if (randomNumber !== i)
          randomString = randomString + i.toString() + randomChar + randomNumber.toString();
        if (i !== numberOfRandomNodes && randomNumber !== i) {
          randomString += ",";
        }
      } else {
        randomString = randomString + i.toString();
        if (i !== numberOfRandomNodes) {
          randomString += ",";
        }
      }
    }
    dispatch(setInputArray(randomString));
    createGraphHandler();
  };

  const createGraphHandler = () => {
    const nodes = new Set<number>();
    const links: { source: number; target: number }[] = [];

    inputData.forEach((data) => {
      nodes.add(data.source);
      nodes.add(data.target);
      links.push({ source: data.source, target: data.target });
      if (!selected) {
        links.push({ source: data.target, target: data.source });
      }
    });

    const graphData = { nodes: Array.from(nodes), links };
    controller.setGraphFromInput(graphData);
    dispatch(setGraphData(graphData));

    handleShowActions();
    setShowPseudoCode(true);
    DFSItemObj.positions = [];
  };

  const handleInput = (e: any) => {
    dispatch(setInputArray(e.target.value));
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
                        label={"Create Graph"}
                        value="1"
                        disabled={isButtonDisabled}
                      />
                    )}
                    {(showActions || editingConstruction) && (
                      <Tab
                        label={`Change Graph construction`}
                        value="1"
                        onClick={handleHideActions}
                        disabled={isButtonDisabled}
                      />
                    )}
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  className={value === "1" ? "justify-around flex w-max" : "hidden"}
                >
                  {!showActions && (
                    <>
                      <div className={"flex flex-col gap-2 mx-2 overflow-auto max-h-40 p-2"}>
                        {rowCount.map((row, index) => {
                          return (
                            <>
                              <div className={"flex gap-2"}>
                                <TextField
                                  placeholder="e.g 1,2,3,..."
                                  size="small"
                                  sx={{ width: "80px" }}
                                  label={
                                    !editingConstruction
                                      ? "From"
                                      : inputData[index] && inputData[index]!.source
                                  }
                                  variant="outlined"
                                  inputRef={fromRef}
                                />
                                <TextField
                                  placeholder="e.g 1,2,3,..."
                                  size="small"
                                  sx={{ width: "80px" }}
                                  label={
                                    !editingConstruction
                                      ? "To"
                                      : inputData[index] && inputData[index]!.target
                                  }
                                  variant="outlined"
                                  inputRef={toRef}
                                />
                                <TextField
                                  placeholder="e.g 1,2,3,..."
                                  size="small"
                                  sx={{ width: "80px" }}
                                  label={
                                    !editingConstruction
                                      ? "Weight"
                                      : inputData[index] && inputData[index]!.weight
                                  }
                                  variant="outlined"
                                  inputRef={weightRef}
                                />
                                {!editingConstruction && (
                                  <button
                                    disabled={isButtonDisabled}
                                    className={`${buttonClassname} w-auto h-[40px]`}
                                    onClick={(event) => handleAddValues(event)}
                                  >
                                    Add
                                  </button>
                                )}
                                {editingConstruction && (
                                  <button
                                    disabled={isButtonDisabled}
                                    className={`${buttonClassname} w-auto h-[40px]`}
                                    onClick={(event) => handleChangeValues(event, index)}
                                  >
                                    Change
                                  </button>
                                )}
                              </div>
                            </>
                          );
                        })}
                        <button
                          disabled={isButtonDisabled}
                          className={`${buttonClassname} w-auto h-[40px]`}
                          onClick={() => createGraphHandler()}
                        >
                          Create Graph
                        </button>
                      </div>

                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selected}
                              name={"directed"}
                              onChange={handleChangeSelect}
                            />
                          }
                          label={"Directed Graph"}
                        />
                      </div>
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
                          onClick={randomizeStructure}
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
                    </>
                  )}
                  {showActions && (
                    <div>
                      <TextField
                        sx={{ width: "150px" }}
                        name={"InitialNode"}
                        size="small"
                        type="text"
                        variant="outlined"
                        label={"Initial node"}
                        inputProps={{
                          min: 0,
                          max: 999,
                          style: { textAlign: "center" },
                        }}
                        onChange={handleInitialNodeInput}
                        value={initialNodeInput}
                      />
                      <button
                        disabled={isButtonDisabled}
                        className={`${buttonClassname} w-auto h-[40px]`}
                        onClick={async () => Animate("Search")}
                      >
                        Start Algorithm Animation
                      </button>
                    </div>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </ControlsToolTip>
        </ThemeProvider>
      </MediumCard>
    </>
  );
};

export default BellmanFordControlPanel;
