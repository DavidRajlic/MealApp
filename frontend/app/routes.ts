import { type RouteConfig, index } from "@react-router/dev/routes";

const routes: RouteConfig = [
  // `/`
  index("routes/home.tsx"),

  // `/about`
  { path: "about", file: "routes/about.tsx" },

  // `/login`
  { path: "login", file: "routes/login.tsx" },
];

export default routes;