import React from "react";
import { ShoppingCart } from "react-feather";

import async from "components/Async";
const Orders = async(() => import("pages/pages/Orders"));

const orderRoutes = Object.freeze({
  id: "Orders",
  path: "/orders",
  icon: <ShoppingCart />,
  component: Orders,
  children: null,
});

export default orderRoutes;
