import React, { FC, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import DjikstraControlsPanel from "../../../components/Simulation/ControlsPanels/DjikstraControlsPanel";
import DjikstraPseudoCodeContainer from "../../../components/Simulation/PseudoCode/DjikstraPseudoCodeContainer";
import { useAppSelector } from "../../../store/hooks";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { setError } from "../../../store/reducers/alghoritms/bst-reducer";
import styles from "../../../components/Simulation/PseudoCode/PseudoCodeWrapper.module.css";
import controlStyles from "./DjikstraControlsPanel.module.css";
import DjikstraTable from "../../../components/Simulation/ControlsPanels/DjikstraTable";

const DjikstraPage: FC = () => {
  const root = useAppSelector((state) => state.bst.currentRoot);
  const isPlaying = useAppSelector((state) => state.bst.isPlaying);
  const dispatch = useDispatch();

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);
  const [initialNode, setInitialNode] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  const [currentLine, setCurrentLine] = useState(0);
  const [distances, setDistances] = useState<{ [key: number]: number }>({});
  const [predecessors, setPredecessors] = useState<{ [key: number]: number | null }>({});
  const [queue, setQueue] = useState<number[]>([]);
  const [s, setS] = useState<number[]>([]);
  const [currentU, setCurrentU] = useState<number | null>(null);
  const [graphData, setGraphData] = useState<{
    nodes: number[];
    links: { source: number; target: number; weight: number }[];
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

  const historyRef = useRef<any[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

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

  const saveState = (
    cl: any,
    d: { [key: number]: number },
    p: { [key: number]: number | null },
    q: number[],
    s: number[],
    u: any
  ) => {
    const currentState = {
      cl,
      distances: { ...d },
      predecessors: { ...p },
      queue: [...q],
      s: [...s],
      u,
      highlightedNode,
      highlightedLink,
      highlightedTargetNode,
    };
    historyRef.current.push(currentState);
  };

  const restoreState = (index: number) => {
    const state = historyRef.current[index];
    if (state) {
      setCurrentLine(state.cl);
      setDistances(state.distances);
      setPredecessors(state.predecessors);
      setQueue(state.queue);
      setS(state.s);
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
    setQueue([]);
    setS([]);
    setCurrentU(null);
    setHighlightedNode(null);
    setHighlightedLink(null);
    setHighlightedTargetNode(null);
    historyRef.current = [];
  };

  const waitForNextStep = async (signal: AbortSignal) => {
    const delay = 1000 / speed;
    const checkInterval = Math.min(100, delay);
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

  const djikstraAnimation = async (signal: AbortSignal) => {
    if (initialNode === null) {
      setCurrentError("Please set the initial node.");
      return;
    }

    let cl = 0;
    let d: { [key: number]: number } = {};
    let p: { [key: number]: number | null } = {};
    let q: number[] = [];
    let s: number[] = [];
    let u = null;

    setIsPlayingAnimation(true);
    setIsPaused(false);
    setHasStarted(true);

    const initDistances: { [key: number]: number } = {};
    const initPredecessors: { [key: number]: number | null } = {};

    setDistances(initDistances);
    setPredecessors(initPredecessors);

    setCurrentLine(cl);
    saveState(cl, d, p, q, s, u);

    await waitForNextStep(signal);
    //----------------------end 0 line--------------------------------------

    cl++;
    setCurrentLine(cl);
    saveState(cl, d, p, q, s, u);
    await waitForNextStep(signal);
    //---------------------end 1-st line-------------------------------------

    for (const v of graphData.nodes) {
      if (signal.aborted) return resetAnimation();

      cl++;
      setCurrentLine(cl);
      setDistances((prev) => ({ ...prev, [v]: Infinity }));
      d[v] = Infinity;
      await waitForNextStep(signal);
      saveState(cl, d, p, q, s, u);

      cl++;
      setCurrentLine(cl);
      setPredecessors((prev) => ({ ...prev, [v]: null }));
      p[v] = null;
      await waitForNextStep(signal);
      saveState(cl, d, p, q, s, u);
    }

    setDistances((prev) => ({ ...prev, [initialNode]: 0 }));
    d[initialNode] = 0;

    q.push(initialNode);
    setQueue([...q]);

    cl++;
    setCurrentLine(cl);
    saveState(cl, d, p, q, s, u);
    await waitForNextStep(signal);

    while (q.length > 0 && !signal.aborted) {
      u = q.shift()!;
      setQueue([...q]);
      s.push(u);
      setS([...s]);

      cl++;
      setCurrentLine(cl);
      saveState(cl, d, p, q, s, u);
      await waitForNextStep(signal);

      for (const edge of graphData.links) {
        if (edge.source === u) {
          const v = edge.target;
          const weight = edge.weight;
          if (d[v] > d[u] + weight) {
            d[v] = d[u] + weight;
            setDistances({ ...d });
            p[v] = u;
            setPredecessors({ ...p });

            q.push(v);
            setQueue([...q]);

            cl++;
            setCurrentLine(cl);
            saveState(cl, d, p, q, s, u);
            await waitForNextStep(signal);
          }
        }
      }
    }

    setIsPlayingAnimation(false);
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
    resetAnimation();
  };

  const startDjikstraAnimation = () => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    djikstraAnimation(controller.signal);
  };

  return (
    <>
      <SideBar />
      {fitsAnimation && (
        <div>
          <DjikstraControlsPanel
            isButtonDisabled={isPlaying}
            showActions={showActions}
            handleShowActions={handleShowActions}
            handleHideActions={handleHideActions}
            editingConstruction={editingConstruction}
            setShowPseudoCode={setShowPseudoCode}
            setInitialNode={setInitialNode}
            startAnimation={startDjikstraAnimation}
            setSpeed={setSpeed}
            graphData={graphData}
            setGraphData={setGraphData}
            highlightedNode={highlightedNode}
            highlightedLink={highlightedLink}
            highlightedTargetNode={highlightedTargetNode}
            colors={{}}
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
            <DjikstraPseudoCodeContainer
              visible={showPseudoCode}
              currentLine={currentLine}
            />
          )}
          {showPseudoCode && (
            <div className={styles.tableWrapper}>
              <DjikstraTable
                nodes={graphData.nodes}
                distances={distances}
                predecessors={predecessors}
              />
              <div className={styles.queueWrapper}>
                <h3>Q</h3>
                <ul>
                  {queue.map((node, index) => (
                    <li key={index}>{node}</li>
                  ))}
                </ul>
                <h3>S</h3>
                <ul>
                  {s.map((node, index) => (
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

export default DjikstraPage;
