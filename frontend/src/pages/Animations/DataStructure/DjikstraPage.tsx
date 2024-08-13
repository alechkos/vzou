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
  const index = useRef(0); //index for algorithm step
  const indexReturn = useRef(0); //this is index that we need to return after back-play in algorithm
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
    console.log("I am here in restore state and my state queue is ", state.queue);
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
    console.log("Click back");
    console.log("My history here is ", historyRef.current);
    indexReturn.current = index.current;
    console.log("my index return is ", indexReturn.current);
    index.current--;
    console.log("my index  is ", index.current);
    backClicked.current = true;
    console.log("backclicked is ", backClicked.current);

    if (historyRef.current.length > 1) {
      historyRef.current.pop();
      console.log("My history after pop is ", historyRef.current);
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
    console.log("The animation is started");

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
      console.log("I am here");
      setDistances(initDistances);
      setPredecessors(initPredecessors);
    } else {
      setDistances(historyRef.current[historyRef.current.length - 1].distances);
      setPredecessors(historyRef.current[historyRef.current.length - 1].predecessors);
      console.log("I am here else");
      s = s2.current;
    }
    if (signal.aborted) return resetAnimation();
    //-------------------------0-st line------------------------------

    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      console.log("0-st line code execution");
      console.log("The index here is ", index.current);
      setCurrentLine(cl);
      saveState(cl, d, p, q, s, u);
      await waitForNextStep(signal);
      if (signal.aborted) return resetAnimation();
    } else {
      console.log("0 else");
      console.log("index in else ", index.current);
    }
    if (signal.aborted) return resetAnimation();

    //-------------------------end of 0-st line-----------------------

    if (signal.aborted) return resetAnimation();
    for (const v of graphData.nodes) {
      if (signal.aborted) return resetAnimation();

      index.current++;
      console.log("My index is ", index.current);

      if (signal.aborted) return resetAnimation();
      //----------------------1-t line--------------------------------
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
          if (signal.aborted) return resetAnimation();
        }
        console.log("1-st linde code execution");
        console.log("The index here is ", index.current);
        setCurrentLine(cl + 1);
        saveState(cl + 1, d, p, q, s, u);
        if (signal.aborted) return resetAnimation();

        await waitForNextStep(signal);
        if (signal.aborted) return resetAnimation();
      } else {
        console.log("1 else");
        console.log("index in else ", index.current);
      }

      //----------------------end of 1-t line-------------------------
      if (signal.aborted) return resetAnimation();

      //----------------------2-nd line--------------------------------
      index.current++;

      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }

        console.log("2-st linde code execution");
        console.log("The index here is ", index.current);
        setCurrentLine(cl + 2);
        setDistances((prev) => ({ ...prev, [v]: Infinity }));
        d[v] = Infinity;
        saveState(cl + 2, d, p, q, s, u);

        await waitForNextStep(signal);
        if (signal.aborted) return resetAnimation();
      } else {
        setDistances((prev) => ({ ...prev, [v]: Infinity }));
        d[v] = Infinity;
        console.log("2 else");
        console.log("index in else ", index.current);
      }

      //----------------------end of 2-nd line-------------------------
      if (signal.aborted) return resetAnimation();

      //-----------------------3-rd line-------------------------------
      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }

        console.log("3-st line code execution");
        console.log("The index here is ", index.current);
        setCurrentLine(cl + 3);
        setPredecessors((prev) => ({ ...prev, [v]: null }));
        p[v] = null;
        saveState(cl + 3, d, p, q, s, u);
        if (signal.aborted) return resetAnimation();
        await waitForNextStep(signal);
        if (signal.aborted) return resetAnimation();
      } else {
        console.log("3 else");
        console.log("index in else ", index.current);
        p[v] = null;
        setPredecessors(historyRef.current[historyRef.current.length - 1].predecessors);
      }
      if (signal.aborted) return resetAnimation();

      //-----------------------end of 3-rd line-------------------------------
    }
    if (signal.aborted) return resetAnimation();

    //-------------------------4-nd line--------------------------------------
    index.current++;
    if (signal.aborted) return resetAnimation();
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      console.log("4 line execution");
      console.log("The index here is ", index.current);
      setCurrentLine(cl + 4);
      setDistances((prev) => ({ ...prev, [initialNode]: 0 }));
      d[initialNode] = 0;
      saveState(cl + 4, d, p, q, s, u);
      await waitForNextStep(signal);
      if (signal.aborted) return resetAnimation();
    } else {
      console.log("4 else");
      console.log("index in else ", index.current);
      console.log("I tried ti be in 4");
      d[initialNode] = 0;
    }
    //-------------------------end of 4-nd line--------------------------------------

    //--------------------------5-th line--------------------------------------------
    index.current++;
    if (signal.aborted) return resetAnimation();
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      console.log("5 line execution");
      console.log("The index here is ", index.current);
      setCurrentLine(cl + 5);
      saveState(cl + 5, d, p, q, s, u);
      //console.log("My history on 5 line is ", historyRef.current);
      await waitForNextStep(signal);
    } else {
      console.log("5 else");
      console.log("index in else ", index.current);
      console.log("I tried ti be in 5");
    }
    if (signal.aborted) return resetAnimation();
    //----------------------------end of 5-th line------------------------------------

    //----------------------------6-th line-------------------------------------------
    index.current++;
    if (signal.aborted) return resetAnimation();
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      console.log("6 line execution");
      console.log("The index here is ", index.current);
      setCurrentLine(cl + 6);
      q = [...graphData.nodes];
      setQueue([...q]);

      saveState(cl + 6, d, p, q, s, u);

      await waitForNextStep(signal);
    } else {
      console.log("6 else");
      console.log("index in else ", index.current);
      console.log(
        "I tried ti be in 6 and my q is ",
        historyRef.current[historyRef.current.length - 1].queue
      );
      //q = [...graphData.nodes];
      q = [...historyRef.current[historyRef.current.length - 1].queue];
      setDistances(historyRef.current[historyRef.current.length - 1].distances);
      setQueue(historyRef.current[historyRef.current.length - 1].queue);
    }

    //----------------------------end of 6-th line---------------------------------------------------
    if (signal.aborted) return resetAnimation();
    while (q.length > 0 || (backClicked.current && indexReturn.current > index.current)) {
      console.log();
      if (signal.aborted) return resetAnimation();
      //----------------------------7-th line------------------------------------------------------------
      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        console.log("7 line execution");
        console.log("The index here is ", index.current);
        setCurrentLine(cl + 7);

        saveState(cl + 7, d, p, q, s, u);
        console.log("My history on 7 line is ", historyRef.current);
        await waitForNextStep(signal);
      } else {
        console.log("7 else");
        console.log("index in else ", index.current);
        console.log("I tried ti be in 7");
      }
      if (signal.aborted) return resetAnimation();
      //----------------------------end of 7-th line-----------------------------------------------------

      //----------------------------8-th line------------------------------------------------------------
      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        console.log("8 line execution");
        console.log("The index here is ", index.current);
        console.log("I am on 8 and q is ", q);
        setCurrentLine(cl + 8);
        u = q.reduce((minNode, node) => (d[node] < d[minNode] ? node : minNode), q[0]);
        q = q.filter((node) => node !== u);
        setQueue([...q]);
        setCurrentU(u);
        saveState(cl + 8, d, p, q, s, u);
        await waitForNextStep(signal);
      } else {
        console.log("8 else");
        console.log("index in else ", index.current);
        console.log("I tried ti be in 8");
        u = historyRef.current[historyRef.current.length - 1].u;
        setCurrentU(historyRef.current[historyRef.current.length - 1].u);
      }

      //----------------------------end of 8-th line-------------------------------------------------------
      if (signal.aborted) return resetAnimation();

      //---------------------------9-th line---------------------------------------------------------------
      index.current++;
      let neighbors = graphData.links
        .filter((edge) => edge.source === u)
        .map((edge) => edge.target);
      console.log("My neighbors on 9 is ", neighbors);
      console.log("My graphdata  on 9 is ", graphData);
      console.log("My u is ", u);

      if (backClicked.current) {
        neighbors = neighbors2.current;
        console.log("I was here and my n is ", neighbors);
      }

      console.log("The return index is ", indexReturn.current);
      console.log("The  index is ", index.current);

      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        console.log("9 line execution");
        console.log("The index here is ", index.current);
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
        console.log("9 else");
        console.log("index in else ", index.current);
        if (s.length === 0 || (s.length > 0 && !s.includes(u))) {
          s.push(u);
          s2.current = s;
        }
        setS(historyRef.current[historyRef.current.length - 1].s);
        console.log("I am in else 9");
      }

      if (signal.aborted) return resetAnimation();

      //---------------------------end of 9-th line---------------------------------------------------------------
      console.log(
        "I try to entrance in if (neighbors.length > 0 and my neughbors length is ",
        neighbors.length
      );
      if (neighbors.length === 0 && backClicked.current) {
        index.current++;
      }
      if (signal.aborted) return resetAnimation();
      if (neighbors.length > 0) {
        for (const v of neighbors) {
          //----------------------------10-th line--------------------------------------------------------------------
          if (signal.aborted) return resetAnimation();
          index.current++;
          if (
            !backClicked.current ||
            (backClicked.current && indexReturn.current === index.current)
          ) {
            if (backClicked.current && indexReturn.current === index.current) {
              backClicked.current = false;
            }
            console.log("10 line execution");
            console.log("The index here is ", index.current);
            setCurrentLine(cl + 10);
            saveState(cl + 10, d, p, q, s, u);
            await waitForNextStep(signal);
          } else {
            console.log("10 else");
            console.log("index in else ", index.current);
          }

          if (signal.aborted) return resetAnimation();
          //----------------------------end of 10-th line--------------------------------------------------------------------

          //----------------------------11-th line---------------------------------------------------------------------------
          index.current++;
          console.log("My index current is ", index.current);
          console.log("My index return is ", indexReturn.current);
          console.log("My backClicked is ", backClicked.current);
          if (
            !backClicked.current ||
            (backClicked.current && indexReturn.current === index.current)
          ) {
            if (backClicked.current && indexReturn.current === index.current) {
              backClicked.current = false;
            }
            console.log("11 line execution");
            console.log("The index here is ", index.current);
            setCurrentLine(cl + 11);
            saveState(cl + 11, d, p, q, s, u);
            await waitForNextStep(signal);
          } else {
            console.log("11 else");
            console.log("index in else ", index.current);
          }

          if (signal.aborted) return resetAnimation();

          //----------------------------end of11-th line----------------------------------------------------------------------
          if (!s.includes(v)) {
            //----------------------------12-th line--------------------------------------------------------------------------
            if (signal.aborted) return resetAnimation();
            index.current++;
            if (
              !backClicked.current ||
              (backClicked.current && indexReturn.current === index.current)
            ) {
              if (backClicked.current && indexReturn.current === index.current) {
                backClicked.current = false;
              }
              console.log("12 line execution");
              console.log("The index here is ", index.current);
              setCurrentLine(cl + 12);
              saveState(cl + 12, d, p, q, s, u);
              await waitForNextStep(signal);
              if (signal.aborted) return resetAnimation();
            } else {
              console.log("12 else");
              console.log("index in else ", index.current);
            }

            //----------------------------end of 12-th line--------------------------------------------------------------------------

            //----------------------------16-th line(relax)--------------------------------------------------------------------------
            if (signal.aborted) return resetAnimation();
            index.current++;
            if (
              !backClicked.current ||
              (backClicked.current && indexReturn.current === index.current)
            ) {
              if (backClicked.current && indexReturn.current === index.current) {
                backClicked.current = false;
              }
              console.log("16 line execution");
              console.log("The index here is ", index.current);
              setCurrentLine(cl + 16);
              saveState(cl + 16, d, p, q, s, u);
              await waitForNextStep(signal);
            } else {
              console.log("0 else");
              console.log("index in else ", index.current);
            }
            if (signal.aborted) return resetAnimation();

            //----------------------------end of 16-th line(relax)--------------------------------------------------------------------------

            //----------------------------17-th line---------------------------------------------------------------------------------------
            if (signal.aborted) return resetAnimation();
            index.current++;
            if (
              !backClicked.current ||
              (backClicked.current && indexReturn.current === index.current)
            ) {
              if (backClicked.current && indexReturn.current === index.current) {
                backClicked.current = false;
              }
              console.log("17 line execution");
              console.log("The index here is ", index.current);
              //console.log("backclicled on 17 is ", backClicked.current);
              setCurrentLine(cl + 17);
              //console.log("I am on 17");
              saveState(cl + 17, d, p, q, s, u);
              await waitForNextStep(signal);
            } else {
              console.log("17 else");
              console.log("index in else ", index.current);
            }
            if (signal.aborted) return resetAnimation();
            //----------------------------end of 17-th line---------------------------------------------------------------------------------------

            const weight = getEdgeWeight(u, v);
            console.log("The weight is ", weight);
            console.log("d is ", d);

            if (d[v] > d[u] + weight!) {
              //----------------------------18-th line----------------------------------------------------------------------------------------------
              console.log("I passed this d[v] > d[u] + weight! with true");
              if (signal.aborted) return resetAnimation();
              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                console.log("18 line execution");
                console.log("The index here is ", index.current);
                setCurrentLine(cl + 18);

                d[v] = d[u] + weight!;
                setDistances({ ...d });
                saveState(cl + 18, d, p, q, s, u);
                await waitForNextStep(signal);
              } else {
                console.log("18 else");
                console.log("index in else ", index.current);
                d[v] = d[u] + weight!;
              }
              if (signal.aborted) return resetAnimation();
              //----------------------------end of 18-th line----------------------------------------------------------------------------------------------

              //----------------------------19-th line-----------------------------------------------------------------------------------------------------
              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                setCurrentLine(cl + 19);
                console.log("19 line execution");
                console.log("The index here is ", index.current);
                p[v] = u;
                setPredecessors({ ...p });
                saveState(cl + 19, d, p, q, s, u);
                await waitForNextStep(signal);
              } else {
                console.log("19 else");
                console.log("index in else ", index.current);
                p[v] = u;
                setPredecessors(historyRef.current[historyRef.current.length - 1].predecessors);
              }
              if (signal.aborted) return resetAnimation();
              //----------------------------end of 19-th line-----------------------------------------------------------------------------------------------------

              //----------------------------20-th line------------------------------------------------------------------------------------------------------------
              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                console.log("20 line execution");
                console.log("The index here is ", index.current);
                setCurrentLine(cl + 20);
                saveState(cl + 20, d, p, q, s, u);
                await waitForNextStep(signal);
              } else {
                console.log("20 else");
                console.log("index in else ", index.current);
              }
              if (signal.aborted) return resetAnimation();
              //----------------------------end of 20-th line------------------------------------------------------------------------------------------------------
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
          console.log("13 line execution");
          console.log("The index here is ", index.current);
          setCurrentLine(cl + 13);
          console.log("I am here on 13");
          saveState(cl + 13, d, p, q, s, u);
          await waitForNextStep(signal);
        } else {
          console.log("13 else");
          console.log("index in else ", index.current);
        }
      } else {
        //case when the 10.   for each v in Adj[u] and 7. While(Q ≠ ∅){ are ending and we gonna end our animation
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
          console.log("10b line execution");
          console.log("The index here is ", index.current);
          setCurrentLine(cl + 10);
          if (signal.aborted) return resetAnimation();
          saveState(cl + 10, d, p, q, s, u);
          if (signal.aborted) return resetAnimation();
          await waitForNextStep(signal);
        } else {
          console.log("10b else");
          console.log("index in else ", index.current);
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
          console.log("14b line execution");
          console.log("The index here is ", index.current);
          setCurrentLine(cl + 14);
          if (signal.aborted) return resetAnimation();
          console.log("The problem is here");
          if (signal.aborted) return resetAnimation();
          saveState(cl + 14, d, p, q, s, u);
          if (signal.aborted) return resetAnimation();
          console.log("My history here is ", historyRef.current);
          await waitForNextStep(signal);
        } else {
          console.log("14b else");
          console.log("index in else ", index.current);
        }
        if (signal.aborted) return resetAnimation();
      }
      if (signal.aborted) return resetAnimation();
    }

    setIsPlayingAnimation(false);
  };

  const handlePause = () => {
    console.log("Click pause");
    setIsPaused(true);
  };

  const handlePlay = () => {
    console.log("click play");

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
