import React from "react";
import { Map } from "react-feather";

import async from "components/Async";
const GoogleMaps = async(() => import("pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("pages/maps/VectorMaps"));

const mapsRoutes = Object.freeze({
  id: "Maps",
  path: "/maps",
  icon: <Map />,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps,
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps,
    },
  ],
  component: null,
});

export default mapsRoutes;
