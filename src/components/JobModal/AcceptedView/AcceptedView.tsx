import React from "react";

import { Alert, Box, Link, Typography } from "@mui/material";

import styles from "./AcceptedView.module.css";
import { Container } from "@mui/system";
import { useGetAJob } from "../../../hooks/get-a-job";
import { OpenInNew } from "@mui/icons-material";

const AcceptedView = () => {
  const { selectedJob, skills } = useGetAJob();

  return (
    <Box className={styles.AcceptedContainer}>
      <Box
        className={styles.AcceptedMain}
        sx={{
          px: { xs: "15px", sm: "40px", md: "50px" },
          py: { xs: "5px", sm: "20px", md: "30px" },
          pb: 0,
        }}
      >
        <Typography
          variant="h5"
          className={styles.Congratulation}
          sx={{
            fontSize: { xs: "18px", sm: "20px", md: "24px" },
            fontWeight: "bold",
          }}
        >
          Congratulations on getting a job offer!
        </Typography>
        <Typography variant="body1" className={styles.TopHeader}>
          To help you with the next steps, here are some resources to consider:
        </Typography>
        <Container className={styles.Suggestions}>
          <Link
            underline="none"
            href="https://hbr.org/2014/04/15-rules-for-negotiating-a-job-offer"
            target="_blank"
            rel="noreferrer"
            className={styles.Link}
          >
            Salary Negotiation Tips <OpenInNew sx={{ fontSize: "15px" }} />
          </Link>

          <Link
            underline="none"
            href="https://www.levels.fyi/"
            target="_blank"
            rel="noreferrer"
            className={styles.Link}
          >
            Levels.fyi Average Salary Data{" "}
            <OpenInNew sx={{ fontSize: "15px" }} />
          </Link>

          <Link
            underline="none"
            href="https://www.glassdoor.ca/Salaries/know-your-worth.htm"
            target="_blank"
            rel="noreferrer"
            className={styles.Link}
          >
            Glassdoor Salary Calculator <OpenInNew sx={{ fontSize: "15px" }} />
          </Link>
        </Container>
      </Box>
      {selectedJob?.job?.skills && (
        <Alert
          severity="info"
          sx={{
            fontSize: { xs: "13px", md: "16px" },
          }}
        >
          <strong>Required Skills:</strong> {skills}
        </Alert>
      )}
    </Box>
  );
};

export default AcceptedView;
