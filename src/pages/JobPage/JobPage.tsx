import React from "react";

import styles from "./JobPage.module.css";
import { Typography } from "@mui/material";

import JobList from "../../components/JobList";
import JobModal from "../../components/JobModal";

const JobPage = () => {
  return (
    <div className={styles.JobPage}>
      <Typography variant="h4" className={styles.JobPageTitle}>
        (User's) Job Board
      </Typography>
      <JobList />

      <JobModal />
    </div>
  );
};

export default JobPage;
