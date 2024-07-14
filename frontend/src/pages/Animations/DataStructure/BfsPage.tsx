import React, { FC, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { BfsAnimationController } from "../../../ClassObjects/BST/BfsAnimationController";
import BfsControlsPanel from "../../../components/Simulation/ControlsPanels/BfsControlsPanel";
import BfsPseudoCodeContainer from "../../../components/Simulation/PseudoCode/BfsPseudoCodeContainer";
import { useAppSelector } from "../../../store/hooks";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { setError } from "../../../store/reducers/alghoritms/bst-reducer";
import styles from "../../../components/Simulation/PseudoCode/PseudoCodeWrapper.module.css";
import controlStyles from "./BfsControlsPanel.module.css";

const BfsPage: FC = () => {
  const root = useAppSelector((state) => state.bst.currentRoot);
  const isPlaying = useAppSelector((state) => state.bst.isPlaying);
  const dispatch = useDispatch();

  const controller = BfsAnimationController.getController(root, dispatch);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);
  const [initialNode, setInitialNode] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  const [currentLine, setCurrentLine] = useState(0);
  const [distances, setDistances] = useState<{ [key: number]: number }>({});
  const [predecessors, setPredecessors] = useState<{ [key: number]: number | null }>({});
  const [colors, setColors] = useState<{ [key: number]: string }>({});
  const [queue, setQueue] = useState<number[]>([]);
  const [currentU, setCurrentU] = useState<number | null>(null);
  const [graphData, setGraphData] = useState<{
    nodes: number[];
    links: { source: number; target: number }[];
  }>({
    nodes: [],
    links: [],
  });
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
  const [highlightedLink, setHighlightedLink] = useState<{ source: number; target: number } | null>(
    null
  ); // новое состояние
  const [highlightedTargetNode, setHighlightedTargetNode] = useState<number | null>(null); // новое состояние

  const [isPaused, setIsPaused] = useState(false);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const distancesRef = useRef(distances);
  distancesRef.current = distances;

  const predecessorsRef = useRef(predecessors);
  predecessorsRef.current = predecessors;

  const colorsRef = useRef(colors);
  colorsRef.current = colors;

  const queueRef = useRef(queue);
  queueRef.current = queue;

  const handleShowActions = () => setShowActions(true);
  const handleHideActions = () => {
    setShowActions(false);
    setEditingConstruction(true);
    setShowPseudoCode(false);
  };

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fitsAnimation = viewportWidth >= 1500;

  const setCurrentError = (error: string) => {
    dispatch(setError(error));
    setTimeout(() => {
      dispatch(setError(""));
    }, 5000);
  };

  useEffect(() => {
    if (queue.length > 0 && currentLine === 8) {
      setTimeout(() => {
        setCurrentLine(9);
        continueBfsAnimation(queueRef.current);
      }, 1000 / speed);
    }
  }, [queue, currentLine, speed]);

  const bfsAnimation = async () => {
    if (initialNode === null) {
      setCurrentError("Please set the initial node.");
      return;
    }

    setIsPlayingAnimation(true);
    setIsPaused(false);
    setHasStarted(true);

    const initDistances: { [key: number]: number } = {};
    const initPredecessors: { [key: number]: number | null } = {};
    const initColors: { [key: number]: string } = {};

    setDistances(initDistances);
    setPredecessors(initPredecessors);
    setColors(initColors);

    setCurrentLine(0);
    await waitForNextStep();

    for (const v of graphData.nodes) {
      setHighlightedNode(v);
      setCurrentLine(1);
      await waitForNextStep();
      setDistances((prev) => ({ ...prev, [v]: Infinity }));
      setCurrentLine(2);
      await waitForNextStep();
      setPredecessors((prev) => ({ ...prev, [v]: null }));
      setCurrentLine(3);
      await waitForNextStep();
      setColors((prev) => ({ ...prev, [v]: "WHITE" }));
      setCurrentLine(4);
      await waitForNextStep();
    }

    setHighlightedNode(null);
    setCurrentLine(5);
    await waitForNextStep();
    let localQueue: number[] = [];
    setCurrentLine(6);
    setDistances((prev) => ({ ...prev, [initialNode]: 0 }));
    await waitForNextStep();
    setCurrentLine(7);
    setColors((prev) => ({ ...prev, [initialNode]: "GRAY" }));
    await waitForNextStep();
    setCurrentLine(8);

    localQueue.push(initialNode);
    setQueue([...localQueue]);
    await waitForNextStep();
    continueBfsAnimation(localQueue);
  };

  const continueBfsAnimation = async (localQueue: number[]) => {
    console.log("Queue before while:", localQueue);

    while (localQueue.length > 0) {
      setCurrentLine(9);
      await waitForNextStep();

      setCurrentLine(10);
      const u = localQueue.shift()!;
      setQueue([...localQueue]);
      setCurrentU(u ?? null);

      await waitForNextStep();
      console.log("U is ", u);

      if (u !== undefined) {
        await waitForNextStep();

        for (const v of graphData.links
          .filter((link) => link.source === u)
          .map((link) => link.target)) {
          setCurrentLine(11);
          await waitForNextStep();

          setHighlightedLink({ source: u, target: v });
          setHighlightedTargetNode(v);
          await waitForNextStep();

          if (colorsRef.current[u] !== "BLACK") {
            if (colorsRef.current[v] === "WHITE") {
              setCurrentLine(12);
              await waitForNextStep();
              setDistances((prev) => ({ ...prev, [v]: distancesRef.current[u] + 1 }));
              setCurrentLine(13);
              await waitForNextStep();
              setPredecessors((prev) => ({ ...prev, [v]: u }));
              setCurrentLine(14);
              await waitForNextStep();
              setColors((prev) => ({ ...prev, [v]: "GRAY" }));
              setCurrentLine(15);
              await waitForNextStep();
              setCurrentLine(16);
              localQueue.push(v);
              setQueue([...localQueue]);
              await waitForNextStep();
            }
          }
        }

        setColors((prev) => ({ ...prev, [u]: "BLACK" }));
        setCurrentLine(17);
        await waitForNextStep();
      }
    }

    setCurrentLine(18);
    await waitForNextStep();
    console.log(localQueue);
    setIsPlayingAnimation(false);
  };

  const waitForNextStep = async () => {
    while (isPausedRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 / speed));
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handlePlay = () => {
    setIsPaused(false);
  };

  return (
    <>
      <SideBar />
      {fitsAnimation && (
        <div>
          <BfsControlsPanel
            isButtonDisabled={isPlaying}
            showActions={showActions}
            handleShowActions={handleShowActions}
            handleHideActions={handleHideActions}
            editingConstruction={editingConstruction}
            setShowPseudoCode={setShowPseudoCode}
            setInitialNode={setInitialNode}
            startAnimation={bfsAnimation}
            setSpeed={setSpeed}
            graphData={graphData}
            setGraphData={setGraphData}
            highlightedNode={highlightedNode}
            highlightedLink={highlightedLink} // передача состояния
            highlightedTargetNode={highlightedTargetNode} // передача состояния
          />
          {hasStarted && (
            <div className={controlStyles.buttonContainer}>
              <button
                className={controlStyles.button}
                onClick={handlePause}
              >
                Pause
              </button>
              <button
                className={controlStyles.button}
                onClick={handlePlay}
              >
                Play
              </button>
            </div>
          )}
          {showPseudoCode && (
            <BfsPseudoCodeContainer
              visible={showPseudoCode}
              currentLine={currentLine}
            />
          )}
          {showPseudoCode && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Node</th>
                    {graphData.nodes.map((node) => (
                      <th key={node}>{node}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>d</td>
                    {graphData.nodes.map((node) => (
                      <td key={node}>{distances[node]}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>π</td>
                    {graphData.nodes.map((node) => (
                      <td key={node}>{predecessors[node] === null ? "NIL" : predecessors[node]}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>color</td>
                    {graphData.nodes.map((node) => (
                      <td key={node}>{colors[node]}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>u</td>
                    <td>{currentU !== null ? currentU : ""}</td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.queueWrapper}>
                <h3>Queue</h3>
                <ul>
                  {queue.map((node, index) => (
                    <li key={index}>{node}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BfsPage;
