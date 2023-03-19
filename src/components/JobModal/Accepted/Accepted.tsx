import React from "react";

import { Typography } from "@mui/material";

import styles from "./AcceptedModal.module.css";
import { Container } from "@mui/system";
import { useGetAJob } from "../../../hooks/get-a-job";

const Accepted = () => {
  const { selectedJob, skills } = useGetAJob();
  return (
    <div className={styles.ModalBody}>
      <Typography variant="h5" className={styles.Congratulation}>
        Congratulations on getting a job offer!
      </Typography>
      <Typography variant="body1" className={styles.TopHeader}>
        To help you with the next steps, here are some resources to consider:
      </Typography>
      <Container className={styles.Suggestions}>
        <Typography variant="body1">1) Salary Negotiation Tips:</Typography>
        <Typography variant="body1" className={styles.Link}>
          http://www.example.com
        </Typography>
        <Typography variant="body1">
          2) Search up the average salary for your role:
        </Typography>
        <Typography variant="body1" className={styles.Link}>
          http://www.example.com
        </Typography>
        <Typography variant="body1">
          3) Here is a salary calculator to estimate your salary:
        </Typography>
        <Typography variant="body1" className={styles.Link}>
          http://www.example.com
        </Typography>
      </Container>
      {selectedJob?.job?.skills && (
        <Typography variant="body2" className={styles.Skill}>
          <strong>Required Skills:</strong> {skills}
        </Typography>
      )}
    </div>
  );
};

export default Accepted;
