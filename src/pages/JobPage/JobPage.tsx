import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

import styles from "./JobPage.module.css";
import { Typography } from "@mui/material";

import JobList from "../../components/JobList";
import JobModal from "../../components/JobModal";
import InterviewDateModal from "../../components/InterviewDateModal";

const JobPage = () => {
  const { user } = useAuth0();

  return (
    <div className={styles.JobPage}>
      <Typography variant="h5" className={styles.JobPageTitle}>
        <span>
          {user?.name ||
            user?.given_name ||
            user?.family_name ||
            user?.nickname}
          's{" "}
        </span>
        <span>Job Board</span>
      </Typography>
      <JobList />
      <InterviewDateModal />
      <JobModal />
    </div>
  );
};

export default JobPage;
