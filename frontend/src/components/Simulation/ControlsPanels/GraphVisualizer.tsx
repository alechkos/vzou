import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useDispatch } from "react-redux";
import { GraphNode, GraphVisualizerProps } from "../../../types/GraphTypes";
import { useAppSelector } from "../../../store/hooks";

const GraphVisualizer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dispatch = useDispatch();
  const data = useAppSelector((state) => state.dfs.graphData);

  //size of our nodes
  const width = 1200;
  const height = 600;
  const radius = 20;

  // change type to GraphNode
  let nodesData: GraphNode[] = [];
  const { nodes } = data;

  useEffect(() => {
    nodesData = data.nodes.map((d, i) => ({
      id: d,
      value: d,
      x: width / 2 + 200 + Math.random() * 100 - 50,
      y: height / 2 + Math.random() * 100 - 50,
    }));
  }, [nodes]);

  useEffect(() => {
    if (svgRef.current && data.nodes.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // clean previous graph

      //this is will allow to scale graph
      const container = svg.append("g");

      let pointerData: GraphNode[] = [];
      if (data.pointer) {
        const node = nodesData.find((node) => node.id === data.pointer);
        if (node !== undefined) {
          pointerData = [
            {
              id: node.id,
              value: node.value,
              x: node.x,
              y: node.y,
            },
          ];
        }
      }

      // creating simulation of graph
      const simulation = d3
        .forceSimulation<GraphNode>(nodesData)
        .force(
          "link",
          d3
            .forceLink<GraphNode, d3.SimulationLinkDatum<GraphNode>>()
            .id((d) => d.id.toString())
            .distance(50) //distance between nodes
        )
        .force("charge", d3.forceManyBody<GraphNode>().strength(-200))
        .force("center", d3.forceCenter(width / 2 + 200, height / 2)); //forces attraction of nodes to the center

      // creating links
      const links = data.links.map((d) => ({
        source: nodesData.find((node) => node.id === d.source)!,
        target: nodesData.find((node) => node.id === d.target)!,
      }));

      //creating svg elements for links
      const link = container
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)");

      //creating svg elements for nodes
      const node = container
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodesData)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("fill", "lime")
        .attr("stroke", "black") // Set the border color here
        .attr("stroke-width", 2); // Set the border width here

      const text = container
        .append("g")
        .selectAll("text")
        .data(nodesData)
        .enter()
        .append("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text((d) => d.value.toString());

      const node2 = container
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(pointerData)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("fill", "gray");

      const text2 = container
        .append("g")
        .selectAll("text")
        .data(pointerData)
        .enter()
        .append("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text("X");

      //addition arrows
      svg
        .append("defs")
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 30) //settings for visible arrow
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5") //shape of arrow
        .attr("fill", "#999"); //color of fill

      svg.call(
        d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
          container.attr("transform", event.transform);
        })
      );

      simulation.on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);

        node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

        node2.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

        text.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);

        text2.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
      });
    }
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width={800}
      height={600}
      style={{ overflow: "visible" }}
    ></svg>
  );
};

export default GraphVisualizer;
