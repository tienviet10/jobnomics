import React from "react";

import styles from "../Modal/ModalWrapper.module.css";
import {
  Typography,
  Modal,
  IconButton,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Close, Delete, FavoriteBorder } from "@mui/icons-material";

const ModalWrapperSample = ({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  return (
    <Card
      elevation={5}
      className={styles.JobModal}
      sx={{
        width: { xs: "90vw", lg: "1000px" },
        padding: { xs: "30px", md: "40px" },
        position: "relative",
      }}
    >
      <div className={styles.ModalHeader}>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", top: "15px", right: "15px" }}
        >
          <Close fontSize="medium" />
        </IconButton>
        <div className={styles.JobHeader}>
          <Typography variant="h5" className={styles.JobTitle} gutterBottom>
            Software Engineer, Frontend - Slack (Software II, Senior, and Staff)
          </Typography>
          <Box
            className={styles.SubHeader}
            sx={{
              display: "flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
          >
            <Box
              sx={{
                maxWidth: "100%",
                flexShrink: { xs: 0, sm: 1 },
                mr: { xs: 0, sm: 4 },
              }}
            >
              <Typography
                variant="h6"
                className={styles.JobCompany}
                sx={{ color: "accent.dark" }}
              >
                Slack | Montreal, Quebec, Canada | Montreal, Quebec, Canada
              </Typography>
              <Typography variant="caption" className={styles.JobUpdatedDate}>
                Last update at: Last update at: 3/27/2023, 5:23:33 PM
              </Typography>
            </Box>
            <FormControl
              sx={{
                minWidth: { xs: "200px", sm: "auto" },
                maxWidth: { sm: "200px" },
                width: { xs: "100%" },
                mt: 2,
              }}
              size="small"
            >
              <InputLabel id="job-status-label">Job Status</InputLabel>
              <Select
                labelId="job-status-label"
                id="job-status"
                label="Job Status"
                value={"Bookmarked"}
              >
                <MenuItem sx={{ py: "8px" }}>Bookmarked</MenuItem>
                <MenuItem sx={{ py: "8px" }}>Applied</MenuItem>
                <MenuItem sx={{ py: "8px" }}>Interviewing</MenuItem>
                <MenuItem sx={{ py: "8px" }}>Interviewed</MenuItem>
                <MenuItem sx={{ py: "8px" }}>Job Offer</MenuItem>
                <MenuItem sx={{ py: "8px" }}>Job Unavailable</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className={styles.ModalMain}>{children}</div>
      <div className={styles.ModalFooter}>
        <IconButton className={styles.Button} disableRipple>
          <Typography className={styles.ButtonText}>Favorite</Typography>
          <FavoriteBorder fontSize="medium" />
        </IconButton>
        <IconButton className={styles.Button}>
          <Typography className={styles.ButtonText}>Delete</Typography>
          <Delete fontSize="medium" />
        </IconButton>
      </div>
    </Card>
  );
};

export default ModalWrapperSample;
