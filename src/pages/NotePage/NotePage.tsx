import React, { useState, useEffect } from "react";

import { useGetAllNotesQuery } from "../../app/services/job-api";

import styles from "./NotePage.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { NotesType } from "../../types/jobTypes";
import PageLoader from "../../components/PageLoader";

const NotePage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [column, setColumn] = useState<string>("company");
  const [order, setOrder] = useState<"asc" | "dsc">("asc");
  const { data: notes, isLoading } = useGetAllNotesQuery({ column, order });

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      className={styles.NotePage}
      sx={{
        py: { xs: 4, sm: 7, md: 15 },
        px: { xs: 2, sm: 7, md: 15, lg: 15 },
      }}
    >
      {isLoading && <PageLoader />}
      {notes?.map((noteData: NotesType, index: number) => (
        <Box sx={{ width: { lg: "1200px" } }}>
          <div className={styles.NotePageHeader}>
            <Typography variant="h5" className={styles.NotePageTitle}>
              Interview Notes
            </Typography>
          </div>
          <Accordion
            key={`note${index}-content`}
            expanded={expanded === `note${index}`}
            onChange={handleChange(`note${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`note${index}-content`}
              id={`note${index}-content`}
              className={styles.AccordionSummary}
            >
              <Avatar
                variant="square"
                src={noteData.job.logo}
                alt={noteData.job.company}
                sx={{ alignSelf: "center" }}
              />
              <Typography
                sx={{
                  flex: 1,
                  maxWidth: "33%",
                  alignSelf: "center",
                  mx: { xs: 2, sm: 4, md: 5 },
                }}
              >
                {noteData.job.company}
              </Typography>
              <Typography sx={{ color: "text.secondary", alignSelf: "center" }}>
                {noteData.job.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {noteData.interviewDate && (
                <Typography sx={{ mb: 3 }} gutterBottom>
                  Interviewed on:{" "}
                  {new Date(noteData.interviewDate).toLocaleDateString()}
                </Typography>
              )}
              <Typography className={styles.NoteMain}>
                {noteData.note}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </Box>
  );
};

export default NotePage;
