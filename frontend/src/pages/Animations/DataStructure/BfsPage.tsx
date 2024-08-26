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

  //index in order to know in what index our anymation now. I need this if somebody clicked on back and then on play.This is the cuurent
  //index
  const index = useRef(0);
  //is user click back then we save in this returnIndex place we need to return after play
  const indexReturn = useRef(0);
  //for indicate if user clicked on button back
  const backClicked = useRef(false);
  //for indicate if user clicked on button stop
  const stopClicked = useRef(false);
  //this flag if someone clicked back on line>=10
  const qFlag = useRef(false);
  //this flag if I need to enter in if but dont execute its body(only for index++)
  const cFlag = useRef(false);
  //this flag if I need to enter in if but dont execute its body(only for index++)
  const cBlackFlag = useRef(false);
  //this for save states about highlighted lines
  const hl: any = useRef({});

  const controller = BfsAnimationController.getController(root, dispatch);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);
  const [initialNode, setInitialNode] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  //This I need for control speed while animation is playing
  const speedRef = useRef(speed);
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

  const historyRef = useRef<any[]>([]); // our history for save states
  const abortControllerRef = useRef<AbortController | null>(null); // controller for stops

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

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const fitsAnimation = viewportWidth >= 1500;

  const setCurrentError = (error: string) => {
    dispatch(setError(error));
    setTimeout(() => {
      dispatch(setError(""));
    }, 5000);
  };

  //function for save our history in order to restore when sombody click on back and play
  const saveState = (cl: any, d: any, p: any, c: any, q: number[], u: any, hl = null) => {
    const currentState = {
      cl,
      distances: { ...d },
      predecessors: { ...p },
      colors: { ...c },
      queue: [...q],
      u,
      highlightedNode,
      highlightedLink: hl,
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
      setColors(state.colors);
      setQueue(state.queue);
      setCurrentU(state.u);
      setHighlightedNode(state.highlightedNode);
      setHighlightedLink(state.highlightedLink);
      setHighlightedTargetNode(state.highlightedTargetNode);
    }
  };

  //function that works when someone click on back
  const handleBack = () => {
    if (
      historyRef.current[historyRef.current.length - 1].cl >= 11 &&
      historyRef.current[historyRef.current.length - 1].cl <= 17
    ) {
      qFlag.current = true;
    } else {
      qFlag.current = false;
    }

    if (historyRef.current[historyRef.current.length - 1].cl >= 16) {
      cFlag.current = true;
    } else {
      cFlag.current = false;
    }

    if (historyRef.current[historyRef.current.length - 1].cl >= 17) {
      cBlackFlag.current = true;
    } else {
      cBlackFlag.current = false;
    }

    console.log("After I clicked back my history is ", historyRef.current);
    //here we save the placa where we need to return when we click play
    indexReturn.current = index.current;
    console.log("The index return is ", indexReturn.current);
    //but when we clicked the index is less
    index.current--;
    backClicked.current = true;
    if (historyRef.current.length > 1) {
      historyRef.current.pop();
      restoreState(historyRef.current.length - 1);
      setIsPaused(true);
    }
    //here we stop our anymation
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
    setCurrentU(historyRef.current[historyRef.current.length - 1].u);
    setHighlightedNode(null);

    setHighlightedTargetNode(null);
  };
  const resetAnimation2 = () => {
    setDistances({});
    setPredecessors({});
    setIsPlayingAnimation(false);
    setIsPaused(true);
    setQueue([]);
    setCurrentU(null);
    setHighlightedNode(null);
    setHighlightedLink(null);
    setHighlightedTargetNode(null);
    setCurrentLine(0);
    setDistances({});
    setColors({});
  };

  //here our controller check what button user clicked
  const checkStopOrBack = (signal: AbortSignal) => {
    if (signal.aborted || stopClicked.current) {
      if (stopClicked.current) {
        return resetAnimation2();
      } else return resetAnimation();
    }
  };

  //---------------------------this the main function in algorithm bfs-------------------------------
  const bfsAnimation = async (signal: AbortSignal) => {
    console.log("The animation has started");

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

    if (!backClicked.current) {
      console.log("I set the distances here if (!backClicked.current) {");
      setDistances(initDistances);

      setPredecessors(initPredecessors);
      setColors(initColors);
    } else {
      setDistances(historyRef.current[historyRef.current.length - 1].distances);
      d = historyRef.current[historyRef.current.length - 1].distances;
      setPredecessors(historyRef.current[historyRef.current.length - 1].predecessors);
      p = historyRef.current[historyRef.current.length - 1].predecessors;
      setColors(historyRef.current[historyRef.current.length - 1].colors);
      c = historyRef.current[historyRef.current.length - 1].colors;

      setQueue(historyRef.current[historyRef.current.length - 1].queue);
      q = historyRef.current[historyRef.current.length - 1].queue;

      //localQueue = historyRef.current[historyRef.current.length - 1].queue;
    }

    //-------------------------------------0-th line-------------------
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      console.log("I am on line 0");
      setCurrentLine(0);
      saveState(cl, d, p, c, q, u);
      console.log(
        "My distances here 0 is ",
        historyRef.current[historyRef.current.length - 1].distances
      );
      await waitForNextStep(signal);
    }
    //-------------------------------------end 0-th line-------------------

    for (const v of graphData.nodes) {
      if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);

      //------------------------------------1-th line-----------------------
      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        console.log("I am on line 1");
        setCurrentLine(1);

        saveState(cl + 1, d, p, c, q, u);
        console.log(
          "My distances here 1 is ",
          historyRef.current[historyRef.current.length - 1].distances
        );
        console.log("My history here is ", historyRef.current);
        await waitForNextStep(signal);
      }
      //-------------------------------------end of 1-th line-------------------

      //-------------------------------------2-th line--------------------------
      if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        console.log("I am on line 2");
        setDistances((prev) => ({ ...prev, [v]: Infinity }));
        d = { ...d, [v]: Infinity };
        console.log("I set the distances on line 2");
        setCurrentLine(2);

        saveState(cl + 2, d, p, c, q, u);
        console.log(
          "My distances here 2 is ",
          historyRef.current[historyRef.current.length - 1].distances
        );

        await waitForNextStep(signal);
      }
      //-----------------------------------end 2-th line-----------------------

      //-----------------------------------3-th line-----------------------------
      if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        console.log("I am on line 3");
        setPredecessors((prev) => ({ ...prev, [v]: null }));
        p = { ...p, [v]: null };
        setCurrentLine(3);
        saveState(cl + 3, d, p, c, q, u);
        console.log(
          "My distances here 3 is ",
          historyRef.current[historyRef.current.length - 1].distances
        );
        await waitForNextStep(signal);
      }
      //-------------------------------------end of 3-th line-----------------------

      //-------------------------------------4-th line------------------------------
      if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
      index.current++;
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        console.log("I am on line 4");
        setColors((prev) => ({ ...prev, [v]: "WHITE" }));
        c = { ...c, [v]: "WHITE" };
        setHighlightedNode(v); // here we give color to our node
        setCurrentLine(4);
        saveState(cl + 4, d, p, c, q, u);
        console.log(
          "My distances here 4 is ",
          historyRef.current[historyRef.current.length - 1].distances
        );
        console.log("My history is ", historyRef.current);
        await waitForNextStep(signal);
        setHighlightedNode(null);
      }
      if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
      console.log("end of iteration");
      //-------------------------------------end 4-th line---------------------------------
    } //end 1-st for

    //---------------------------------------5-th line-------------------------------------
    if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
    index.current++;
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      setHighlightedNode(null);
      setCurrentLine(5);
      saveState(cl + 5, d, p, c, q, u);
      await waitForNextStep(signal);
    }
    //---------------------------------------end 5-th line-------------------------------------

    //----------------------------------------6-th line----------------------------------------
    if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
    index.current++;
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      setCurrentLine(6);
      setDistances((prev) => ({ ...prev, [initialNode]: 0 }));
      d = { ...d, [initialNode]: 0 };
      saveState(cl + 6, d, p, c, q, u);
      await waitForNextStep(signal);
    }
    //----------------------------------------end of 6-th line----------------------------------------

    //----------------------------------------7-th line-----------------------------------------------
    if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
    index.current++;
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      setCurrentLine(7);
      console.log("I am om the 7 line");
      console.log("Here on the 7 line my history is ", historyRef.current);
      setColors((prev) => ({ ...prev, [initialNode]: "GRAY" }));
      c = { ...c, [initialNode]: "GRAY" };
      setHighlightedNode(initialNode);
      saveState(cl + 7, d, p, c, q, u);
      await waitForNextStep(signal);
    }
    //------------------------------------------end of 7-th line-----------------------------------------

    //------------------------------------------8-th line-------------------------------------------------
    if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
    index.current++;
    if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
      if (backClicked.current && indexReturn.current === index.current) {
        backClicked.current = false;
      }
      setHighlightedNode(null);
      setCurrentLine(8);
      console.log("I am om the 8 line");
      //console.log("Here on the 8 line my history is ", historyRef.current);
      localQueue.push(initialNode);
      console.log("The local now is ", localQueue);
      setQueue([...localQueue]);
      console.log("The queue now is ", queue);
      q = [...localQueue];
      console.log("The q now is ", q);
      saveState(cl + 8, d, p, c, q, u);
      await waitForNextStep(signal);
    }
    //-----------------------------------------end of 8-th line-----------------------------------------------
    if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);

    continueBfsAnimation(localQueue, signal, d, p, c, q);
  };

  //--------------------------------------this function continue our main function-----------------------------
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

    while (q.length > 0 || qFlag.current) {
      console.log("I am in while");
      //-------------------------------------------9-th line-----------------------------------------
      if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
      index.current++;
      console.log("The index here is ", index.current); //index =13(in 1-t iteration)
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        setCurrentLine(9);
        console.log("I am om the 9 line");
        console.log("Here on the 9 line my history is ", historyRef.current);
        saveState(cl, d, p, c, q, localU);

        await waitForNextStep(signal);
      }
      //-------------------------------------------end of 9-th line-------------------------------------

      //-------------------------------------------10-th line-------------------------------------------
      if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
      index.current++; //here index =14
      let u: any;
      if (qFlag.current) {
        console.log("I am enter to here in order evaluate u");

        u = historyRef.current[historyRef.current.length - 1].u;
      } else {
        u = q.shift()!;
        console.log("I am here in else");
      }

      localU = u;
      q = [...q];
      setQueue([...q]);
      setCurrentU(u ?? null);
      if (!backClicked.current || (backClicked.current && indexReturn.current === index.current)) {
        if (backClicked.current && indexReturn.current === index.current) {
          backClicked.current = false;
        }
        setCurrentLine(10);
        saveState(cl + 1, d, p, c, q, localU);
        await waitForNextStep(signal);
      }
      //-----------------------------------------end of 10-th line--------------------------------------
      if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
      console.log("The u is ", u);
      if (u !== undefined) {
        //await waitForNextStep(signal);
        console.log("I am here");
        for (const v of graphData.links
          .filter((link) => link.source === u)
          .map((link) => link.target)) {
          //-----------------------------------11-th line----------------------------------------------
          console.log("I am here");
          if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
          index.current++;
          console.log("My index now is ", index.current);
          if (
            !backClicked.current ||
            (backClicked.current && indexReturn.current === index.current)
          ) {
            if (backClicked.current && indexReturn.current === index.current) {
              backClicked.current = false;
            }
            qFlag.current = false;
            setCurrentLine(11);
            hl.current = { source: u, target: v };
            console.log("My index now is ", index.current);
            setHighlightedLink({ source: u, target: v });
            setHighlightedTargetNode(v);
            saveState(cl + 2, d, p, c, q, localU, hl.current);

            await waitForNextStep(signal);
          }
          //-----------------------------------end of 11-th line-----------------------------------------------

          if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);

          if (c[u] !== "BLACK" || cBlackFlag.current) {
            if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
            if (c[v] === "WHITE" || cFlag.current) {
              //-----------------------------------12-th line-----------------------------------------------------
              if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                qFlag.current = false;
                setCurrentLine(12);

                saveState(cl + 3, d, p, c, q, localU, hl.current);
                console.log("My history in 12 is ", historyRef.current);
                await waitForNextStep(signal);
              }
              //-------------------------------------end of 12-th line-------------------------

              //------------------------------------13-th line---------------------------------
              if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                qFlag.current = false;
                d = { ...d, [v]: d[u] + 1 };
                setDistances((prev) => ({ ...prev, [v]: d[u] + 1 }));
                setCurrentLine(13);
                saveState(cl + 4, d, p, c, q, localU, hl.current);
                await waitForNextStep(signal);
              }
              //-------------------------------------end of 13-th line----------------------------

              //--------------------------------------14-th line---------------------------------
              if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                qFlag.current = false;
                p = { ...p, [v]: u };
                setPredecessors((prev) => ({ ...prev, [v]: u }));
                setCurrentLine(14);
                saveState(cl + 5, d, p, c, q, localU, hl.current);
                await waitForNextStep(signal);
              }
              //----------------------------------------end 14-th line------------------------------------

              //----------------------------------------15-th line----------------------------------------
              if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                qFlag.current = false;
                c = { ...c, [v]: "GRAY" };
                setColors((prev) => ({ ...prev, [v]: "GRAY" }));
                setHighlightedNode(v);
                setCurrentLine(15);

                saveState(cl + 6, d, p, c, q, localU, hl.current);
                await waitForNextStep(signal);
              }
              //---------------------------------------end 15-th line---------------------------------------

              //---------------------------------------16-th line-------------------------------------------
              if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
              index.current++;
              if (
                !backClicked.current ||
                (backClicked.current && indexReturn.current === index.current)
              ) {
                if (backClicked.current && indexReturn.current === index.current) {
                  backClicked.current = false;
                }
                qFlag.current = false;
                cFlag.current = false;
                setHighlightedNode(null);
                setCurrentLine(16);

                q.push(v);
                q = [...q];
                setQueue([...q]);
                saveState(cl + 7, d, p, c, q, localU, hl.current);
                await waitForNextStep(signal);
              }
              //--------------------------------------end of 16-th line-------------------------------------------
              if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
            }
          }
        }
        //-------------------------------------------17-th line---------------------------------------------------
        if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
        index.current++;
        if (
          !backClicked.current ||
          (backClicked.current && indexReturn.current === index.current)
        ) {
          if (backClicked.current && indexReturn.current === index.current) {
            backClicked.current = false;
          }
          qFlag.current = false;
          cFlag.current = false;
          cBlackFlag.current = false;
          c = { ...c, [u]: "BLACK" };
          setColors((prev) => ({ ...prev, [u]: "BLACK" }));
          setHighlightedNode(u);
          setCurrentLine(17);
          saveState(cl + 8, d, p, c, q, localU, hl.current);
          await waitForNextStep(signal);
          setHighlightedNode(null);
        }
        //-------------------------------------------end of 17-th line----------------------------------------------
        if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
      }
    }

    if (signal.aborted || stopClicked.current) return checkStopOrBack(signal);
    setCurrentLine(18);
    saveState(cl + 7, d, p, c, q, localU);
    await waitForNextStep(signal);
    setIsPlayingAnimation(false);
  };

  //this function make delay between lines and if someone click  pause theis function work too
  const waitForNextStep = async (signal: AbortSignal) => {
    const delay = 1000 / speedRef.current;
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

  //function when user clicked on pause
  const handlePause = () => {
    setIsPaused(true);
  };

  //fucntion when user clicked on play
  const handlePlay = () => {
    if (stopClicked.current) {
      stopClicked.current = false;
      startBfsAnimation();
    } else if (backClicked.current) {
      //because we are starting over
      index.current = 0;
      const controller = new AbortController();
      abortControllerRef.current = controller;
      bfsAnimation(controller.signal);
    } else {
      setIsPaused(false);
    }
  };

  //fucntion when user clicked on stop
  const handleStop = () => {
    stopClicked.current = true;
  };

  //fucntion when user clicked on start algorithm animation
  const startBfsAnimation = () => {
    if (initialNode === null) {
      setCurrentError("You did not put initial node ");
      return;
    }
    if (!graphData.nodes.includes(initialNode!)) {
      setCurrentError("This initial node does not consist in list of node that you entered");
      return;
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    bfsAnimation(controller.signal);
  };

  //rendering of page
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
            colors={colors}
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
