import React from "react";
import { CheckSquare } from "react-feather";

import async from "components/Async";
const Pickers = async(() => import("pages/forms/Pickers"));
const SelectionCtrls = async(() => import("pages/forms/SelectionControls"));
const Selects = async(() => import("pages/forms/Selects"));
const TextFields = async(() => import("pages/forms/TextFields"));
const Dropzone = async(() => import("pages/forms/Dropzone"));
const Editors = async(() => import("pages/forms/Editors"));
const Formik = async(() => import("pages/forms/Formik"));

const formsRoutes =  Object.freeze({
  id: "Forms",
  path: "/forms",
  icon: <CheckSquare />,
  children: [
    {
      path: "/forms/pickers",
      name: "Pickers",
      component: Pickers,
    },
    {
      path: "/forms/selection-controls",
      name: "Selection Controls",
      component: SelectionCtrls,
    },
    {
      path: "/forms/selects",
      name: "Selects",
      component: Selects,
    },
    {
      path: "/forms/text-fields",
      name: "Text Fields",
      component: TextFields,
    },
    {
      path: "/forms/dropzone",
      name: "Dropzone",
      component: Dropzone,
    },
    {
      path: "/forms/editors",
      name: "Editors",
      component: Editors,
    },
    {
      path: "/forms/formik",
      name: "Formik",
      component: Formik,
    },
  ],
  component: null,
});

export default formsRoutes;
