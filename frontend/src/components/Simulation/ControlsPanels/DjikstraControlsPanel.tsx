import React, { FC, useState } from "react";
import {Slider, TextField, ThemeProvider, Box, Button, IconButton, Tab} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setError } from "../../../store/reducers/alghoritms/bst-reducer";
import { AlertError } from "../../UI/Controls/AlertError";
import { theme } from "../../UI/Controls/ControlsTheme";
import { ControlsToolTip } from "../../UI/Controls/ControlsToolTip";
import MediumCard from "../../UI/MediumCard";
import DjikstraGraphVisualizer from "./DjikstraGraphVisualizer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SpeedIcon from "@mui/icons-material/Speed";
import { Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

interface DjikstraControlsPanelProps {
  isButtonDisabled: boolean;
  startAnimation: () => void;
  setSpeed: (speed: number) => void;
  setInitialNode: (node: number) => void;
  setShowPseudoCode: (show: boolean) => void;
  graphData: { nodes: number[]; links: { source: number; target: number; weight: number }[] };
  setGraphData: (data: {
    nodes: number[];
    links: { source: number; target: number; weight: number }[];
  }) => void;
  highlightedNode: number | null;
  highlightedLink: { source: number; target: number } | null;
  highlightedTargetNode: number | null;
  colors: { [key: number]: string };
  showActions: boolean;
  handleShowActions: () => void;
  handleHideActions: () => void;
  editingConstruction: boolean;
  currentV: number | null;
  isHighlightingNode: boolean;
  currentLine: number;
  currentSRef: React.RefObject<number | null>;
  currentURef: React.RefObject<number | null>;
}

const DjikstraControlsPanel: React.FC<DjikstraControlsPanelProps> = ({
  isButtonDisabled,
  startAnimation,
  setSpeed,
  setInitialNode,
  setShowPseudoCode,
  graphData,
  setGraphData,
  highlightedNode,
  highlightedLink,
  highlightedTargetNode,
  colors,
  showActions,
  handleShowActions,
  handleHideActions,
  editingConstruction,
  currentV,
  isHighlightingNode,
  currentLine,
  currentSRef,
  currentURef,
}) => {
  const error = useAppSelector((state) => state.bst.error);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("1");
  const [initialNodeInput, setInitialNodeInput] = useState<string>("");
  const [showInitialNodeInput, setShowInitialNodeInput] = useState<boolean>(false);
  const [edges, setEdges] = useState<
    { source: number; target: number; weight: number; editable?: boolean }[]
  >([]);
  const [source, setSource] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [graphCreated, setGraphCreated] = useState<boolean>(false);

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
    const edgeWeight = parseInt(weight, 10);

    if (isNaN(sourceNode) || isNaN(targetNode) || isNaN(edgeWeight)) {
      setCurrentError("Invalid input. Please enter valid integers.");
      return;
    }

    setEdges([
      ...edges,
      { source: sourceNode, target: targetNode, weight: edgeWeight, editable: false },
    ]);
    setSource("");
    setTarget("");
    setWeight("");
  };

  const handleEdit = (index: number) => {
    setEdges(edges.map((edge, i) => (i === index ? { ...edge, editable: !edge.editable } : edge)));
  };

  const handleDelete = (index: number) => {
    setEdges(edges.filter((_, i) => i !== index));
  };

  const handleEdgeChange = (
    index: number,
    field: "source" | "target" | "weight",
    value: string
  ) => {
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
    setGraphCreated(true);
  };

  const handleInitialNodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialNodeInput(e.target.value);
    const node = parseInt(e.target.value, 10);
    if (!isNaN(node)) {
      setInitialNode(node);
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
              {!graphCreated && (
                <>
                  {/*container with fix height and scrolling */}
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
                  </TabContext>
                  <Box
                    sx={{
                      maxHeight: "100px",
                      overflowY: "auto", // scrolling
                      marginBottom: 2,
                      padding: 1,
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
                          sx={{ width: "100px", marginRight: 2, height: "40px" }} // height of TextField
                          InputProps={{ style: { height: "40px" } }} // text height into TextField
                        />
                        <TextField
                          label="To"
                          value={edge.target}
                          disabled={!edge.editable}
                          onChange={(e) => handleEdgeChange(index, "target", e.target.value)}
                          sx={{ width: "100px", marginRight: 2, height: "40px" }} // height TextField
                          InputProps={{ style: { height: "40px" } }} // text height into TextField
                        />
                        <TextField
                          label="Weight"
                          value={edge.weight}
                          disabled={!edge.editable}
                          onChange={(e) => handleEdgeChange(index, "weight", e.target.value)}
                          sx={{ width: "100px", marginRight: 2, height: "40px" }}
                          InputProps={{ style: { height: "40px" } }}
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

                  {/* input fields */}
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                    <TextField
                      placeholder="From"
                      size="small"
                      sx={{ width: "100px", height: "40px" }}
                      InputProps={{ style: { height: "40px" } }}
                      value={source}
                      label="From"
                      variant="outlined"
                      onChange={(e) => setSource(e.target.value)}
                    />
                    <TextField
                      placeholder="To"
                      size="small"
                      sx={{ width: "100px", marginLeft: 2, height: "40px" }}
                      InputProps={{ style: { height: "40px" } }}
                      value={target}
                      label="To"
                      variant="outlined"
                      onChange={(e) => setTarget(e.target.value)}
                    />
                    <TextField
                      placeholder="Weight"
                      size="small"
                      sx={{ width: "100px", marginLeft: 2, height: "40px" }}
                      InputProps={{ style: { height: "40px" } }}
                      value={weight}
                      label="Weight"
                      variant="outlined"
                      onChange={(e) => setWeight(e.target.value)}
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

                  {/* button create graph */}
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
              {showInitialNodeInput && (
                <>
                  <TextField
                    placeholder="Initial node"
                    size="small"
                    sx={{ width: "150px", marginLeft: 2, height: "40px" }}
                    InputProps={{ style: { height: "40px" } }}
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
                      onChange={(e: Event, value: number | number[]) => setSpeed(value as number)}
                    />
                  </Box>
                </>
              )}
            </Box>
          </ControlsToolTip>
        </ThemeProvider>
      </MediumCard>
      {graphData.nodes.length > 0 && (
        <DjikstraGraphVisualizer
          data={graphData}
          highlightedNode={highlightedNode}
          highlightedLink={highlightedLink}
          highlightedTargetNode={highlightedTargetNode}
          colors={colors}
          currentV={currentV}
          isHighlightingNode={isHighlightingNode}
          currentLine={currentLine}
          currentSRef={currentSRef}
          currentURef={currentURef}
        />
      )}
    </>
  );
};

export default DjikstraControlsPanel;
