import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useUser();
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
