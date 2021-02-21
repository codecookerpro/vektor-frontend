import React from "react";
import { List } from "react-feather";

import async from "components/Async";
const Changelog = async(() => import("pages/docs/Changelog"));

const changelogRoutes = Object.freeze({
  id: "Changelog",
  path: "/changelog",
  badge: "v2.0.0",
  icon: <List />,
  component: Changelog,
  children: null,
});

export default changelogRoutes;