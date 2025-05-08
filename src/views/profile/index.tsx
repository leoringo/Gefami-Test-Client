import { useState } from "react";
import type React from "react";

import { BoxButton, BoxContainer, UserInformationContainer } from "./style";
import { useAppDispatch, useAppSelector } from "../../store/store";

import Colors from "../../constant/colors";
import InputText from "../../components/InputText";
import CustomButton from "../../components/CustomButton";
import TextStyle from "../../components/TextStyle";
import PopupDialog from "../../components/Popup";
import {
  closePopUpSuccessEdit,
  executeEditProfile,
  selectProfileState,
} from "./profileSlice";

const ProfilePage: React.FC = () => {
  const initialAddress = localStorage.getItem("address");
  const username = localStorage.getItem("username");
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector(selectProfileState);

  // !! -- useStates
  const [openConfirmationPopUp, setOpenConfirmationPopUp] =
    useState<boolean>(false);
  const [address, setAddres] = useState<string>(initialAddress ?? "");
  const [error, setError] = useState<string>("");

  // !! -- functions
  const validate = () => {
    let newError: string = "";

    if (!address) newError = "Address is required!";

    setError(newError);

    return !newError;
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setOpenConfirmationPopUp(true);
    }
  };

  const executeEdit = () => {
    localStorage.setItem("address", address);
    setOpenConfirmationPopUp(false);
    dispatch(executeEditProfile({ address }));
  };

  return (
    <BoxContainer>
      <TextStyle variant="h1" align="center">
        User Profile
      </TextStyle>
      <UserInformationContainer onSubmit={handleSubmitForm}>
        {/* -- Username -- */}
        <InputText
          label="Username"
          id="outlined-multiline-static"
          value={username}
          disabled
        />
        {/* -- Address -- */}
        <InputText
          label="Address"
          id="outlined-multiline-static"
          value={address}
          error={Boolean(address)}
          helperText={error}
          onChange={(e) => setAddres(e.target.value)}
        />
        <BoxButton>
          <CustomButton
            variant="outlined"
            onClick={() => setAddres(initialAddress ?? "")}
            sx={{
              width: "100px",
              borderColor: Colors.red.dark,
              color: Colors.teal.dark,
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="submit"
            variant="contained"
            sx={{ width: "100px", background: Colors.teal.dark }}
          >
            Edit
          </CustomButton>
        </BoxButton>
      </UserInformationContainer>
      <PopupDialog
        open={openConfirmationPopUp}
        type="action"
        title="Wait!"
        description="Are you sure want to edit data?"
        onClose={() => setOpenConfirmationPopUp(false)}
        onConfirm={executeEdit}
      />
      <PopupDialog
        open={status === "success"}
        type="success"
        title="Success!"
        description={message}
        onClose={() => dispatch(closePopUpSuccessEdit())}
      />
    </BoxContainer>
  );
};

export default ProfilePage;
