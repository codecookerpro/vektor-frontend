import React from "react";
import { Calendar as CalendarIcon } from "react-feather";

import async from "components/Async";
const Calendar = async(() => import("pages/pages/Calendar"));

const calendarRoutes = Object.freeze({
  id: "Calendar",
  path: "/calendar",
  icon: <CalendarIcon />,
  component: Calendar,
  children: null,
});

export default calendarRoutes;
