import React from "react";
import { useRouteError, NavLink } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <>
      <h1 className="text-2xl font-medium">
        Error{error?.name && ":"} {error?.name}
      </h1>
      <p>{error?.message}</p>
      <NavLink to="/" className=" btn-primary">
        Back to Home page
      </NavLink>
    </>
  );
}
