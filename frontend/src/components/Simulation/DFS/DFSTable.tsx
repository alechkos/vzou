import React, { FC } from "react";
import styles from "../PseudoCode/PseudoCodeWrapper.module.css";
import { DFSNode } from "../../../ClassObjects/DFS/DFSNode";

interface Props {
  graphData: DFSNode[];
}

const DFSTable: FC<Props> = ({ graphData }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Node</th>
            {graphData.map((node) => (
              <th key={node.id}> {node.id}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>π</td>
            {graphData.map((node) => (
              <td key={node.id}>{node.pi ? node.pi.id : "-∞"}</td>
            ))}
          </tr>
          <tr>
            <td>d</td>
            {graphData.map((node) => (
              <td key={node.id}>{node.d}</td>
            ))}
          </tr>
          <tr>
            <td>f</td>
            {graphData.map((node) => (
              <td key={node.id}>{node.f}</td>
            ))}
          </tr>
          <tr>
            <td>color</td>
            {graphData.map((node) => (
              <td key={node.id}>{node.color}</td>
            ))}
          </tr>
          <tr>
            <td>u</td>
            {/*<td>{currentU !== null ? currentU : ""}</td>*/}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DFSTable;
