import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DjikstraGraphVisualizerProps {
  data: { nodes: number[]; links: { source: number; target: number; weight: number }[] };
  highlightedNode: number | null;
  highlightedLink: { source: number; target: number } | null;
  highlightedTargetNode: number | null;
  colors: { [key: number]: string };
  currentV: number | null;
  isHighlightingNode: boolean;
  currentLine: number;
  currentSRef: React.RefObject<number | null>;
  currentURef: React.RefObject<number | null>;
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: number;
  value: number;
}

const DjikstraGraphVisualizer: React.FC<DjikstraGraphVisualizerProps> = ({
  data,
  highlightedNode,
  highlightedLink,
  highlightedTargetNode,
  colors,
  currentV,
  isHighlightingNode,
  currentLine,
  currentSRef,
  currentURef,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodesDataRef = useRef<GraphNode[]>([]);
  const linksDataRef = useRef<{ source: GraphNode; target: GraphNode; weight: number }[]>([]);

  useEffect(() => {
    if (svgRef.current && data.nodes.length > 0) {
      const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
      svg.selectAll("*").remove(); // Очистка предыдущего графа

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
        weight: d.weight,
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
          .selectAll<SVGLineElement, (typeof linksDataRef.current)[0]>("line")
          .data(linksDataRef.current)
          .join("line")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrow)")
          .attr("x1", (d) => d.source.x!)
          .attr("y1", (d) => d.source.y!)
          .attr("x2", (d) => d.target.x!)
          .attr("y2", (d) => d.target.y!);

        container
          .selectAll<SVGCircleElement, GraphNode>("circle")
          .data(nodesDataRef.current)
          .join("circle")
          .attr("r", radius)
          .attr("fill", (d) => colors[d.id] || "lime")
          .attr("stroke", "#000") // Set stroke to black
          .attr("stroke-width", 1.5)
          .attr("cx", (d) => d.x!)
          .attr("cy", (d) => d.y!);

        container
          .selectAll<SVGTextElement, GraphNode>("text.node-label")
          .data(nodesDataRef.current)
          .join("text")
          .attr("class", "node-label")
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .attr("font-size", "10px")
          .text((d) => d.value.toString())
          .attr("x", (d) => d.x!)
          .attr("y", (d) => d.y!)
          .attr("fill", (d) => (colors[d.id] === "BLACK" ? "white" : "black"));
      });
    }
  }, [data]);

  useEffect(() => {
    if (svgRef.current && nodesDataRef.current.length > 0) {
      const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);

      // Очистка предыдущих меток и стрелок перед добавлением новых
      svg.selectAll(".current-v-label").remove();
      svg.selectAll(".current-v-arrow").remove();

      // Добавление меток и стрелок для текущего узла
      if (currentV !== null && isHighlightingNode) {
        const currentNode = nodesDataRef.current.find((node) => node.id === currentV);
        if (currentNode && currentNode.x !== undefined && currentNode.y !== undefined) {
          svg
            .append("text")
            .attr("class", "current-v-label")
            .attr("x", currentNode.x)
            .attr("y", currentNode.y - 40)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text(`v = ${currentV}`);

          svg
            .append("text")
            .attr("class", "current-v-arrow")
            .attr("x", currentNode.x)
            .attr("y", currentNode.y - 30)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text("↓");
        }
      }
    }
  }, [currentV, isHighlightingNode]);

  useEffect(() => {
    if (svgRef.current && nodesDataRef.current.length > 0) {
      const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);

      // Отображаем `s =` со стрелкой, когда находимся на 4-й строке
      if (currentLine === 4 && currentSRef.current !== null) {
        const currentNode = nodesDataRef.current.find((node) => node.id === currentSRef.current);
        if (currentNode && currentNode.x !== undefined && currentNode.y !== undefined) {
          svg
            .append("text")
            .attr("class", "current-s-label")
            .attr("x", currentNode.x)
            .attr("y", currentNode.y - 40)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text(`s = ${currentSRef.current}`);

          svg
            .append("text")
            .attr("class", "current-s-arrow")
            .attr("x", currentNode.x)
            .attr("y", currentNode.y - 30)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text("↓");

          // Узел остается желтым, пока мы находимся на 4-й строке
          svg
            .selectAll<SVGCircleElement, GraphNode>("circle")
            .filter((d) => d.id === currentSRef.current)
            .attr("fill", "yellow");
        }
      }

      // Если переходим на 5-ю строку, возвращаем цвет узла `s` обратно и удаляем метки
      if (currentLine === 5 && currentSRef.current !== null) {
        svg
          .selectAll<SVGCircleElement, GraphNode>("circle")
          .filter((d) => d.id === currentSRef.current)
          .attr("fill", colors[currentSRef.current!] || "lime");

        svg.selectAll(".current-s-label").remove();
        svg.selectAll(".current-s-arrow").remove();
      }
    }
  }, [currentLine, colors, currentSRef]);

  useEffect(() => {
    if (svgRef.current && nodesDataRef.current.length > 0) {
      const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);

      // Отображаем `s =` со стрелкой, когда находимся на 4-й строке
      if (currentLine === 8 && currentURef.current !== null) {
        const currentNode = nodesDataRef.current.find((node) => node.id === currentURef.current);
        if (currentNode && currentNode.x !== undefined && currentNode.y !== undefined) {
          svg
            .append("text")
            .attr("class", "current-s-label")
            .attr("x", currentNode.x)
            .attr("y", currentNode.y - 40)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text(`u = ${currentURef.current}`);

          svg
            .append("text")
            .attr("class", "current-s-arrow")
            .attr("x", currentNode.x)
            .attr("y", currentNode.y - 30)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text("↓");

          // Узел остается желтым, пока мы находимся на 4-й строке
          svg
            .selectAll<SVGCircleElement, GraphNode>("circle")
            .filter((d) => d.id === currentURef.current)
            .attr("fill", "yellow");
        }
      }

      // Если переходим на 5-ю строку, возвращаем цвет узла `s` обратно и удаляем метки
      if (currentLine === 13 && currentURef.current !== null) {
        svg
          .selectAll<SVGCircleElement, GraphNode>("circle")
          .filter((d) => d.id === currentURef.current)
          .attr("fill", colors[currentURef.current!] || "lime");

        svg.selectAll(".current-s-label").remove();
        svg.selectAll(".current-s-arrow").remove();
      }
    }
  }, [currentLine, colors, currentURef]);

  useEffect(() => {
    if (svgRef.current && nodesDataRef.current.length > 0) {
      const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
      const nodes = svg.selectAll<SVGCircleElement, GraphNode>("circle").data(nodesDataRef.current);
      const texts = svg
        .selectAll<SVGTextElement, GraphNode>("text.node-label")
        .data(nodesDataRef.current);
      const links = svg
        .selectAll<SVGLineElement, (typeof linksDataRef.current)[0]>("line")
        .data(linksDataRef.current);

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
  useEffect(() => {
    if (svgRef.current && data.nodes.length > 0) {
      const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
      svg.selectAll("*").remove(); // Очистка предыдущего графа

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
        weight: d.weight,
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
        // Draw the links (edges)
        container
          .selectAll<SVGLineElement, (typeof linksDataRef.current)[0]>("line")
          .data(linksDataRef.current)
          .join("line")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrow)")
          .attr("x1", (d) => d.source.x!)
          .attr("y1", (d) => d.source.y!)
          .attr("x2", (d) => d.target.x!)
          .attr("y2", (d) => d.target.y!);

        // Add edge weight labels
        container
          .selectAll<SVGTextElement, (typeof linksDataRef.current)[0]>("text.link-label")
          .data(linksDataRef.current)
          .join("text")
          .attr("class", "link-label")
          .attr("font-size", "10px")
          .attr("fill", "#000")
          .attr("dy", -5) // Offset the text above the edge
          .attr("x", (d) => (d.source.x! + d.target.x!) / 2) // Position at the midpoint
          .attr("y", (d) => (d.source.y! + d.target.y!) / 2) // Position at the midpoint
          .text((d) => d.weight); // Display the weight

        // Draw the nodes (vertices)
        container
          .selectAll<SVGCircleElement, GraphNode>("circle")
          .data(nodesDataRef.current)
          .join("circle")
          .attr("r", radius)
          .attr("fill", (d) => colors[d.id] || "lime")
          .attr("stroke", "#000")
          .attr("stroke-width", 1.5)
          .attr("cx", (d) => d.x!)
          .attr("cy", (d) => d.y!);

        // Add node labels
        container
          .selectAll<SVGTextElement, GraphNode>("text.node-label")
          .data(nodesDataRef.current)
          .join("text")
          .attr("class", "node-label")
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .attr("font-size", "10px")
          .text((d) => d.value.toString())
          .attr("x", (d) => d.x!)
          .attr("y", (d) => d.y!)
          .attr("fill", (d) => (colors[d.id] === "BLACK" ? "white" : "black"));
      });
    }
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width={1200}
      height={600}
      style={{ overflow: "visible" }}
    ></svg>
  );
};

export default DjikstraGraphVisualizer;
