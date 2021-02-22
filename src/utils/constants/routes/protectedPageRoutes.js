import async from "components/Async";
const AuthGuard = async(() => import("components/AuthGuard"));
const ProtectedPage = async(() => import("pages/protected/ProtectedPage"));

const protectedPageRoutes = Object.freeze({
  id: "Private",
  path: "/private",
  component: ProtectedPage,
  children: null,
  guard: AuthGuard,
});

export default protectedPageRoutes;
