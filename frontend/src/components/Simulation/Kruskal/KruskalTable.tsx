import styles from "../PseudoCode/PseudoCodeWrapper.module.css";
import { AnimatePresence } from "framer-motion";
import TableRow from "../DFS/TableRow";
import React from "react";
import { useAppSelector } from "../../../store/hooks";

const KruskalTable = () => {
  const graphData = useAppSelector((state) => state.kruskal.graphNodes);
  let T = useAppSelector((state) => state.kruskal.T);
  let links = useAppSelector((state) => state.kruskal.links);

  return (
    <div className={`${styles.tableWrapper} -mr-60 mt-72 flex flex-row gap-4`}>
      <AnimatePresence>
        <div className={"flex flex-col overflow-auto max-h-[180px]"}>
          <span>Links:</span>
          {links.map((link) => (
            <span>{`(u: ${link.source}, v: ${link.target}, w: ${link.weight!})`}</span>
          ))}
        </div>
        <div className={"flex flex-col overflow-auto max-w-[440px]"}>
          <div className={"m-1 w-max"}>
            <div>
              T:
              {T.map((data) => (
                <span>{`(u: ${data.source}, v: ${data.target}, w: ${data.weight!}), `}</span>
              ))}
            </div>
          </div>
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
                <td>Group</td>
                {graphData.map((node) => (
                  <TableRow
                    key={node.id}
                    rowData={node.nodes.length > 0 ? node.nodes.toString() : "{}"}
                    nodeObj={node}
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default KruskalTable;
