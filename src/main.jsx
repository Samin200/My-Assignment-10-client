import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Pages/Root.jsx";

import GetStarted from "./Pages/GetStarted.jsx";
import Home from "./Pages/Home.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import MovieDetails from "./Pages/MovieDetails.jsx";
import AllMovies from "./Pages/AllMovies.jsx";
import Login_SignUp from "./Pages/Login&SignUp.jsx";
import ProfileAndEdit from "./Pages/ProfileAndEdit.jsx";
import PrivateRouter from "./Components/PrivateRouter.jsx";
import MyCollections from "./Pages/MyCollections.jsx";
import PublicRouter from "./Components/PublicRouter.jsx";
import NotFound from "./Pages/NotFound.jsx";
import ErrorBoundary from "./Pages/ErrorBoundary.jsx";
import ManageMovies from "./Pages/ManageMovies.jsx";
import AddMovies from "./Pages/AddMovies.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "/login_signup",
        element: (
          <PublicRouter>
            <Login_SignUp />
          </PublicRouter>
        ),
      },
      { path: "/movies/:id", Component: MovieDetails },
      { path: "/allmovies", Component: AllMovies },
      {
        path: "/profileoredit",
        element: (
          <PrivateRouter>
            <ProfileAndEdit />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-collection",
        element: (
          <PrivateRouter>
            <MyCollections />
          </PrivateRouter>
        ),
      },
      {
        path: "/movies/manage/:id",
        element: (
          <PrivateRouter>
            <ManageMovies></ManageMovies>
          </PrivateRouter>
        ),
      },
      {
        path: "/addmovies",
        element: (
          <PrivateRouter>
            <AddMovies></AddMovies>
          </PrivateRouter>
        ),
      },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "/get-started", Component: GetStarted },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
