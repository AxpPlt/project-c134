import { createBrowserRouter } from "react-router-dom";
import { MainPage, NoLogin, SettingsPage, ErrorPage } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <NoLogin></NoLogin>,
    errorElement: <ErrorPage></ErrorPage>,
    // children: [
    //   {
    //     path: "/items",
    //     element: <ItemsPage></ItemsPage>,
    //     children: [
    //       {
    //         path: "allitems",
    //         element: <MainItemPage></MainItemPage>,
    //       },
    //       {
    //         path: "creater-item",
    //         element: <CreateItemPage></CreateItemPage>,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    path: "/main",
    element: (
      <ProtectedRoute>
        <MainPage></MainPage>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "settings",
        element: <SettingsPage></SettingsPage>,
        children: [
          {
            path: "settings-cards",
            element: <SettingsPage></SettingsPage>,
          },
        ],
      },
    ],
  },
]);

export default router;
