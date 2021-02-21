import React from "react";
import { Heart } from "react-feather";

import async from "components/Async";
const MaterialIcons = async(() => import("pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("pages/icons/FeatherIcons"));

const iconsRoutes = Object.freeze({
  id: "Icons",
  path: "/icons",
  icon: <Heart />,
  children: [
    {
      path: "/icons/material-icons",
      name: "Material Icons",
      component: MaterialIcons,
    },
    {
      path: "/icons/feather-icons",
      name: "Feather Icons",
      component: FeatherIcons,
    },
  ],
  component: null,
});

export default iconsRoutes;