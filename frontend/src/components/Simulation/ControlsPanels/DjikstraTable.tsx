import React, { FC } from "react";

interface DjikstraTableProps {
  nodes: number[];
  distances: { [key: number]: number };
  predecessors: { [key: number]: number | null };
}

const DjikstraTable: FC<DjikstraTableProps> = ({ nodes, distances, predecessors }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Node</th>
          {nodes.map((node) => (
            <th key={node}>{node}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>d</td>
          {nodes.map((node) => (
            <td key={node}>{distances[node]}</td>
          ))}
        </tr>
        <tr>
          <td>П</td>
          {nodes.map((node) => (
            <td key={node}>{predecessors[node]}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default DjikstraTable;
