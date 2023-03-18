import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

import styles from "./Interviewing.module.css";
const Interviewing = () => {
  const selectedJobState = useSelector(
    (state: RootState) => state.job.selectedJob
  );
  const skills = JSON.parse(JSON.stringify(selectedJobState.job.skills))
    .map((skill: { name: string; }) => skill.name)
    .join(", ");

  // console.log(selectedJobState?.job?.interviewExamples);

  return (
    <div className={styles.BookedAppliedContainer}>
      <div className={styles.JobDescription}>
        {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
          Job Summary:
        </Typography> */}
        <Typography variant="body1" className={styles.Questions}>
          {selectedJobState?.job?.interviewExamples}
        </Typography>
      </div>
      <Typography variant="subtitle1" fontWeight="bold">
        Skills: <span>{skills}</span>
      </Typography>
    </div>
  );
};

export default Interviewing;