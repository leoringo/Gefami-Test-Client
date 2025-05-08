import React, { useState } from "react";
import {
  FormContainer,
  HeaderContainer,
  InputContainer,
  StyledButton,
} from "../style/style";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  closePopUpError,
  closeSuccessRegister,
  executeRegister,
  selectLoginState,
  switchPage,
} from "../loginSlice";

import TextStyle from "../../../components/TextStyle";
import InputText from "../../../components/InputText";
import PopupDialog from "../../../components/Popup";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Colors from "../../../constant/colors";
import type { IRegisterRequest } from "../../../api/loginService/requestModel";

interface RegisterSectionProps {}

const RegisterSection: React.FC<RegisterSectionProps> = () => {
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector(selectLoginState);
  const initialPayloadConstant: IRegisterRequest = {
    username: "",
    password: "",
    address: "",
  };

  const [payload, setPayload] = useState<IRegisterRequest>(
    initialPayloadConstant
  );
  const [errors, setErrors] = useState<IRegisterRequest>(
    initialPayloadConstant
  );
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onClickSwitchPage = () => {
    dispatch(switchPage("login"));
    setPayload(initialPayloadConstant);
    setErrors(initialPayloadConstant);
    setShowPassword(false);
  };

  const validate = () => {
    const newErrors: IRegisterRequest = initialPayloadConstant;
    const { address, password, username } = payload;

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (!address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(executeRegister(payload));
    }
  };

  return (
    <FormContainer>
      <HeaderContainer>
        <TextStyle variant="custom" customSize={"60px"} marginTop={2}>
          Hello new user!
        </TextStyle>
      </HeaderContainer>
      <InputContainer onSubmit={handleSubmit}>
        {/* -- Username -- */}
        <InputText
          label="Username"
          id="outlined-multiline-static"
          value={payload.username}
          onChange={(e) =>
            setPayload((prevValue) => ({
              ...prevValue,
              username: e.target.value,
            }))
          }
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
        {/* -- Password -- */}
        <InputText
          label="Password"
          id="outlined-password-input"
          type={showPassword ? "text" : "password"}
          value={payload.password}
          onChange={(e) => setPayload((prevValue) => ({
            ...prevValue,
            password: e.target.value,
          }))}
          endIcon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          onEndIconClick={togglePasswordVisibility}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        {/* -- Address -- */}
        <InputText
          label="Address"
          id="outlined-multiline-static"
          value={payload.address}
          onChange={(e) => setPayload((prevValue) => ({
            ...prevValue,
            address: e.target.value,
          }))}
          error={Boolean(errors.username)}
          helperText={errors.username}
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
          Already have an account?{" "}
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
      <PopupDialog
        open={status === "success"}
        type="success"
        title="Hooray!"
        description='Successfully Registered!'
        onClose={() => dispatch(closeSuccessRegister())}
      />
    </FormContainer>
  );
};

export default RegisterSection;
