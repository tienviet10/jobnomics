import React, { useEffect, useState } from "react";

import { useGetAllJobsQuery } from "../../app/services/job-api";

import styles from "./JobPage.module.css";
import { Box } from "@mui/material";

import JobList from "../../components/JobList";
import JobModal from "../../components/JobModal";
import InterviewDateModal from "../../components/InterviewDateModal";
import InactiveJobsModal from "../../components/InactiveJobsModal";
import PageLoader from "../../components/PageLoader";
import { useGetAccessToken } from "../../hooks/auth-header";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const JobPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { data } = useGetAllJobsQuery({token: auth.accessToken});

  const [openInactiveModal, setOpenInactiveModal] = useState(false);

  // const {getAccessToken} = useGetAccessToken();
  
  // const toekn = async () => {
  //   const token = await getAccessToken()
  //   console.log(token)
  // }

  useEffect(() => {
    const currentDate = Date.now();
    const lastInactiveJobReminder = JSON.parse(
      localStorage.getItem("inactiveJobReminder") || "null"
    );

    const msSinceLastReminder = currentDate - lastInactiveJobReminder;
    const moreThan3Days = msSinceLastReminder > 1000 * 3600 * 24;

    if (moreThan3Days && data && data.staleJobs?.length) {
      setOpenInactiveModal(true);

      localStorage.setItem("inactiveJobReminder", JSON.stringify(currentDate));
    }
    if (data && !data.staleJobs?.length) {
      setOpenInactiveModal(false);
    }
  }, [data]);

  return (
    <Box
      className={styles.JobPage}
      sx={{ pt: { xs: 9, sm: 12, md: 12, lg: 13 } }}
    >
      {!data && <PageLoader />}
      <JobList />
      <InterviewDateModal />
      <InactiveJobsModal
        open={openInactiveModal}
        setOpen={setOpenInactiveModal}
      />

      <JobModal />
    </Box>
  );
};

export default JobPage;
