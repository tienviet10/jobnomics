import React from "react";
import { Typography } from "@mui/material";

import styles from "./Interviewing.module.css";
import { useGetAJob } from "../../../hooks/get-a-job";
const Interviewing = () => {
  const {selectedJob, skills} = useGetAJob();

  return (
    <div className={styles.BookedAppliedContainer}>
      <div className={styles.JobDescription}>
        <Typography variant="body1" className={styles.Questions}>
          {selectedJob?.job?.interviewExamples}
        </Typography>
      </div>
      <Typography variant="subtitle1" fontWeight="bold" className={styles.Skills}>
        Skills: <span>{skills}</span>
      </Typography>
    </div>
  );
};

export default Interviewing;