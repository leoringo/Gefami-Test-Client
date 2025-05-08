import { Box, styled } from "@mui/material";

export const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "50px",
});

export const UserInformationContainer = styled("form")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "30px",
  minWidth: "35vw",
  minHeight: "20vh",
});

export const BoxButton = styled(Box)({
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '50%'
})