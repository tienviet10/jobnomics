import React from "react";

import { Box, Link, Typography } from "@mui/material";

import styles from "./AcceptedView.module.css";
import { Container } from "@mui/system";
import { useGetAJob } from "../../../hooks/get-a-job";

const AcceptedView = () => {
  const { selectedJob, skills } = useGetAJob();
  return (
    <Box
      className={styles.AcceptedContainer}
      sx={{ height: { xs: "62vh", sm: "40vh" } }}
    >
      <Box
        className={styles.AcceptedMain}
        sx={{ p: { xs: "15px", sm: "40px", md: "50px" }, pb: 0 }}
      >
        <Typography variant="h5" className={styles.Congratulation}>
          Congratulations on getting a job offer!
        </Typography>
        <Typography variant="body1" className={styles.TopHeader}>
          To help you with the next steps, here are some resources to consider:
        </Typography>
        <Container className={styles.Suggestions}>
          <Typography variant="body1">1) Salary Negotiation Tips:</Typography>
          <Link className={styles.Link}>http://www.example.com</Link>
          <Typography variant="body1">
            2) Search up the average salary for your role:
          </Typography>
          <Link className={styles.Link}>http://www.example.com</Link>
          <Typography variant="body1">
            3) Here is a salary calculator to estimate your salary:
          </Typography>
          <Link className={styles.Link}>http://www.example.com</Link>
        </Container>

        {selectedJob?.job?.skills && (
          <Typography
            variant="subtitle1"
            className={styles.Skills}
            sx={{
              fontSize: { xs: "13px", md: "16px" },
              lineHeight: { xs: "16px", md: "20px" },
            }}
          >
            <strong>Required Skills:</strong> {skills}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AcceptedView;
