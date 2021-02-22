import React from "react";
import { Grid } from "react-feather";

import async from "components/Async";
const Alerts = async(() => import("pages/components/Alerts"));
const Avatars = async(() => import("pages/components/Avatars"));
const Badges = async(() => import("pages/components/Badges"));
const Buttons = async(() => import("pages/components/Buttons"));
const Cards = async(() => import("pages/components/Cards"));
const Chips = async(() => import("pages/components/Chips"));
const Dialogs = async(() => import("pages/components/Dialogs"));
const ExpPanels = async(() => import("pages/components/ExpansionPanels"));
const Lists = async(() => import("pages/components/Lists"));
const Menus = async(() => import("pages/components/Menus"));
const Pagination = async(() => import("pages/components/Pagination"));
const Progress = async(() => import("pages/components/Progress"));
const Snackbars = async(() => import("pages/components/Snackbars"));
const Tooltips = async(() => import("pages/components/Tooltips"));

const componentsRoutes = Object.freeze({
  id: "Components",
  path: "/components",
  header: "Elements",
  icon: <Grid />,
  children: [
    {
      path: "/components/alerts",
      name: "Alerts",
      component: Alerts,
    },
    {
      path: "/components/avatars",
      name: "Avatars",
      component: Avatars,
    },
    {
      path: "/components/badges",
      name: "Badges",
      component: Badges,
    },
    {
      path: "/components/buttons",
      name: "Buttons",
      component: Buttons,
    },
    {
      path: "/components/cards",
      name: "Cards",
      component: Cards,
    },
    {
      path: "/components/chips",
      name: "Chips",
      component: Chips,
    },
    {
      path: "/components/dialogs",
      name: "Dialogs",
      component: Dialogs,
    },
    {
      path: "/components/expansion-panels",
      name: "Expansion Panels",
      component: ExpPanels,
    },
    {
      path: "/components/lists",
      name: "Lists",
      component: Lists,
    },
    {
      path: "/components/menus",
      name: "Menus",
      component: Menus,
    },
    {
      path: "/components/pagination",
      name: "Pagination",
      component: Pagination,
    },
    {
      path: "/components/progress",
      name: "Progress",
      component: Progress,
    },
    {
      path: "/components/snackbars",
      name: "Snackbars",
      component: Snackbars,
    },
    {
      path: "/components/tooltips",
      name: "Tooltips",
      component: Tooltips,
    },
  ],
  component: null,
});

export default componentsRoutes;
