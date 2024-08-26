import React, { FC, useState, useEffect } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SpeedIcon from "@mui/icons-material/Speed";
import { Typography } from "@mui/material";

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
  highlightedNode: number | null;
  highlightedLink: { source: number; target: number } | null;
  highlightedTargetNode: number | null;
  colors: { [key: number]: string };
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
  highlightedNode,
  highlightedLink,
  highlightedTargetNode,
  colors,
}) => {
  const inputArray = useAppSelector((state) => state.bst.inputArray);
  const error = useAppSelector((state) => state.bst.error);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("1");
  const [initialNodeInput, setInitialNodeInput] = useState<string>("");
  const [showInitialNodeInput, setShowInitialNodeInput] = useState<boolean>(false);
  const [showGraphInputFields, setShowGraphInputFields] = useState<boolean>(true);
  const [edges, setEdges] = useState<{ source: number; target: number; editable?: boolean }[]>([]);
  const [source, setSource] = useState<string>("");
  const [target, setTarget] = useState<string>("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const setCurrentError = (error: string) => {
    dispatch(setError(error));
    setTimeout(() => {
      dispatch(setError(""));
    }, 5000);
  };

  const addEdgeHandler = () => {
    const sourceNode = parseInt(source, 10);
    const targetNode = parseInt(target, 10);

    if (isNaN(sourceNode) || isNaN(targetNode)) {
      setCurrentError("Invalid input. Please enter valid integers.");
      return;
    }

    setEdges([...edges, { source: sourceNode, target: targetNode, editable: false }]);
    setSource("");
    setTarget("");
  };

  const handleEdit = (index: number) => {
    setEdges(edges.map((edge, i) => (i === index ? { ...edge, editable: !edge.editable } : edge)));
  };

  const handleDelete = (index: number) => {
    setEdges(edges.filter((_, i) => i !== index));
  };

  const handleEdgeChange = (index: number, field: "source" | "target", value: string) => {
    const updatedEdges = edges.map((edge, i) =>
      i === index ? { ...edge, [field]: parseInt(value, 10) || 0 } : edge
    );
    setEdges(updatedEdges);
  };

  const createGraphHandler = () => {
    const nodes = new Set<number>();
    edges.forEach((edge) => {
      nodes.add(edge.source);
      nodes.add(edge.target);
    });

    setGraphData({ nodes: Array.from(nodes), links: edges });
    setShowPseudoCode(true);
    setShowInitialNodeInput(true);
    setShowGraphInputFields(false); 
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

  const handleChangeGraph = () => {
    setShowGraphInputFields(true); 
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
                  {showGraphInputFields && (
                    <>
                      {edges.length > 0 && (
                        <Box
                          sx={{
                            maxHeight: "100px",
                            overflowY: "auto",
                            marginBottom: 2,
                            border: "1px solid #ccc",
                            padding: 2,
                          }}
                        >
                          {edges.map((edge, index) => (
                            <Box
                              key={index}
                              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
                            >
                              <TextField
                                label="From"
                                value={edge.source}
                                disabled={!edge.editable}
                                onChange={(e) => handleEdgeChange(index, "source", e.target.value)}
                                sx={{ width: "100px", marginRight: 2 }}
                                InputProps={{ sx: { height: "40px" } }}
                              />
                              <TextField
                                label="To"
                                value={edge.target}
                                disabled={!edge.editable}
                                onChange={(e) => handleEdgeChange(index, "target", e.target.value)}
                                sx={{ width: "100px", marginRight: 2 }}
                                InputProps={{ sx: { height: "40px" } }}
                              />
                              <IconButton
                                onClick={() => handleEdit(index)}
                                sx={{ marginRight: 1 }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDelete(index)}
                                sx={{ marginRight: 1 }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      )}

                      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                        <TextField
                          placeholder="From"
                          size="small"
                          sx={{ width: "100px" }}
                          value={source}
                          label="From"
                          variant="outlined"
                          onChange={(e) => setSource(e.target.value)}
                        />
                        <TextField
                          placeholder="To"
                          size="small"
                          sx={{ width: "100px", marginLeft: 2 }}
                          value={target}
                          label="To"
                          variant="outlined"
                          onChange={(e) => setTarget(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginLeft: 2 }}
                          onClick={addEdgeHandler}
                        >
                          Add
                        </Button>
                      </Box>

                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginLeft: 2 }}
                        onClick={createGraphHandler}
                      >
                        Create Graph
                      </Button>
                    </>
                  )}

                  {!showGraphInputFields && (
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
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginLeft: 2 }}
                        onClick={startAnimation}
                        disabled={isButtonDisabled}
                      >
                        Start Algorithm Animation
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ marginLeft: 2 }}
                        onClick={handleChangeGraph}
                      >
                        Change Graph
                      </Button>
                      <Box sx={{ width: 200, marginTop: 2 }}>
                        <SpeedIcon
                          color="primary"
                          fontSize="large"
                        />
                        <Typography
                          variant="body1" 
                          sx={{ marginLeft: 1 }} 
                        >
                          Speed
                        </Typography>
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
                    </>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </ControlsToolTip>
        </ThemeProvider>
      </MediumCard>
      {graphData.nodes.length > 0 && (
        <GraphVisualizer
          data={graphData}
          highlightedNode={highlightedNode}
          highlightedLink={highlightedLink}
          highlightedTargetNode={highlightedTargetNode}
          colors={colors}
        />
      )}
    </>
  );
};

export default BfsControlsPanel;
