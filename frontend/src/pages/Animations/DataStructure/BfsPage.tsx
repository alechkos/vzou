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
  );
  const [highlightedTargetNode, setHighlightedTargetNode] = useState<number | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const historyRef = useRef<any[]>([]); // Состояние истории
  const abortControllerRef = useRef<AbortController | null>(null); // Контроллер для остановки

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

  const saveState = (cl: any, d: any, p: any, c: any, q: number[], u: any) => {
    console.log("I save my last to ", cl);
    const currentState = {
      cl,
      distances: { ...d },
      predecessors: { ...p },
      colors: { ...c },
      queue: [...q],
      u,
      highlightedNode,
      highlightedLink,
      highlightedTargetNode,
    };
    console.log("My last current state is ", currentState);
    historyRef.current.push(currentState);
    console.log("My last history is ", historyRef);
  };

  const restoreState = (index: number) => {
    const state = historyRef.current[index];
    if (state) {
      setCurrentLine(state.cl);
      setDistances(state.distances);
      setPredecessors(state.predecessors);
      setColors(state.colors);
      setQueue(state.queue);
      setCurrentU(state.u);
      setHighlightedNode(state.highlightedNode);
      setHighlightedLink(state.highlightedLink);
      setHighlightedTargetNode(state.highlightedTargetNode);
    }
  };

  const handleBack = () => {
    if (historyRef.current.length > 1) {
      historyRef.current.pop();
      restoreState(historyRef.current.length - 1);
      setIsPaused(true);
    }
  };

  const resetAnimation = () => {
    setIsPlayingAnimation(false);
    setHasStarted(false);
    setIsPaused(false);
    setCurrentLine(0);
    setDistances({});
    setPredecessors({});
    setColors({});
    setQueue([]);
    setCurrentU(null);
    setHighlightedNode(null);
    setHighlightedLink(null);
    setHighlightedTargetNode(null);
    historyRef.current = [];
  };

  const bfsAnimation = async (signal: AbortSignal) => {
    let cl = 0;
    let d = {};
    let p = {};
    let c = {};
    let q: number[] = [];
    let u = null;
    let localQueue: number[] = [];

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
    saveState(cl, d, p, c, q, u);

    await waitForNextStep(signal);

    for (const v of graphData.nodes) {
      if (signal.aborted) return resetAnimation();
      setHighlightedNode(v);
      setCurrentLine(1);

      saveState(cl + 1, d, p, c, q, u);

      await waitForNextStep(signal);
      setDistances((prev) => ({ ...prev, [v]: Infinity }));
      d = { ...d, [v]: Infinity };

      setCurrentLine(2);

      saveState(cl + 2, d, p, c, q, u);

      await waitForNextStep(signal);
      setPredecessors((prev) => ({ ...prev, [v]: null }));
      p = { ...p, [v]: null };

      setCurrentLine(3);
      saveState(cl + 3, d, p, c, q, u);
      await waitForNextStep(signal);
      setColors((prev) => ({ ...prev, [v]: "WHITE" }));
      c = { ...c, [v]: "WHITE" };
      setCurrentLine(4);
      saveState(cl + 4, d, p, c, q, u);
      await waitForNextStep(signal);
    }

    setHighlightedNode(null);
    setCurrentLine(5);
    saveState(cl + 5, d, p, c, q, u);
    await waitForNextStep(signal);

    setCurrentLine(6);
    setDistances((prev) => ({ ...prev, [initialNode]: 0 }));
    d = { ...d, [initialNode]: 0 };
    saveState(cl + 6, d, p, c, q, u);
    await waitForNextStep(signal);
    setCurrentLine(7);
    setColors((prev) => ({ ...prev, [initialNode]: "GRAY" }));
    c = { ...c, [initialNode]: "GRAY" };
    saveState(cl + 7, d, p, c, q, u);
    await waitForNextStep(signal);

    setCurrentLine(8);

    localQueue.push(initialNode);
    setQueue([...localQueue]);
    q = [...localQueue];

    saveState(cl + 8, d, p, c, q, u);
    await waitForNextStep(signal);
    continueBfsAnimation(localQueue, signal, d, p, c, q);
  };

  const continueBfsAnimation = async (
    localQueue: number[],
    signal: AbortSignal,
    di: any,
    pr: any,
    co: any,
    qu: any
  ) => {
    let cl = 9;
    let d = { ...di };
    let p = { ...pr };
    let c = { ...co };
    let q = [...qu];
    let localU = null;

    while (localQueue.length > 0) {
      if (signal.aborted) return resetAnimation();
      setCurrentLine(9);
      saveState(cl, d, p, c, q, localU);

      await waitForNextStep(signal);

      setCurrentLine(10);

      const u = localQueue.shift()!;
      localU = u;
      q = [...localQueue];
      setQueue([...localQueue]);
      setCurrentU(u ?? null);
      saveState(cl + 1, d, p, c, q, localU);
      await waitForNextStep(signal);

      if (u !== undefined) {
        await waitForNextStep(signal);

        for (const v of graphData.links
          .filter((link) => link.source === u)
          .map((link) => link.target)) {
          if (signal.aborted) return resetAnimation();
          setCurrentLine(11);

          saveState(cl + 2, d, p, c, q, localU);
          await waitForNextStep(signal);

          setHighlightedLink({ source: u, target: v });
          setHighlightedTargetNode(v);

          await waitForNextStep(signal);

          if (c[u] !== "BLACK") {
            if (c[v] === "WHITE") {
              setCurrentLine(12);

              saveState(cl + 3, d, p, c, q, localU);
              await waitForNextStep(signal);
              d = { ...d, [v]: d[u] + 1 };
              setDistances((prev) => ({ ...prev, [v]: d[u] + 1 }));
              setCurrentLine(13);
              saveState(cl + 4, d, p, c, q, localU);
              await waitForNextStep(signal);
              p = { ...p, [v]: u };
              setPredecessors((prev) => ({ ...prev, [v]: u }));
              setCurrentLine(14);
              saveState(cl + 5, d, p, c, q, localU);
              await waitForNextStep(signal);
              c = { ...c, [v]: "GRAY" };
              setColors((prev) => ({ ...prev, [v]: "GRAY" }));
              setCurrentLine(15);

              saveState(cl + 6, d, p, c, q, localU);
              await waitForNextStep(signal);
              setCurrentLine(16);

              localQueue.push(v);
              q = [...localQueue];
              setQueue([...localQueue]);
              saveState(cl + 7, d, p, c, q, localU);
              await waitForNextStep(signal);
            }
          }
        }
        c = { ...c, [u]: "BLACK" };
        setColors((prev) => ({ ...prev, [u]: "BLACK" }));
        setCurrentLine(17);
        saveState(cl + 8, d, p, c, q, localU);
        await waitForNextStep(signal);
      }
    }

    setCurrentLine(18);
    saveState(cl + 7, d, p, c, q, localU);
    await waitForNextStep(signal);
    setIsPlayingAnimation(false);
  };

  const waitForNextStep = async (signal: AbortSignal) => {
    const delay = 1000 / speed;
    const checkInterval = Math.min(100, delay); // Проверка каждые 100ms или меньше
    const steps = Math.ceil(delay / checkInterval);

    for (let i = 0; i < steps; i++) {
      if (signal.aborted) return;
      if (isPausedRef.current) {
        while (isPausedRef.current && !signal.aborted) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
      await new Promise((resolve) => setTimeout(resolve, checkInterval));
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handlePlay = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const startBfsAnimation = () => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    bfsAnimation(controller.signal);
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
            startAnimation={startBfsAnimation}
            setSpeed={setSpeed}
            graphData={graphData}
            setGraphData={setGraphData}
            highlightedNode={highlightedNode}
            highlightedLink={highlightedLink}
            highlightedTargetNode={highlightedTargetNode}
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
              <button
                className={controlStyles.button}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className={controlStyles.button}
                onClick={handleStop}
              >
                Stop
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
