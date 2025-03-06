import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to="/LoginRegister" />
  );
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
