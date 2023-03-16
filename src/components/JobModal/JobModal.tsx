import { Typography, Modal, Box } from "@mui/material";

import React from "react";

const JobModal = () => {
  const open = true;
  return (
    <Modal open={open}>
      <Box>
        <Typography>JobModal</Typography>
      </Box>
    </Modal>
  );
};

export default JobModal;
