/**
 * Componente principale per la pagina di login e registrazione.
 * Utilizza uno stato interno per determinare se mostrare il modulo di login o quello di registrazione.
 *
 * @component
 * @returns {JSX.Element} La pagina di login e registrazione.
 */
import { useState } from "react";
import LoginCard from "../../components/LoginRegisterCard/LoginCard";
import RegisterCard from "../../components/LoginRegisterCard/RegisterCard";
import HeaderSwitch from "../../components/HeaderSwitch/HeaderSwitch";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <>
      <HeaderSwitch />
      {isLogin ? (
        <LoginCard switchToRegister={switchToRegister} />
      ) : (
        <RegisterCard switchToLogin={switchToLogin} />
      )}
    </>
  );
};

export default LoginRegisterPage;
