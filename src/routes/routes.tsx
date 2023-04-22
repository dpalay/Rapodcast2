import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import NoPageFound from "../Components/Router/NoPageFound";
import App from "../App";
import EpisodeList from "../Components/EpisodeList/EpisodeList";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/User",
        element: (
          <div>Find me in src/routes/routes.tsx. I'm the path "/User"</div>
        ),
      },

      {
        path: "/Episode/:episodeId",
        element: <EpisodeList />,
      },
    ],
  },

  {
    path: "*",
    element: <NoPageFound />,
  },
];

export const router = createBrowserRouter(routes);
