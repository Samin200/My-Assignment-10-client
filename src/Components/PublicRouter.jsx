import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const PublicRouter = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRouter;