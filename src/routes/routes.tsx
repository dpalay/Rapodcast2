import { Routes, Route, createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import NoPageFound from "../Components/Router/NoPageFound";

const routes: RouteObject[] = [
  {
    loader: () => {
      console.log("I'll run before every route");
      return null;
    },
    children: [
      {
        path: "/",
        element: <div>Find me in src/routes/routes.tsx. I'm the path "/"</div>,
      },
      {
        path: "/User",
        element: (
          <div>Find me in src/routes/routes.tsx. I'm the path "/User"</div>
        ),
      },
      {
        path: "*",
        element: <NoPageFound />,
        loader: () => {
          console.log("We hit the * route!");
          return null;
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
