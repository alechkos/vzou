import styles from "../PseudoCode/PseudoCodeWrapper.module.css";
import { AnimatePresence } from "framer-motion";
import TableRow from "../DFS/TableRow";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { PrimItemObj } from "../../../ClassObjects/Prim/PrimItemObj";

const PrimTable = () => {
  const graphData = useAppSelector((state) => state.prim.graphNodes);
  let Q = useAppSelector((state) => state.prim.Q);
  let S = useAppSelector((state) => state.prim.S);

  console.log(Q);

  return (
    <div className={styles.tableWrapper}>
      <AnimatePresence>
        <div className={"flex justify-around"}>
          <span>{`Q: ${Q.map((node) => node.id)}`}</span>
          <span>{`S: ${S.map((id) => id)}`}</span>
        </div>
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

export default PrimTable;
