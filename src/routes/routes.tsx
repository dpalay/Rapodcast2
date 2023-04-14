import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import NoPageFound from "../Components/Router/NoPageFound";
import App from "../App";
import EpisodeList from "../Components/EpisodeList/EpisodeList";




const routes: RouteObject[] = [
  {
    loader: () => {
      console.log("I'll run before every route");
      return null;
    },
    children: [
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
            path: "/Episode",
            element: (
              <EpisodeList />
            ),
            loader: async ({ params }) => {
              console.log(params);
              return null;
            },
          },
          {
            path: "/Episode/:episodeId",
            element: (
              <EpisodeList />
            ),
            loader: async ({ params }) => {
              console.log(params);
              return null;
            },
          },
        ],
      },
      

      {
        path: "*",
        element: <NoPageFound />,
        loader: ({ request }) => {
          console.log(`We hit the * route on the request of ${request.url}`);
          return null;
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
