import React from "react";
import ReactECharts from "echarts-for-react";
export default function BarChart({ packageData }) {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    color: ["red", "green"],
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "center",
          formatter: "{d}%\nRs. {c}",
        },

        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },

        data: [
          {
            value: packageData
              .filter((item) => item.delivery_type === "int")
              .reduce((acc, item) => acc + item.rate, 0),
            name: "International",
          },
          {
            value: packageData
              .filter((item) => item.delivery_type === "dom")
              .reduce((acc, item) => acc + item.rate, 0),
            name: "Domestic",
          },
        ],
        // color: ["#ff0000", "#00ff00", "#0000ff"],
      },
    ],
  };
  return (
    <div>
      <ReactECharts
        style={{ width: "100%", height: "400px" }}
        option={option}
      />
    </div>
  );
}
