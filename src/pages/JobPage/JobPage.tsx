import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useGetAllJobsQuery } from "../../app/services/job-api";

import styles from "./JobPage.module.css";
import { Button, Typography } from "@mui/material";

import JobList from "../../components/JobList";
import JobModal from "../../components/JobModal";
import InterviewDateModal from "../../components/InterviewDateModal";
import InactiveJobsModal from "../../components/InactiveJobsModal.tsx";
import CalendarModal from "../../components/Calendar";

const JobPage = () => {
  const { user } = useAuth0();
  const { data } = useGetAllJobsQuery();

  const [openInactiveModal, setOpenInactiveModal] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  useEffect(() => {
    if (data && data.staleJobs.length) {
      setOpenInactiveModal(true);
    }
  }, [data]);

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
        <Button onClick={()=> setCalendarOpen(true)}>Calendar</Button>
      </Typography>
      <JobList />
      <InterviewDateModal />
      <InactiveJobsModal
        open={openInactiveModal}
        setOpen={setOpenInactiveModal}
      />
      <CalendarModal open={calendarOpen} setOpen={setCalendarOpen}/>
      <JobModal />
    </div>
  );
};

export default JobPage;
