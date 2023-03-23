import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
import { useAddJobMutation, useGetAllInterviewDatesQuery } from "../../app/services/job-api";

import styles from "./CalendarModal.module.css";
import {
  Card,
  IconButton,
  Modal,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { CreateJobModalPropType } from "../../types/jobTypes";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarModal = ({
  open,
  setOpen,
}: CreateJobModalPropType): JSX.Element => {

  const handleClose = () => {
    setOpen(false);
  };

  const { data: interviewDates } = useGetAllInterviewDatesQuery();
  const [state, setState] = useState<any>({
    events: []
  });

  const populateInterviewDates = () => {
    const newState = interviewDates.map((interview: { company: string, interviewDate: Date, title: string; }) => {
      return {
        start: moment(interview?.interviewDate).toDate(),
        end: moment(interview?.interviewDate).add(1, "h").toDate(),
        title: interview?.company
      };
    });
    console.log({events: newState});
    setState({events: newState})
  };


  useEffect(() => {
    if (interviewDates){
      populateInterviewDates();
    }
  }, [interviewDates]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.CreateJobModalContainer}
    >
      <Card
        elevation={5}
        className={styles.CreateJobModal}
        sx={{
          px: { xs: 4, sm: "60px", md: "100px" },
          py: { xs: 4, sm: "80px", md: "100px" },
          pb: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <IconButton
          className={styles.CloseButton}
          sx={{ position: "absolute" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>

        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={state.events}
          className={styles.CalendarStyles}
        />
      </Card>
    </Modal>
  );
};

export default CalendarModal;
