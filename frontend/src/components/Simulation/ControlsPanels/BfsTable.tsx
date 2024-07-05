import React, { FC } from "react";

interface BfsTableProps {
  nodes: number[];
  distances: { [key: number]: number };
  predecessors: { [key: number]: number | null };
  colors: { [key: number]: string };
}

const BfsTable: FC<BfsTableProps> = ({ nodes, distances, predecessors, colors }) => {
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
        <tr>
          <td>C</td>
          {nodes.map((node) => (
            <td key={node}>{colors[node]}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default BfsTable;
