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
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null); // Добавляем highlightedNode

  const [isPaused, setIsPaused] = useState(false);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // New state to track animation start

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

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
        continueBfsAnimation();
      }, 1000 / speed); // Delay before moving to next line
    }
  }, [queue, currentLine, speed]);

  const bfsAnimation = async () => {
    if (initialNode === null) {
      setCurrentError("Please set the initial node.");
      return;
    }

    setIsPlayingAnimation(true);
    setIsPaused(false);
    setHasStarted(true); // Set the hasStarted state to true when the animation starts

    const initDistances: { [key: number]: number } = {};
    const initPredecessors: { [key: number]: number | null } = {};
    const initColors: { [key: number]: string } = {};

    setDistances(initDistances);
    setPredecessors(initPredecessors);
    setColors(initColors);

    setCurrentLine(0);
    await waitForNextStep();

    for (const v of graphData.nodes) {
      setHighlightedNode(v); // Подсвечиваем текущий узел
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

    setHighlightedNode(null); // Убираем подсветку после завершения цикла
    setCurrentLine(5);
    await waitForNextStep();
    setQueue([]);
    setCurrentLine(6);
    setDistances((prev) => ({ ...prev, [initialNode]: 0 }));
    await waitForNextStep();
    setCurrentLine(7);
    setColors((prev) => ({ ...prev, [initialNode]: "GRAY" }));
    await waitForNextStep();
    setCurrentLine(8);

    setQueue((prev) => {
      const newQueue = [...prev, initialNode];
      console.log("Updated queue in setQueue:", newQueue);
      return newQueue;
    });
    await waitForNextStep();
  };

  const continueBfsAnimation = async () => {
    console.log("Queue before while:", queue);

    while (queue.length > 0) {
      setCurrentLine(9); // Move to line 9 before checking the queue
      await waitForNextStep();

      setCurrentLine(10); // Move to line 10 before updating u
      const u = queue[0];
      setQueue((prev) => {
        const newQueue = prev.slice(1);
        console.log("Updated queue after dequeue:", newQueue);
        return newQueue;
      });
      setCurrentU(u);

      await waitForNextStep();
      console.log("U is ", u);

      if (u !== undefined) {
        await waitForNextStep();

        for (const v of graphData.links
          .filter((link) => link.source === u)
          .map((link) => link.target)) {
          setCurrentLine(11);
          await waitForNextStep();

          if (colors[v] === "WHITE") {
            setCurrentLine(12);
            await waitForNextStep();
            setDistances((prev) => ({ ...prev, [v]: distances[u] + 1 }));
            setCurrentLine(13);
            await waitForNextStep();
            setPredecessors((prev) => ({ ...prev, [v]: u }));
            setCurrentLine(14);
            await waitForNextStep();
            setColors((prev) => ({ ...prev, [v]: "GRAY" }));
            setCurrentLine(15);
            await waitForNextStep();
            setCurrentLine(16);
            setQueue((prev) => {
              const newQueue = [...prev, v];
              console.log("Updated queue in setQueue:", newQueue);
              return newQueue;
            });
            await waitForNextStep();
          }
        }

        setColors((prev) => ({ ...prev, [u]: "BLACK" }));
        setCurrentLine(17);
        await waitForNextStep();
      }
    }

    setCurrentLine(18);
    await waitForNextStep();
    console.log(queue);
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
            highlightedNode={highlightedNode} // Передаем highlightedNode в BfsControlsPanel
          />
          {hasStarted && ( // Show buttons only if the animation has started
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
