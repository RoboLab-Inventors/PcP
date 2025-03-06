/**
 * Componente di rotta protetta che controlla se l'utente è autenticato.
 * Se l'utente è autenticato (presenza di un token nel localStorage), 
 * rende i componenti figli. Altrimenti, reindirizza alla pagina di login/registrazione.
 *
 * @component
 * @param {Object} props - Le proprietà passate al componente.
 * @param {React.ReactNode} props.children - I componenti figli da rendere se l'utente è autenticato.
 * @returns {React.ReactNode} I componenti figli o il componente di navigazione per il login/registrazione.
 */
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
