import React from "react";
import { Briefcase } from "react-feather";

import async from "components/Async";
const Projects = async(() => import("pages/pages/Projects"));

const projectsRoutes = Object.freeze({
  id: "Projects",
  path: "/projects",
  icon: <Briefcase />,
  badge: "8",
  component: Projects,
  children: null,
});

export default projectsRoutes;
