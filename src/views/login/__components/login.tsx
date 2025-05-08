import React, { useEffect, useState } from "react";
import {
  FormContainer,
  HeaderContainer,
  InputContainer,
  StyledButton,
} from "../style/style";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  closePopUpError,
  executeLogin,
  selectLoginState,
  switchPage,
} from "../loginSlice";

import TextStyle from "../../../components/TextStyle";
import InputText from "../../../components/InputText";
import PopupDialog from "../../../components/Popup";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Colors from "../../../constant/colors";
import { useNavigate } from "react-router-dom";

interface LoginSectionProps {}

const LoginSection: React.FC<LoginSectionProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, message } = useAppSelector(selectLoginState);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onClickSwitchPage = () => {
    dispatch(switchPage("register"));
    setUsername("");
    setPassword("");
    setErrors({ username: "", password: "" });
    setShowPassword(false);
  };

  const validate = () => {
    const newErrors: { username: string; password: string } = {
      username: "",
      password: "",
    };

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(executeLogin({ username, password }));
    }
  };

  useEffect(() => {
    if(status === 'success') {
      navigate('/')
    }
  }, [status])

  return (
    <FormContainer>
      <HeaderContainer>
        <TextStyle variant="custom" customSize={"60px"} marginTop={2}>
          Login
        </TextStyle>
      </HeaderContainer>
      <InputContainer onSubmit={handleSubmit}>
        {/* -- Username -- */}
        <InputText
          label="Username"
          id="outlined-multiline-static"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
        {/* -- Password -- */}
        <InputText
          label="Password"
          id="outlined-password-input"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endIcon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          onEndIconClick={togglePasswordVisibility}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            background: Colors.teal.default,
          }}
        >
          Login
        </StyledButton>
        <TextStyle variant="h6" align="center">
          Doesn't have account?{" "}
          <span
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onClickSwitchPage}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#1565c0")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#1976d2")
            }
          >
            Click Here
          </span>
        </TextStyle>
      </InputContainer>

      <PopupDialog
        open={status === "failed"}
        type="error"
        title="Ooops!"
        description={message}
        onClose={() => dispatch(closePopUpError())}
      />
    </FormContainer>
  );
};

export default LoginSection;
