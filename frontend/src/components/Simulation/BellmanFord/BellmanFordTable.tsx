import styles from "../PseudoCode/PseudoCodeWrapper.module.css";
import { AnimatePresence } from "framer-motion";
import TableRow from "../DFS/TableRow";
import React from "react";
import { useAppSelector } from "../../../store/hooks";

const BellmanFordTable = () => {
  const graphData = useAppSelector((state) => state.bellmanFord.graphNodes);

  return (
    <div className={styles.tableWrapper}>
      <AnimatePresence>
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
                <TableRow
                  key={node.id}
                  rowData={node.pi !== -1 ? node.pi : "NIL"}
                  nodeObj={node}
                />
              ))}
            </tr>
            <tr>
              <td>d</td>
              {graphData.map((node) => (
                <TableRow
                  key={node.id}
                  rowData={node.d !== -1 ? node.d : "-∞"}
                  nodeObj={node}
                />
              ))}
            </tr>
          </tbody>
        </table>
      </AnimatePresence>
    </div>
  );
};

export default BellmanFordTable;
