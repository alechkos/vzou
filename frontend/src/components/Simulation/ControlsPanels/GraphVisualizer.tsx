import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface GraphVisualizerProps {
  data: { nodes: number[]; links: { source: number; target: number }[] };
  highlightedNode: number | null;
  highlightedLink: { source: number; target: number } | null;
  highlightedTargetNode: number | null;
  colors: { [key: number]: string };
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: number;
  value: number;
}

//this page for visualisation of bfs graph
const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  data,
  highlightedNode,
  highlightedLink,
  highlightedTargetNode,
  colors,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodesDataRef = useRef<GraphNode[]>([]);
  const linksDataRef = useRef<{ source: GraphNode; target: GraphNode }[]>([]);

  useEffect(() => {
    if (svgRef.current && data.nodes.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // clean previous graph

      const width = 1200;
      const height = 600;
      const radius = 20;

      const container = svg.append("g");

      nodesDataRef.current = data.nodes.map((d) => ({
        id: d,
        value: d,
        x: width / 2 + 200 + Math.random() * 100 - 50,
        y: height / 2 + Math.random() * 100 - 50,
      }));

      const simulation = d3
        .forceSimulation<GraphNode>(nodesDataRef.current)
        .force(
          "link",
          d3
            .forceLink<GraphNode, d3.SimulationLinkDatum<GraphNode>>()
            .id((d) => d.id.toString())
            .distance(50)
        )
        .force("charge", d3.forceManyBody<GraphNode>().strength(-200))
        .force("center", d3.forceCenter(width / 2 + 200, height / 2));

      linksDataRef.current = data.links.map((d) => ({
        source: nodesDataRef.current.find((node) => node.id === d.source)!,
        target: nodesDataRef.current.find((node) => node.id === d.target)!,
      }));

      container
        .append("defs")
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 30)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#999");

      svg.call(
        d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
          container.attr("transform", event.transform);
        })
      );

      simulation.on("tick", () => {
        container
          .selectAll("line")
          .data(linksDataRef.current)
          .join("line")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrow)")
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);

        container
          .selectAll("circle")
          .data(nodesDataRef.current)
          .join("circle")
          .attr("r", radius)
          .attr("fill", (d) => colors[d.id] || "lime")
          .attr("stroke", "#000") // Set stroke to black
          .attr("stroke-width", 1.5)
          .attr("cx", (d: any) => d.x)
          .attr("cy", (d: any) => d.y);

        container
          .selectAll("text")
          .data(nodesDataRef.current)
          .join("text")
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .attr("font-size", "10px")
          .text((d) => d.value.toString())
          .attr("x", (d: any) => d.x)
          .attr("y", (d: any) => d.y)
          .attr("fill", (d) => (colors[d.id] === "BLACK" ? "white" : "black"));
      });
    }
  }, [data]);

  useEffect(() => {
    if (svgRef.current && nodesDataRef.current.length > 0) {
      const svg = d3.select(svgRef.current);
      const nodes = svg.selectAll("circle").data(nodesDataRef.current);
      const texts = svg.selectAll("text").data(nodesDataRef.current);
      const links = svg.selectAll("line").data(linksDataRef.current);

      nodes
        .transition()
        .duration(500)
        .attr("fill", (d) => colors[d.id] || "lime");

      texts
        .transition()
        .duration(500)
        .attr("fill", (d) => (colors[d.id] === "BLACK" ? "white" : "black"));

      links
        .transition()
        .duration(500)
        .attr("stroke", (d) =>
          highlightedLink &&
          d.source.id === highlightedLink.source &&
          d.target.id === highlightedLink.target
            ? "red"
            : "#999"
        );
    }
  }, [colors, highlightedLink]);

  return (
    <svg
      ref={svgRef}
      width={1200}
      height={600}
      style={{ overflow: "visible" }}
    ></svg>
  );
};

export default GraphVisualizer;
