import React from "react";
import { List } from "react-feather";

import async from "components/Async";
const SimpleTable = async(() => import("pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("pages/tables/AdvancedTable"));
const DataGrid = async(() => import("pages/tables/DataGrid"));

const tablesRoutes = {
  id: "Tables",
  path: "/tables",
  icon: <List />,
  children: [
    {
      path: "/tables/simple-table",
      name: "Simple Table",
      component: SimpleTable,
    },
    {
      path: "/tables/advanced-table",
      name: "Advanced Table",
      component: AdvancedTable,
    },
    {
      path: "/tables/data-grid",
      name: "Data Grid",
      component: DataGrid,
    },
  ],
  component: null,
};

export default tablesRoutes;
