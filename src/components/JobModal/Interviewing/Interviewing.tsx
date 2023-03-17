import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

import styles from "./Interviewing.module.css";
const Interviewing = () => {
  const selectedJobState = useSelector(
    (state: RootState) => state.job.selectedJob
  );

  // console.log(selectedJobState)

  return (
    <div className={styles.BookedAppliedContainer}>
      <div className={styles.JobDescription}>
        {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
          Job Summary:
        </Typography> */}
        <Typography variant="body1" paragraph>
       
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {/* Skills: <span>{skills}</span> */}
        </Typography>
      </div>
    </div>
  );
}

export default Interviewing