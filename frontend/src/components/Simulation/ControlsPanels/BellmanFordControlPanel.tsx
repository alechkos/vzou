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
  setFrom,
  setTo,
  setWeight,
  deleteInputData,
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
  const from = useAppSelector((state) => state.bellmanFord.from);
  const to = useAppSelector((state) => state.bellmanFord.to);
  const weight = useAppSelector((state) => state.bellmanFord.weight);
  const startNode = useAppSelector((state) => state.bellmanFord.initialNode);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("1");
  const [initialNodeInput, setInitialNodeInput] = useState<string>("");
  const [numberOfRandomNodes, setNumberOfRandomNodes] = useState(0);
  const [selected, setSelected] = useState(directed);

  const fromChangeHandler = (e: any, index: number) => {
    dispatch(setFrom({ input: e.target.value, index }));
  };

  const toChangeHandler = (e: any, index: number) => {
    dispatch(setTo({ input: e.target.value, index }));
  };

  const weightChangeHandler = (e: any, index: number) => {
    dispatch(setWeight({ input: e.target.value, index }));
  };

  const handleAddValues = (event: any, index: number) => {
    if (!from[index]) {
      setCurrentError("Enter a value for a 'from' node please!");
      return;
    }
    if (!to[index]) {
      setCurrentError("Enter a value for a 'to' node please!");
      return;
    }
    if (!weight[index]) {
      setCurrentError("Enter a value for a weight of branch please!");
      return;
    }

    if (isNaN(Number(from[index]))) {
      setCurrentError("Enter a numeric value for a 'from' node please!");
      return;
    }
    if (isNaN(Number(to[index]))) {
      setCurrentError("Enter a numeric value for a 'to' node please!");
      return;
    }
    if (isNaN(Number(weight[index]))) {
      setCurrentError("Enter a numeric value for a weight of branch please!");
      return;
    }

    dispatch(setCountRows(1));
    const button = event.currentTarget;
    button.disabled = true;

    dispatch(
      setInputData({
        source: Number(from[index]),
        target: Number(to[index]),
        weight: Number(weight[index]),
      })
    );
  };

  const handleChangeValues = (event: any, index: number) => {
    const button = event.currentTarget;
    button.disabled = true;

    dispatch(
      changeInputData({
        source: Number(from[index]),
        target: Number(to[index]),
        weight: Number(weight[index]),
        index,
      })
    );
  };

  const handleDeleteValues = (event: any, index: number) => {
    dispatch(deleteInputData(index));
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

          await controller.bellmanFordAnimation(Number(initialNodeInput), graphData.links);
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
    dispatch(clearInputArray());
    controller.setGraphFromInput({ nodes: [], links: [] });

    let i = 1;
    let count = 0;
    let randomNumber;
    let inpData: {
      source: number;
      target: number;
      weight: number;
    }[] = [];
    for (i; i <= numberOfRandomNodes; i++) {
      let source = i;

      let target;
      if (i === numberOfRandomNodes) {
        target = 1;
      } else {
        target = i + 1;
      }

      randomNumber = Math.floor(Math.random() * 201) - 100;
      let weight = randomNumber;

      if (source !== target) {
        dispatch(setFrom({ input: source.toString(), index: count }));
        dispatch(setTo({ input: target.toString(), index: count }));
        dispatch(setWeight({ input: weight.toString(), index: count }));
        dispatch(setInputData({ source, target, weight }));
        dispatch(setCountRows(1));
        inpData.push({ source, target, weight });
        count++;
      }
    }
    createGraphHandler(inpData);
  };

  const createGraphHandler = (inpData?: { source: number; target: number; weight: number }[]) => {
    const nodes = new Set<number>();
    const links: { source: number; target: number; weight?: number }[] = [];

    if (inpData) {
      inpData.forEach((data) => {
        nodes.add(data.source);
        nodes.add(data.target);
        if (data.source !== data.target) {
          links.push({ source: data.source, target: data.target, weight: data.weight });
          if (!selected) {
            links.push({ source: data.target, target: data.source, weight: data.weight });
          }
        }
      });
    } else {
      if (inputData.length < 1) {
        setCurrentError("Please enter at least one node!");
        return;
      }
      inputData.forEach((data) => {
        nodes.add(data.source);
        nodes.add(data.target);
        links.push({ source: data.source, target: data.target, weight: data.weight });
        if (!selected) {
          links.push({ source: data.target, target: data.source, weight: data.weight });
        }
      });
    }

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
                  className={value === "1" ? "justify-around flex" : "hidden"}
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
                                  value={from[index] ? from[index] : ""}
                                  onChange={(event) => fromChangeHandler(event, index)}
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
                                  value={to[index] ? to[index] : ""}
                                  onChange={(event) => toChangeHandler(event, index)}
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
                                  value={weight[index] ? weight[index] : ""}
                                  onChange={(event) => weightChangeHandler(event, index)}
                                />
                                {!editingConstruction && (
                                  <button
                                    disabled={isButtonDisabled}
                                    className={`${buttonClassname} w-auto h-[40px]`}
                                    onClick={(event) => handleAddValues(event, index)}
                                  >
                                    Add
                                  </button>
                                )}
                                {editingConstruction && inputData[index] && (
                                  <>
                                    <button
                                      disabled={isButtonDisabled}
                                      className={`${buttonClassname} w-auto h-[40px]`}
                                      onClick={(event) => handleChangeValues(event, index)}
                                    >
                                      Change
                                    </button>
                                    <button
                                      disabled={isButtonDisabled}
                                      className={`${buttonClassname} w-auto h-[40px]`}
                                      onClick={(event) => handleDeleteValues(event, index)}
                                    >
                                      Delete
                                    </button>
                                  </>
                                )}
                                {editingConstruction && !inputData[index] && (
                                  <button
                                    disabled={isButtonDisabled}
                                    className={`${buttonClassname} w-auto h-[40px]`}
                                    onClick={(event) => handleAddValues(event, index)}
                                  >
                                    Add
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
