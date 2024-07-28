import React, { FC, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { BfsAnimationController } from "../../../ClassObjects/BST/BfsAnimationController";
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

  const saveState = (cl: any, d: any, p: any, q: number[], u: any) => {
    const currentState = {
      cl,
      distances: { ...d },
      predecessors: { ...p },
      queue: [...q],
      u,
      s: [...s],
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

  const bfsAnimation = async (signal: AbortSignal) => {
    let cl = 0;
    let d = {};
    let p = {};
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

    setDistances(initDistances);
    setPredecessors(initPredecessors);

    setCurrentLine(0);
    saveState(cl, d, p, q, u);

    await waitForNextStep(signal);

    for (const v of graphData.nodes) {
      if (signal.aborted) return resetAnimation();
      setCurrentLine(1);

      saveState(cl + 1, d, p, q, u);

      await waitForNextStep(signal);
      setDistances((prev) => ({ ...prev, [v]: Infinity }));
      d = { ...d, [v]: Infinity };

      setCurrentLine(2);

      saveState(cl + 2, d, p, q, u);

      await waitForNextStep(signal);
      setPredecessors((prev) => ({ ...prev, [v]: null }));
      p = { ...p, [v]: null };

      setCurrentLine(3);
      saveState(cl + 3, d, p, q, u);
      await waitForNextStep(signal);
    }

    setCurrentLine(5);
    saveState(cl + 5, d, p, q, u);
    await waitForNextStep(signal);

    setCurrentLine(6);
    setDistances((prev) => ({ ...prev, [initialNode]: 0 }));
    d = { ...d, [initialNode]: 0 };
    saveState(cl + 6, d, p, q, u);
    await waitForNextStep(signal);

    setCurrentLine(7);
    localQueue.push(initialNode);
    setQueue([...localQueue]);
    q = [...localQueue];

    saveState(cl + 7, d, p, q, u);
    await waitForNextStep(signal);
    continueBfsAnimation(localQueue, signal, d, p, q);
  };

  const continueBfsAnimation = async (
    localQueue: number[],
    signal: AbortSignal,
    di: any,
    pr: any,
    qu: any
  ) => {
    let cl = 8;
    let d = { ...di };
    let p = { ...pr };
    let q = [...qu];
    let localU = null;

    while (localQueue.length > 0) {
      if (signal.aborted) return resetAnimation();
      setCurrentLine(8);
      saveState(cl, d, p, q, localU);

      await waitForNextStep(signal);

      setCurrentLine(9);

      const u = localQueue.shift()!;
      localU = u;
      q = [...localQueue];
      setQueue([...localQueue]);
      setCurrentU(u ?? null);
      saveState(cl + 1, d, p, q, localU);
      await waitForNextStep(signal);

      if (u !== undefined) {
        await waitForNextStep(signal);

        for (const v of graphData.links
          .filter((link) => link.source === u)
          .map((link) => link.target)) {
          if (signal.aborted) return resetAnimation();
          setCurrentLine(10);

          saveState(cl + 2, d, p, q, localU);
          await waitForNextStep(signal);

          setHighlightedLink({ source: u, target: v });
          setHighlightedTargetNode(v);

          await waitForNextStep(signal);

          if (p[v] === null) {
            if (d[v] > d[u] + 1) {
              setCurrentLine(11);

              saveState(cl + 3, d, p, q, localU);
              await waitForNextStep(signal);
              d = { ...d, [v]: d[u] + 1 };
              setDistances((prev) => ({ ...prev, [v]: d[u] + 1 }));
              setCurrentLine(12);
              saveState(cl + 4, d, p, q, localU);
              await waitForNextStep(signal);
              p = { ...p, [v]: u };
              setPredecessors((prev) => ({ ...prev, [v]: u }));
              setCurrentLine(13);
              saveState(cl + 5, d, p, q, localU);
              await waitForNextStep(signal);
              setHighlightedNode(v);
              setCurrentLine(14);

              saveState(cl + 6, d, p, q, localU);
              await waitForNextStep(signal);
              setHighlightedNode(null);
              setCurrentLine(15);

              localQueue.push(v);
              q = [...localQueue];
              setQueue([...localQueue]);
              saveState(cl + 7, d, p, q, localU);
              await waitForNextStep(signal);
            }
          }
        }
      }
    }

    setCurrentLine(16);
    saveState(cl + 7, d, p, q, localU);
    await waitForNextStep(signal);
    setIsPlayingAnimation(false);
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
          <DjikstraControlsPanel
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
