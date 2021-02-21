import React from "react";
import { Layout } from "react-feather";

import async from "components/Async";
const Blank = async(() => import("pages/pages/Blank"));
const Pricing = async(() => import("pages/pages/Pricing"));
const Profile = async(() => import("pages/pages/Profile"));
const Settings = async(() => import("pages/pages/Settings"));
const Chat = async(() => import("pages/pages/Chat"));

const pagesRoutes =  Object.freeze({
  id: "Pages",
  path: "/pages",
  icon: <Layout />,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing,
    },
    {
      path: "/pages/chat",
      name: "Chat",
      component: Chat,
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank,
    },
  ],
  component: null,
});

export default pagesRoutes;