import { useState } from "react";
import LoginCard from "../../components/LoginRegisterCard/LoginCard";
import RegisterCard from "../../components/LoginRegisterCard/RegisterCard";
import HeaderSwitch from "../../components/HeaderSwitch/HeaderSwitch";
import "./LoginRegisterPage.css";

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
