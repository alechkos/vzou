import "chart.js/auto";

import { useRef } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";

import { datasetConfig } from "./charts-utils";
import { ChartProps, GetData, GetLabels } from "./interface";


const bar = {
  data: {
    labels: [] as string[],
    datasets: [
      {
        label: "Data",
        ...datasetConfig,
        data: [] as number[],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Bar Chart",
        font: {
          size: 16,
        },
      },
    },
  },
};

function BarChart(props: ChartProps) {
  const chartRef = useRef();
  bar.data.labels = GetLabels(props.items);
  bar.data.datasets[0].data = GetData(props.items);
  bar.options.plugins.title.text = props.title;

  const onClick = (event: any) => {
    const elem = getElementAtEvent(chartRef.current!, event);
    if (elem.length && elem[0].index !== undefined && props.onClick) props.onClick(elem[0].index);
  };
  return (
    <Bar
      id={props.id}
      ref={chartRef}
      onClick={onClick}
      data={bar.data}
      options={bar.options}
    />
  );
}

export default BarChart;
