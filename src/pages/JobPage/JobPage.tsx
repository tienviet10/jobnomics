import React, { useState } from "react";

import styles from "./JobPage.module.css";
import { Typography } from "@mui/material";

import JobList from "../../components/JobList";
import JobModal from "../../components/JobModal";
import InterviewDateModal from "../../components/InterviewDateModal";

const JobPage = () => {

  return (
    <div className={styles.JobPage}>
      <Typography variant="h4" className={styles.JobPageTitle}>
        (User's) Job Board
      </Typography>
      <JobList />
      <InterviewDateModal/>
      <JobModal />
    </div>
  );
};

export default JobPage;
