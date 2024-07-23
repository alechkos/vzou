import React, { FC, useEffect, useState } from "react";
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
import { DFSAnimationController } from "../../../ClassObjects/DFS/DFSAnimationController";
import {
  setError,
  setInputArray,
  setGraphData,
  clearInputArray,
  setDirected,
} from "../../../store/reducers/alghoritms/dfs-reducer";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";
import CasinoIcon from "@mui/icons-material/Casino";

interface Props {
  controller: DFSAnimationController;
  showActions: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
  editingConstruction: boolean;
  setShowPseudoCode: (show: boolean) => void;
}

const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";

const DFSControlsPanel: FC<Props> = ({
  handleHideActions,
  handleShowActions,
  showActions,
  editingConstruction,
  setShowPseudoCode,
  controller,
}) => {
  const [regsterActivity] = useRegisterActivityMutation();
  const inputArray = useAppSelector((state) => state.dfs.inputArray);
  const error = useAppSelector((state) => state.dfs.error);
  const graphData = useAppSelector((state) => state.dfs.graphData);
  const isButtonDisabled = useAppSelector((state) => state.dfs.isPlaying);
  const directed = useAppSelector((state) => state.dfs.directed);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("1");
  const [initialNodeInput, setInitialNodeInput] = useState<string>("");
  const [numberOfRandomNodes, setNumberOfRandomNodes] = useState(0);
  const [selected, setSelected] = useState(directed);

  const handleChangeSelect = (event: any) => {
    setSelected((prev) => !prev);
    dispatch(setDirected(selected));
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
            subject: "BFS",
            algorithm: "Search",
          });
          await controller.dfsAnimation();
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
    createGraphHandler(randomString);
  };

  const createGraphHandler = (randomInp?: string) => {
    let userInput;
    if (randomInp) {
      userInput = randomInp.split(",");
    } else {
      userInput = inputArray.split(",");
    }
    const oneCharInput = userInput.filter((inp) => !inp.includes("-"));
    const input = userInput.filter((inp) => inp.includes("-"));
    const nodes = new Set<number>();
    const links: { source: number; target: number }[] = [];

    for (const pair of input) {
      const [source, target] = pair.split("-").map(Number);
      if (isNaN(source) || isNaN(target)) {
        setCurrentError("Invalid input. Please enter data with format 1-2,3-4");
        return;
      }
      nodes.add(source);
      nodes.add(target);
      links.push({ source, target });
      if (selected) {
        links.push({ target, source });
      }
    }

    oneCharInput.forEach((inp) => {
      if (isNaN(Number(inp))) {
        setCurrentError("Please enter a numeric data format for node!");
        return;
      }
      nodes.add(Number(inp));
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

  // useEffect(() => {
  //   dispatch(clearInputArray());
  // }, [dispatch]);

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
                  className={value === "1" ? "justify-around flex" : "hidden"}
                >
                  {!showActions && (
                    <>
                      <div>
                        <TextField
                          placeholder="e.g 1-2,3-4,..."
                          size="small"
                          sx={{ width: "150px" }}
                          value={inputArray}
                          label="Graph Data"
                          variant="outlined"
                          onChange={handleInput}
                        />
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
                    <>
                      <button
                        disabled={isButtonDisabled}
                        className={`${buttonClassname} w-auto h-[40px]`}
                        onClick={async () => Animate("Search")}
                      >
                        Start Algorithm Animation
                      </button>
                    </>
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

export default DFSControlsPanel;
