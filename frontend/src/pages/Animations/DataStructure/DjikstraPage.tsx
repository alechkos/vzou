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
  const currentSRef = useRef<number | null>(null);
  const currentURef = useRef<number | null>(null);

  const index = useRef(0);
  const indexReturn = useRef(0);
  const backClicked = useRef(false);
  const neighbors2 = useRef<number[]>([]);
  const s2 = useRef<Number[]>([]);

  const root = useAppSelector((state) => state.bst.currentRoot);
  const isPlaying = useAppSelector((state) => state.bst.isPlaying);
  const dispatch = useDispatch();

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);
  const [initialNode, setInitialNode] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  const [currentLine, setCurrentLine] = useState(0); // Добавляем currentLine
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

  const [currentV, setCurrentV] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isHighlightingNode, setIsHighlightingNode] = useState(false);

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
      currentV,
      isHighlightingNode,
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
      setCurrentV(state.currentV);
      setIsHighlightingNode(state.isHighlightingNode);
    }
  };

  const handleBack = () => {
    indexReturn.current = index.current;
    index.current--;
    backClicked.current = true;

    if (historyRef.current.length > 1) {
      historyRef.current.pop();
      restoreState(historyRef.current.length - 1);
      setIsPaused(true);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const resetAnimation = () => {
    setDistances(historyRef.current[historyRef.current.length - 1].distances);
    setPredecessors(historyRef.current[historyRef.current.length - 1].predecessors);
    setIsPlayingAnimation(false);
    setIsPaused(true);
    setQueue(historyRef.current[historyRef.current.length - 1].queue);
    setS(historyRef.current[historyRef.current.length - 1].s);
    setCurrentU(historyRef.current[historyRef.current.length - 1].u);
    setHighlightedNode(null);
    setHighlightedLink(null);
    setHighlightedTargetNode(null);
    setCurrentV(null);
    setIsHighlightingNode(false);
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

  const getEdgeWeight = (u: number, v: number) => {
    const edge = graphData.links.find((edge) => edge.source === u && edge.target === v);
    return edge ? edge.weight : null;
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
    let s: any[] = [];
    let u: any = null;

    setIsPlayingAnimation(true);
    setIsPaused(false);
    setHasStarted(true);

    const initDistances: { [key: number]: number } = {};
    const initPredecessors: { [key: number]: number | null } = {};

    if (!backClicked.current) {
      setDistances(initDistances);
      setPredecessors(initPredecessors);
    } else {
      setDistances(historyRef.current[historyRef.current.length - 1].distances);
      setPredecessors(historyRef.current[historyRef.current.length - 1].predecessors);
      s = s2.current;
    }
    if (signal.aborted) return resetAnimation();

    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      setCurrentLine(cl);
      setIsHighlightingNode(false);
      saveState(cl, d, p, q, s, u);
      await waitForNextStep(signal);
      if (signal.aborted) return resetAnimation();
    }

    for (const v of graphData.nodes) {
      if (signal.aborted) return resetAnimation();

      index.current++;
      setCurrentV(v);
      console.log("CurrentV set to:", v);

      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
          if (signal.aborted) return resetAnimation();
        }
        setCurrentLine(cl + 1);
        setIsHighlightingNode(true);
        console.log("isHighlightingNode set to:", true);
        saveState(cl + 1, d, p, q, s, u);
        if (signal.aborted) return resetAnimation();

        await waitForNextStep(signal);
        if (signal.aborted) return resetAnimation();
      }

      index.current++;

      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }

        setCurrentLine(cl + 2);
        setDistances((prev) => ({ ...prev, [v]: Infinity }));
        d[v] = Infinity;
        saveState(cl + 2, d, p, q, s, u);

        await waitForNextStep(signal);
        if (signal.aborted) return resetAnimation();
      } else {
        setDistances((prev) => ({ ...prev, [v]: Infinity }));
        d[v] = Infinity;
      }

      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }

        setCurrentLine(cl + 3);
        setPredecessors((prev) => ({ ...prev, [v]: null }));
        p[v] = null;
        saveState(cl + 3, d, p, q, s, u);
        if (signal.aborted) return resetAnimation();
        await waitForNextStep(signal);
        if (signal.aborted) return resetAnimation();
      } else {
        p[v] = null;
        setPredecessors(historyRef.current[historyRef.current.length - 1].predecessors);
      }
      if (signal.aborted) return resetAnimation();
    }

    index.current++;
    if (signal.aborted) return resetAnimation();
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      setCurrentLine(cl + 4);
      setIsHighlightingNode(false);
      setDistances((prev) => ({ ...prev, [initialNode]: 0 }));
      d[initialNode] = 0;
      currentSRef.current = initialNode;
      saveState(cl + 4, d, p, q, s, u);
      await waitForNextStep(signal);
      if (signal.aborted) return resetAnimation();
    } else {
      d[initialNode] = 0;
    }

    index.current++;
    if (signal.aborted) return resetAnimation();
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      setCurrentLine(cl + 5);
      saveState(cl + 5, d, p, q, s, u);
      await waitForNextStep(signal);
    }
    if (signal.aborted) return resetAnimation();

    index.current++;
    if (signal.aborted) return resetAnimation();
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      setCurrentLine(cl + 6);
      q = [...graphData.nodes];
      setQueue([...q]);

      saveState(cl + 6, d, p, q, s, u);

      await waitForNextStep(signal);
    } else {
      q = [...historyRef.current[historyRef.current.length - 1].queue];
      setDistances(historyRef.current[historyRef.current.length - 1].distances);
      setQueue(historyRef.current[historyRef.current.length - 1].queue);
    }

    if (signal.aborted) return resetAnimation();
    while (q.length > 0 || (backClicked.current && indexReturn.current > index.current)) {
      if (signal.aborted) return resetAnimation();

      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        setCurrentLine(cl + 7);

        saveState(cl + 7, d, p, q, s, u);
        await waitForNextStep(signal);
      }
      if (signal.aborted) return resetAnimation();

      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        setCurrentLine(cl + 8);
        u = q.reduce((minNode, node) => (d[node] < d[minNode] ? node : minNode), q[0]);
        q = q.filter((node) => node !== u);
        setQueue([...q]);
        setCurrentU(u);
        currentURef.current = u;
        saveState(cl + 8, d, p, q, s, u);
        await waitForNextStep(signal);
      } else {
        u = historyRef.current[historyRef.current.length - 1].u;
        setCurrentU(historyRef.current[historyRef.current.length - 1].u);
      }

      if (signal.aborted) return resetAnimation();

      index.current++;
      let neighbors = graphData.links
        .filter((edge) => edge.source === u)
        .map((edge) => edge.target);

      if (backClicked.current) {
        neighbors = neighbors2.current;
      }

      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        setCurrentLine(cl + 9);
        if (s.length === 0 || (s.length > 0 && !s.includes(u))) {
          s.push(u);
          s2.current = s;
        }

        setS([...s]);
        saveState(cl + 9, d, p, q, s, u);
        neighbors = graphData.links.filter((edge) => edge.source === u).map((edge) => edge.target);
        neighbors2.current = neighbors;
        await waitForNextStep(signal);
      } else {
        if (s.length === 0 || (s.length > 0 && !s.includes(u))) {
          s.push(u);
          s2.current = s;
        }
        setS(historyRef.current[historyRef.current.length - 1].s);
      }

      if (signal.aborted) return resetAnimation();

      if (neighbors.length === 0 && backClicked.current) {
        index.current++;
      }
      if (signal.aborted) return resetAnimation();
      if (neighbors.length > 0) {
        for (const v of neighbors) {
          setCurrentV(v);
          console.log("CurrentV during neighbors iteration set to:", v);

          if (signal.aborted) return resetAnimation();
          index.current++;
          if (
            !backClicked.current ||
            (backClicked.current && indexReturn.current === index.current)
          ) {
            if (backClicked.current && indexReturn.current === index.current) {
              backClicked.current = false;
            }
            setCurrentLine(cl + 10);
            setIsHighlightingNode(true);
            console.log("isHighlightingNode set to:", true);
            saveState(cl + 10, d, p, q, s, u);
            await waitForNextStep(signal);
          }

          if (signal.aborted) return resetAnimation();

          index.current++;
          if (
            !backClicked.current ||
            (backClicked.current && indexReturn.current === index.current)
          ) {
            if (backClicked.current && indexReturn.current === index.current) {
              backClicked.current = false;
            }
            setCurrentLine(cl + 11);
            saveState(cl + 11, d, p, q, s, u);
            await waitForNextStep(signal);
          }

          if (signal.aborted) return resetAnimation();

          if (!s.includes(v)) {
            if (signal.aborted) return resetAnimation();
            index.current++;
            if (
              !backClicked.current ||
              (backClicked.current && indexReturn.current === index.current)
            ) {
              if (backClicked.current && indexReturn.current === index.current) {
                backClicked.current = false;
              }
              setCurrentLine(cl + 12);
              saveState(cl + 12, d, p, q, s, u);
              await waitForNextStep(signal);
              if (signal.aborted) return resetAnimation();
            }

            if (signal.aborted) return resetAnimation();
            index.current++;
            if (
              !backClicked.current ||
              (backClicked.current && indexReturn.current === index.current)
            ) {
              if (backClicked.current && indexReturn.current === index.current) {
                backClicked.current = false;
              }
              setCurrentLine(cl + 16);
              saveState(cl + 16, d, p, q, s, u);
              await waitForNextStep(signal);
            }
            if (signal.aborted) return resetAnimation();

            if (signal.aborted) return resetAnimation();
            index.current++;
            if (
              !backClicked.current ||
              (backClicked.current && indexReturn.current === index.current)
            ) {
              if (backClicked.current && indexReturn.current === index.current) {
                backClicked.current = false;
              }
              setCurrentLine(cl + 17);
              saveState(cl + 17, d, p, q, s, u);
              await waitForNextStep(signal);
            }

            const weight = getEdgeWeight(u, v);

            if (d[v] > d[u] + weight!) {
              if (signal.aborted) return resetAnimation();
              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                setCurrentLine(cl + 18);

                d[v] = d[u] + weight!;
                setDistances({ ...d });
                saveState(cl + 18, d, p, q, s, u);
                await waitForNextStep(signal);
              } else {
                d[v] = d[u] + weight!;
              }
              if (signal.aborted) return resetAnimation();

              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                setCurrentLine(cl + 19);
                p[v] = u;
                setPredecessors({ ...p });
                saveState(cl + 19, d, p, q, s, u);
                await waitForNextStep(signal);
              } else {
                p[v] = u;
                setPredecessors(historyRef.current[historyRef.current.length - 1].predecessors);
              }
              if (signal.aborted) return resetAnimation();

              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                setCurrentLine(cl + 20);
                saveState(cl + 20, d, p, q, s, u);
                await waitForNextStep(signal);
              }
              if (signal.aborted) return resetAnimation();
            }
          }
        }
        await waitForNextStep(signal);
        if (signal.aborted) return resetAnimation();
        index.current++;
        if (
          !backClicked.current ||
          (backClicked.current && indexReturn.current === index.current)
        ) {
          if (backClicked.current && indexReturn.current === index.current) {
            backClicked.current = false;
          }
          setCurrentLine(cl + 13);
          saveState(cl + 13, d, p, q, s, u);
          await waitForNextStep(signal);
        }
      } else {
        if (signal.aborted) return resetAnimation();
        index.current++;
        if (signal.aborted) return resetAnimation();
        if (
          !backClicked.current ||
          (backClicked.current && indexReturn.current === index.current)
        ) {
          if (backClicked.current && indexReturn.current === index.current) {
            backClicked.current = false;
          }
          setCurrentLine(cl + 10);
          if (signal.aborted) return resetAnimation();
          saveState(cl + 10, d, p, q, s, u);
          if (signal.aborted) return resetAnimation();
          await waitForNextStep(signal);
        }

        if (signal.aborted) return resetAnimation();
        index.current++;
        if (
          !backClicked.current ||
          (backClicked.current && indexReturn.current === index.current)
        ) {
          if (backClicked.current && indexReturn.current === index.current) {
            backClicked.current = false;
          }
          setCurrentLine(cl + 14);
          if (signal.aborted) return resetAnimation();
          if (signal.aborted) return resetAnimation();
          saveState(cl + 14, d, p, q, s, u);
          if (signal.aborted) return resetAnimation();
          await waitForNextStep(signal);
        }
        if (signal.aborted) return resetAnimation();
      }
      if (signal.aborted) return resetAnimation();
    }

    setIsPlayingAnimation(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handlePlay = () => {
    if (backClicked.current) {
      setQueue(historyRef.current[historyRef.current.length - 1].queue);
      setDistances(historyRef.current[historyRef.current.length - 1].distances);
      index.current = 0;
      const controller = new AbortController();
      abortControllerRef.current = controller;
      djikstraAnimation(controller.signal);
    } else {
      setIsPaused(false);
    }
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
            colors={{ [currentV as number]: isHighlightingNode ? "yellow" : "lime" }}
            currentV={currentV}
            isHighlightingNode={isHighlightingNode}
            currentLine={currentLine}
            currentSRef={currentSRef}
            currentURef={currentURef}
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
                <h3>u</h3>
                <ul>
                  <li>{currentU !== null ? currentU : ""}</li>
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
