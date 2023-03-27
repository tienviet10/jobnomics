import React from "react";
import { Alert } from "@mui/material";

const InvalidAlertView = () => {
  return (
    <Alert
      severity="warning"
      sx={{
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      This job is invalid.
    </Alert>
  );
};

export default InvalidAlertView;
