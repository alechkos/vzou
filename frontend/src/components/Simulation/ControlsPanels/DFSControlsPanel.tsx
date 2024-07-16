import React, { FC, useEffect, useState } from "react";
import { TextField, ThemeProvider, Tab, Box, Slider, Button } from "@mui/material";
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
  setInitialValue,
  setError,
  setInputArray,
  setGraphData,
  setPlaying,
} from "../../../store/reducers/alghoritms/dfs-reducer";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";

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
  const initialValue = useAppSelector((state) => state.dfs.initialValue);
  const isButtonDisabled = useAppSelector((state) => state.dfs.isPlaying);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("1");
  const [initialNodeInput, setInitialNodeInput] = useState<string>("");

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
          await controller.dfsAnimation(Number(initialValue));
          return;
        case "Clear":
          // controller.setTreeFromInput([]);
          return;
        default:
          return;
      }
    } catch (e: any) {
      setCurrentError(e.message);
    }
  };

  const createGraphHandler = async () => {
    const input = inputArray.split(",");
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

  const handleInitialNodeChange = (e: any) => {
    setInitialNodeInput(e.target.value);
    const node = parseInt(e.target.value, 10);

    // if (!graphData1.nodes.includes(node) && e.target.value !== "") {
    //   setCurrentError("The value doesn't exist in the graph!");
    //   dispatch(setPlaying(true));
    //   return;
    // }
    // if (isNaN(node) && e.target.value !== "") {
    //   setCurrentError("Input a numeric value please!");
    //   dispatch(setPlaying(true));
    //   return;
    // }
    dispatch(setInitialValue(e.target.value));
    // dispatch(setPlaying(false));
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
                  className={value === "1" ? "justify-start " : "hidden"}
                >
                  {!showActions && (
                    <>
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
                        onClick={createGraphHandler}
                      >
                        Create Graph
                      </button>
                    </>
                  )}
                  {showActions && (
                    <>
                      <TextField
                        placeholder="Initial node"
                        size="small"
                        sx={{ width: "150px", marginLeft: 2 }}
                        value={initialNodeInput}
                        label="Initial Node"
                        variant="outlined"
                        onChange={handleInitialNodeChange}
                      />
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
