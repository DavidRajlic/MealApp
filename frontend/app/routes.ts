import { type RouteConfig, index } from "@react-router/dev/routes";

const routes: RouteConfig = [
    index("routes/home.tsx"),
    {
      path: "about",
      file: "routes/about.tsx",
    },
  ];
  
  export default routes;