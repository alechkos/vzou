import React, { FC, useEffect, useState } from "react";
import { TextField, ThemeProvider, Tab, Box, Slider, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setError,
  setInputArray,
  clearInputArray,
} from "../../../store/reducers/alghoritms/bst-reducer";
import { AlertError } from "../../UI/Controls/AlertError";
import { theme } from "../../UI/Controls/ControlsTheme";
import { ControlsToolTip } from "../../UI/Controls/ControlsToolTip";
import MediumCard from "../../UI/MediumCard";
import GraphVisualizer from "./GraphVisualizer";

interface Props {
  isButtonDisabled: boolean;
  showActions: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
  editingConstruction: boolean;
  setShowPseudoCode: (show: boolean) => void;
  setInitialNode: (node: number | null) => void;
  startAnimation: () => void;
  setSpeed: (speed: number) => void;
  graphData: { nodes: number[]; links: { source: number; target: number }[] };
  setGraphData: (data: { nodes: number[]; links: { source: number; target: number }[] }) => void;
}

const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";

const BfsControlsPanel: FC<Props> = ({
  isButtonDisabled,
  handleHideActions,
  handleShowActions,
  showActions,
  editingConstruction,
  setShowPseudoCode,
  setInitialNode,
  startAnimation,
  setSpeed,
  graphData,
  setGraphData,
}) => {
  const inputArray = useAppSelector((state) => state.bst.inputArray);
  const error = useAppSelector((state) => state.bst.error);
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
    setGraphData({ nodes: Array.from(nodes), links });
    setShowPseudoCode(true);
  };

  const handleInput = (e: any) => {
    dispatch(setInputArray(e.target.value));
  };

  const handleInitialNodeChange = (e: any) => {
    setInitialNodeInput(e.target.value);
    const node = parseInt(e.target.value, 10);
    if (!isNaN(node)) {
      setInitialNode(node);
    }
  };

  useEffect(() => {
    dispatch(clearInputArray());
  }, [dispatch]);

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
                    <Tab
                      label="Create Graph"
                      value="1"
                    />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  className={value === "1" ? "justify-start " : "hidden"}
                >
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
                    className={`${buttonClassname} w-[40px] h-[40px]`}
                    onClick={createGraphHandler}
                  >
                    Go
                  </button>
                  <TextField
                    placeholder="Initial node"
                    size="small"
                    sx={{ width: "150px", marginLeft: 2 }}
                    value={initialNodeInput}
                    label="Initial Node"
                    variant="outlined"
                    onChange={handleInitialNodeChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 2 }}
                    onClick={startAnimation}
                    disabled={isButtonDisabled}
                  >
                    Start Algorithm Animation
                  </Button>
                  <Box sx={{ width: 200, marginTop: 2 }}>
                    <Slider
                      defaultValue={1}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={0.1}
                      marks
                      min={0.1}
                      max={5}
                      onChange={(e, value) => setSpeed(value as number)}
                    />
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </ControlsToolTip>
        </ThemeProvider>
      </MediumCard>
      {graphData.nodes.length > 0 && <GraphVisualizer data={graphData} />}
    </>
  );
};

export default BfsControlsPanel;
