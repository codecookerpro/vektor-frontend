import React from "react";
import { Users } from "react-feather";

import async from "components/Async";
const SignIn = async(() => import("pages/auth/SignIn"));
const SignUp = async(() => import("pages/auth/SignUp"));
const ResetPassword = async(() => import("pages/auth/ResetPassword"));
const Page404 = async(() => import("pages/auth/Page404"));
const Page500 = async(() => import("pages/auth/Page500"));

const authRoutes = Object.freeze({
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
});

export default authRoutes;