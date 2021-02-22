import React from "react";
import { CheckSquare } from "react-feather";

import async from "components/Async";
const Tasks = async(() => import("pages/pages/Tasks"));

const tasksRoutes = {
  id: "Tasks",
  path: "/tasks",
  icon: <CheckSquare />,
  badge: "17",
  component: Tasks,
  children: null,
};

export default tasksRoutes;

