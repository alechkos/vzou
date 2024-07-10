import React, { FC, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { BfsAnimationController } from "../../../ClassObjects/BFS/BfsAnimationController";
import BfsControlsPanel from "../../../components/Simulation/ControlsPanels/BfsControlsPanel";
import BfsPseudoCodeContainer from "../../../components/Simulation/PseudoCode/BfsPseudoCodeContainer";
import { useAppSelector } from "../../../store/hooks";
import SideBar from "../../../components/Layout/SideBar/SideBar";
import { setError } from "../../../store/reducers/alghoritms/bst-reducer";
import styles from "../../../components/Simulation/PseudoCode/PseudoCodeWrapper.module.css";
import controlStyles from "./BfsControlsPanel.module.css";
import { combineBfsPseudoCode } from "../../../ClassObjects/BFS/BFSAlgorithms";
import { PseudoItem } from "../../../components/Simulation/PseudoCode/pc-helpers";
import PseudoCodeContainer from "../../../components/Simulation/PseudoCode/PseudoCodeContainer";
import GraphVisualizer from "../../../components/Simulation/ControlsPanels/GraphVisualizer";
import PlayerControlsPanel from "../../../components/Simulation/ControlsPanels/PlayerControlsPanel";
import BFS from "../../../components/Simulation/BFS/BFS";

const BfsPage: FC = () => {
  const dispatch = useDispatch();
  const initialNode = useAppSelector((state) => state.bfs.initialNode);
  const isPlaying = useAppSelector((state) => state.bfs.isPlaying);
  const currentAlg = useAppSelector((state) => state.bfs.currentAlg);
  const currentLine = useAppSelector((state) => state.bfs.currentLine);
  const graphData = useAppSelector((state) => state.bfs.graphData);
  const actions = useAppSelector((state) => state.bfs.currentActions);
  const roles = useAppSelector((state) => state.bfs.currentRoles);
  const passedNode = useAppSelector((state) => state.bfs.passedNodes);
  const visitedNodes = useAppSelector((state) => state.bfs.visitedNodes);
  const controller = BfsAnimationController.getController(initialNode, dispatch);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [showActions, setShowActions] = useState(false);
  const [editingConstruction, setEditingConstruction] = useState(false);
  const [showPseudoCode, setShowPseudoCode] = useState(false);

  const handleShowActions = () => setShowActions(true);
  const handleHideActions = () => {
    setShowActions(false);
    setEditingConstruction(true);
    setShowPseudoCode(false);
  };

  const fitsAnimation = viewportWidth >= 1500;

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <SideBar />
      {fitsAnimation && (
        <div>
          <BfsControlsPanel
            showActions={showActions}
            handleShowActions={handleShowActions}
            handleHideActions={handleHideActions}
            editingConstruction={editingConstruction}
            setShowPseudoCode={setShowPseudoCode}
            controller={controller}
          />
          {(showActions || editingConstruction) && (
            <BFS
              initialNode={initialNode}
              speed={controller.speed}
              viewportWidth={viewportWidth}
              actions={actions}
              roles={roles}
              passedNodes={passedNode}
              visitedNodes={visitedNodes}
            />
          )}
          {showPseudoCode && (
            <PlayerControlsPanel
              controller={controller}
              isPlaying={isPlaying}
            />
          )}
          {showPseudoCode && (
            <PseudoCodeContainer
              line={currentLine}
              code={combineBfsPseudoCode(currentAlg) as PseudoItem[]}
            />
          )}
          {/*{showPseudoCode && (*/}
          {/*  <div className={styles.tableWrapper}>*/}
          {/*    <table className={styles.table}>*/}
          {/*      <thead>*/}
          {/*        <tr>*/}
          {/*          <th>Node</th>*/}
          {/*          {graphData.nodes.map((node) => (*/}
          {/*            <th key={node}>{node}</th>*/}
          {/*          ))}*/}
          {/*        </tr>*/}
          {/*      </thead>*/}
          {/*      <tbody>*/}
          {/*        <tr>*/}
          {/*          <td>d</td>*/}
          {/*          {graphData.nodes.map((node) => (*/}
          {/*            <td key={node}>{distances[node]}</td>*/}
          {/*          ))}*/}
          {/*        </tr>*/}
          {/*        <tr>*/}
          {/*          <td>π</td>*/}
          {/*          {graphData.nodes.map((node) => (*/}
          {/*            <td key={node}>{predecessors[node] === null ? "NIL" : predecessors[node]}</td>*/}
          {/*          ))}*/}
          {/*        </tr>*/}
          {/*        <tr>*/}
          {/*          <td>color</td>*/}
          {/*          {graphData.nodes.map((node) => (*/}
          {/*            <td key={node}>{colors[node]}</td>*/}
          {/*          ))}*/}
          {/*        </tr>*/}
          {/*        <tr>*/}
          {/*          <td>u</td>*/}
          {/*          <td>{currentU !== null ? currentU : ""}</td>*/}
          {/*        </tr>*/}
          {/*      </tbody>*/}
          {/*    </table>*/}
          {/*    <div className={styles.queueWrapper}>*/}
          {/*      <h3>Queue</h3>*/}
          {/*      <ul>*/}
          {/*        {queue.map((node, index) => (*/}
          {/*          <li key={index}>{node}</li>*/}
          {/*        ))}*/}
          {/*      </ul>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      )}
    </>
  );
};

export default BfsPage;
