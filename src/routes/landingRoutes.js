import React from "react";
import { Monitor } from "react-feather";

import async from "components/Async";
const Landing = async(() => import("pages/presentation/Landing"));

const landingRoutes = Object.freeze({
  id: "Landing Page",
  path: "/",
  header: "Docs",
  icon: <Monitor />,
  component: Landing,
  children: null,
});

export default landingRoutes;
