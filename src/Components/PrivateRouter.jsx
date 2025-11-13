import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";

const PrivateRouter = ({ children }) => {
  const { user, checkingAuth } = useContext(AuthContext);
  const location = useLocation();

  if (checkingAuth) {
    
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login_signup" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRouter;