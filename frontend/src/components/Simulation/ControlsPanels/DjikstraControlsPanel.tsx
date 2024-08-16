import React, { FC, useState } from "react";
import { Slider, TextField, ThemeProvider, Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setError, clearInputArray } from "../../../store/reducers/alghoritms/bst-reducer";
import { AlertError } from "../../UI/Controls/AlertError";
import { theme } from "../../UI/Controls/ControlsTheme";
import { ControlsToolTip } from "../../UI/Controls/ControlsToolTip";
import MediumCard from "../../UI/MediumCard";
import DjikstraGraphVisualizer from "./DjikstraGraphVisualizer";

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
}) => {
  const error = useAppSelector((state) => state.bst.error);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("1");
  const [initialNodeInput, setInitialNodeInput] = useState<string>("");
  const [showInitialNodeInput, setShowInitialNodeInput] = useState<boolean>(false);
  const [edges, setEdges] = useState<{ source: number; target: number; weight: number }[]>([]);
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

    setEdges([...edges, { source: sourceNode, target: targetNode, weight: edgeWeight }]);
    setSource("");
    setTarget("");
    setWeight("");
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
                  <TextField
                    placeholder="From"
                    size="small"
                    sx={{ width: "150px" }}
                    value={source}
                    label="From"
                    variant="outlined"
                    onChange={(e) => setSource(e.target.value)}
                  />
                  <TextField
                    placeholder="To"
                    size="small"
                    sx={{ width: "150px", marginLeft: 2 }}
                    value={target}
                    label="To"
                    variant="outlined"
                    onChange={(e) => setTarget(e.target.value)}
                  />
                  <TextField
                    placeholder="Weight"
                    size="small"
                    sx={{ width: "150px", marginLeft: 2 }}
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
        />
      )}
    </>
  );
};

export default DjikstraControlsPanel;
