// components/GlobalErrorPopup.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { closeError } from "./globalErrorSlice";

const GlobalError: React.FC = () => {
  const { open, message } = useAppSelector((state) => state.globalError);
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(closeError())}
    >
      <Alert severity="error" onClose={() => dispatch(closeError())}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalError;
