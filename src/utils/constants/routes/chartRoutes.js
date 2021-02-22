import React from "react";
import { PieChart } from "react-feather";

import async from "components/Async";
const Chartjs = async(() => import("pages/charts/Chartjs"));

const chartRoutes = Object.freeze({
  id: "Charts",
  path: "/charts",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
});

export default chartRoutes;
