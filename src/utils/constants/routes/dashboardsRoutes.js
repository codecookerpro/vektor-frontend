import React from "react";
import { Sliders } from "react-feather";

import async from "components/Async";
const Default = async(() => import("pages/dashboards/Default"));
const Analytics = async(() => import("pages/dashboards/Analytics"));
const SaaS = async(() => import("pages/dashboards/SaaS"));

const dashboardsRoutes =  Object.freeze({
  id: "Dashboard",
  path: "/dashboard",
  header: "Pages",
  icon: <Sliders />,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      component: Default,
    },
    {
      path: "/dashboard/analytics",
      name: "Analytics",
      component: Analytics,
    },
    {
      path: "/dashboard/saas",
      name: "SaaS",
      component: SaaS,
    },
  ],
  component: null,
});

export default dashboardsRoutes;