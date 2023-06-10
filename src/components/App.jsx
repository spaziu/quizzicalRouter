import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layouts/Layout";
import Home from "./Routes/Home";
import Quizz, {
  loader as loaderQuizz,
  action as actionQuizz,
} from "./Routes/Quizz";
import Error from "./Routes/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} errorElement={<Error />} />
      <Route
        path="quizz"
        element={<Quizz />}
        loader={loaderQuizz}
        action={actionQuizz}
        errorElement={<Error />}
      />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
