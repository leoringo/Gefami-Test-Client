import type React from "react";

import LoginSection from "./__components/login";
import RegisterSection from "./__components/register";
import GlobalLoading from "../loading";

import { LoginContainer } from "./style/style";
import { useAppSelector } from "../../store/store";
import { selectLoginState } from "./loginSlice";

const Login: React.FC = () => {
  const { page } = useAppSelector(selectLoginState);

  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginSection />;
      default:
        return <RegisterSection />;
    }
  };

  return (
    <LoginContainer>
      <GlobalLoading />
      {renderPage()}
    </LoginContainer>
  );
};

export default Login;
