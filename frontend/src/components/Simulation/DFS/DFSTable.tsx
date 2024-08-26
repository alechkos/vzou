import React, { FC } from "react";
import styles from "../PseudoCode/PseudoCodeWrapper.module.css";
import { AnimatePresence } from "framer-motion";
import { DFSItemObj } from "../../../ClassObjects/DFS/DFSItemObj";
import { useAppSelector } from "../../../store/hooks";
import TableRow from "./TableRow";

interface Props {
  graphData: DFSItemObj[];
}

const DFSTable: FC = () => {
  const graphData = useAppSelector((state) => state.dfs.graphNodes);

  return (
    <div className={`${styles.tableWrapper} overflow-auto max-w-[480px] mr-2`}>
      <AnimatePresence>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Node</th>
              {graphData.map((node) => (
                <TableRow
                  key={node.id}
                  rowData={node.id}
                  nodeObj={node}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>π</td>
              {graphData.map((node) => (
                <TableRow
                  key={node.id}
                  rowData={node.pi !== -1 ? node.pi : "-∞"}
                  nodeObj={node}
                />
              ))}
            </tr>
            <tr>
              <td>d</td>
              {graphData.map((node) => (
                <TableRow
                  key={node.id}
                  rowData={node.d}
                  nodeObj={node}
                />
              ))}
            </tr>
            <tr>
              <td>f</td>
              {graphData.map((node) => (
                <TableRow
                  key={node.id}
                  rowData={node.f}
                  nodeObj={node}
                />
              ))}
            </tr>
            <tr>
              <td>color</td>
              {graphData.map((node) => (
                <TableRow
                  key={node.id}
                  rowData={node.color}
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

export default DFSTable;
