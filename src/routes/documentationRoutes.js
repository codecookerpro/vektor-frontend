import React from "react";
import { BookOpen } from "react-feather";

import async from "components/Async";
const Welcome = async(() => import("pages/docs/Welcome"));
const GettingStarted = async(() => import("pages/docs/GettingStarted"));
const EnvironmentVariables = async(() => import("pages/docs/EnvironmentVariables"));
const Deployment = async(() => import("pages/docs/Deployment"));
const Theming = async(() => import("pages/docs/Theming"));
const StateManagement = async(() => import("pages/docs/StateManagement"));
const APICalls = async(() => import("pages/docs/APICalls"));
const ESLintAndPrettier = async(() => import("pages/docs/ESLintAndPrettier"));
const Support = async(() => import("pages/docs/Support"));

const documentationRoutes = Object.freeze({
  id: "Documentation",
  path: "/documentation",
  header: "Material App",
  icon: <BookOpen />,
  children: [
    {
      path: "/documentation/welcome",
      name: "Welcome",
      component: Welcome,
    },
    {
      path: "/documentation/getting-started",
      name: "Getting Started",
      component: GettingStarted,
    },
    {
      path: "/documentation/environment-variables",
      name: "Environment Variables",
      component: EnvironmentVariables,
    },
    {
      path: "/documentation/deployment",
      name: "Deployment",
      component: Deployment,
    },
    {
      path: "/documentation/theming",
      name: "Theming",
      component: Theming,
    },
    {
      path: "/documentation/state-management",
      name: "State Management",
      component: StateManagement,
    },
    {
      path: "/documentation/api-calls",
      name: "API Calls",
      component: APICalls,
    },
    {
      path: "/documentation/eslint-and-prettier",
      name: "ESLint & Prettier",
      component: ESLintAndPrettier,
    },
    {
      path: "/documentation/support",
      name: "Support",
      component: Support,
    },
  ],
  component: null,
});

export default documentationRoutes;
