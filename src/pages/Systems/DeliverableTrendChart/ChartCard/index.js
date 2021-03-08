import React, { memo } from "react";
import { Card, CardHeader, CardContent, IconButton } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { MoreVertical } from "react-feather";
import { Line } from "react-chartjs-2";

import theme from "theme";

const data = (canvas) => {
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, fade(theme.palette.secondary.main, 0.0875));
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales ($)",
        fill: true,
        backgroundColor: gradient,
        borderColor: theme.palette.secondary.main,
        data: [
          2115,
          1562,
          1584,
          1892,
          1587,
          1923,
          2566,
          2448,
          2805,
          3438,
          2917,
          3327,
        ],
      },
      {
        label: "Orders",
        fill: true,
        backgroundColor: "transparent",
        borderColor: theme.custom.palette.lightGreen,
        data: [
          958,
          724,
          629,
          883,
          915,
          1214,
          1476,
          1212,
          1554,
          2128,
          1466,
          1827,
        ],
      },
    ],
  };
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    intersect: false,
  },
  hover: {
    intersect: true,
  },
  plugins: {
    filler: {
      propagate: false,
    },
  },
  scales: {
    xAxes: [
      {
        reverse: true,
        gridLines: {
          color: "rgba(0,0,0,0.0)",
        },
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          stepSize: 500,
          fontColor: theme.palette.text.secondary,
        },
        display: true,
        borderDash: [5, 5],
        gridLines: {
          color: "rgba(0,0,0,0.0375)",
          fontColor: "#fff",
        },
      },
    ],
  },
};

const ChartCard = () => {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title="Deliverable Trend Chart"
      />
      <CardContent>
        <div>
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(ChartCard);
