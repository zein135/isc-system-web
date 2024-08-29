import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  
  // verificar si el usuario esta logeado o no? 
  const isAuthenticated = true; // localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }
  
  return <Outlet />;
}

export default AuthGuard;
