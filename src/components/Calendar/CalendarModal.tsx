import React, { useState, useEffect } from "react";

import { useGetAllInterviewDatesQuery } from "../../app/services/job-api";

import styles from "./CalendarModal.module.css";
import "./Calendar.css";
import { Card, IconButton, Modal, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEventsType, CreateJobModalPropType, InterviewResponseType } from "../../types/jobTypes";


const localizer = momentLocalizer(moment);

const CalendarModal = ({
  open,
  setOpen,
}: CreateJobModalPropType): JSX.Element => {
  const handleClose = () => {
    setOpen(false);
  };

  const { data: interviewDates } = useGetAllInterviewDatesQuery();
  const [state, setState] = useState<CalendarEventsType>({
    events: [],
  });

  const populateInterviewDates = () => {
    const newState = interviewDates?.map(
      (interview: InterviewResponseType) => {
        return {
          start: moment(interview?.interviewDate).toDate(),
          end: moment(interview?.interviewDate).add(1, "h").toDate(),
          title: interview?.company,
        };
      }
    );
    
    setState({ events: newState || [] });
  };

  useEffect(() => {
    if (interviewDates) {
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
          py: { xs: 5, sm: "80px", md: 6 },
          pb: { xs: 5, sm: 4, md: 6 },
        }}
      >
        <IconButton
          className={styles.CloseButton}
          sx={{ position: "absolute" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>
        <Typography variant="h5" mb={3}>
          Booked Interviews
        </Typography>
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
