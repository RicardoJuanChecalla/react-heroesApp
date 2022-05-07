import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

export const PublicRoute = ({children}) => {
    const {stateUser} = useContext(AuthContext);
    return stateUser.logged 
      ? <Navigate to="/marvel" />
      : children
};
