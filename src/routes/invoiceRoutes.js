import React from "react";
import { CreditCard } from "react-feather";

import async from "components/Async";
const InvoiceDetails = async(() => import("pages/pages/InvoiceDetails"));
const InvoiceList = async(() => import("pages/pages/InvoiceList"));

const invoiceRoutes = Object.freeze({
  id: "Invoices",
  path: "/invoices",
  icon: <CreditCard />,
  children: [
    {
      path: "/invoices",
      name: "List",
      component: InvoiceList,
    },
    {
      path: "/invoices/detail",
      name: "Details",
      component: InvoiceDetails,
    },
  ],
  component: null,
});

export default invoiceRoutes;