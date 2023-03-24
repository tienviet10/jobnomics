import React, { useState, useEffect } from "react";

import { useGetAllInterviewDatesQuery } from "../../app/services/job-api";

import styles from "./CalendarModal.module.css";
import "./Calendar.css";
import { Box, Card, IconButton, Modal, Typography } from "@mui/material";
import { Close, CloseRounded } from "@mui/icons-material";

import moment from "moment";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEventsType, CreateJobModalPropType, InterviewResponseType } from "../../types/jobTypes";


const localizer = momentLocalizer(moment);

type SelectedEventType = {
  id: number;
  start: Date;
  end: Date;
  title: string;
  description: string;
};

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
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventType>();
  const [openDetail, setOpenDetail] = useState(false);

  const populateInterviewDates = () => {
    const newState = interviewDates?.map(
      (
        interview: InterviewResponseType,
        index: number
      ) => {
        return {
          id: index,
          start: moment(interview?.interviewDate).toDate(),
          end: moment(interview?.interviewDate).add(1, "h").toDate(),
          title: interview?.company,
          description: interview?.title,
        };
      }
    );
    
    setState({ events: newState || [] });
  };

  const handleSelectedEvent = (event: any) => {
    console.log(event);
    setSelectedEvent(event);
    setOpenDetail(true);
  };

  const handleSelectedEventClose = () => {
    setOpenDetail(false);
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
          onSelectEvent={(e) => handleSelectedEvent(e)}
          eventPropGetter={(event) => ({
            style: {
              border: "5px solid",
              outline: "none",
            },
          })}
          popup
          selectable
        />
        {selectedEvent && (
          <Modal
            id={String(selectedEvent.id)}
            open={openDetail}
            className={styles.SelectedEventModalContainer}
          >
            <Card
              elevation={3}
              className={styles.SelectedEventModal}
              sx={{ py: { xs: 10 }, px: { xs: 4, sm: 6 } }}
            >
              <IconButton
                onClick={handleSelectedEventClose}
                sx={{ position: "absolute" }}
                className={styles.CloseButton}
              >
                <CloseRounded fontSize="medium" />
              </IconButton>
              <Typography variant="h6" className={styles.EventHeader}>
                Interview Schedule
              </Typography>
              <Box
                sx={{
                  my: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  className={styles.Date}
                  sx={{ fontWeight: "bold" }}
                >
                  {selectedEvent.start.toLocaleString()}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    width: { xs: "100%", sm: "inherit" },
                    textAlign: "center",
                  }}
                >
                  -
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={styles.Date}
                  sx={{ fontWeight: "bold" }}
                >
                  {selectedEvent.end.toLocaleString()}
                </Typography>
              </Box>
              <Typography
                textAlign={"center"}
                className={styles.JobDescription}
              >
                <strong>Company:</strong> {selectedEvent.title}
              </Typography>
              <Typography
                textAlign={"center"}
                className={styles.JobDescription}
              >
                <strong>Position:</strong> {selectedEvent.description}
              </Typography>
            </Card>
          </Modal>
        )}
      </Card>
    </Modal>
  );
};

export default CalendarModal;
