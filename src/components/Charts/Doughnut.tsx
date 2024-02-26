import "chart.js/auto";

import { Doughnut } from "react-chartjs-2";

import { ChartProps, GetData, GetLabels } from "./interface";
/*
Props: title, array of objects, each object is {key:"category",value:amount}
for example:
    items=[{key:"Female",value:40},{key:"Male",value:60}] title={"GENDER"}
the component will convert the items to:
    const data = {
        labels: ['Male', 'Female'],
        datasets: [{
            data: [40,60], //in the same order of the lables!
        }],
    }
and display the chart
*/

function DoughnutChart(props: ChartProps) {
  const labels = GetLabels(props.items);
  const data = GetData(props.items);

  return (
    <div>
      <Doughnut
        data={{
          labels,
          datasets: [{ data, backgroundColor: [ "#fda4af", "#a3e635" ] }],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: props.title,
              font: {
                size: 16,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DoughnutChart;
