import React, { useState, useEffect, Fragment } from "react";

import { useGetAllNotesQuery } from "../../app/services/job-api";

import styles from "./NotePage.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  ExpandMore,
} from "@mui/icons-material";
import { NotesType } from "../../types/jobTypes";
import PageLoader from "../../components/PageLoader";

const NotePage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [column, setColumn] = useState<string>("company");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const { data: notes, isLoading } = useGetAllNotesQuery({ column, order });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const sortBy = [
    { value: "company", name: "Company Name" },
    { value: "title", name: "Job Title" },
    { value: "updatedByUserAt", name: "Updated At" },
    { value: "interviewDate", name: "Interview Date" },
  ];

  const handleSortColumnChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setColumn(event.target.value);
  };

  const handleOrderChange = (
    event: React.MouseEvent<HTMLElement>,
    orderAscDesc: "asc" | "desc"
  ) => {
    if (orderAscDesc === null || orderAscDesc === order) return;

    setOrder(orderAscDesc);
  };

  return (
    <Box
      className={styles.NotePage}
      sx={{
        py: { xs: 4, sm: 7, md: 15 },
        px: { xs: 3, sm: 7, md: 15 },
        width: { lg: "1200px", xl: "1500px" },
        mx: "auto",
      }}
    >
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className={styles.NotePageHeader}>
            <Typography variant="h4" className={styles.NotePageTitle}>
              Interview Notes
            </Typography>
            <div className={styles.SortBy}>
              <Typography sx={{ mr: 1, flexShrink: 0 }}>Sort By:</Typography>
              <Select
                id="demo-simple-select"
                value={column}
                onChange={handleSortColumnChange}
                size="small"
                sx={{
                  // bgcolor: "#ffffff",
                  width: { xs: "100%", sm: "200px" },
                  maxWidth: "300px",
                }}
              >
                {sortBy.map((column, index) => (
                  <MenuItem key={index} value={column.value}>
                    {column.name}
                  </MenuItem>
                ))}
              </Select>
              <ToggleButtonGroup
                value={order}
                exclusive
                onChange={handleOrderChange}
                aria-label="text alignment"
                size="small"
                sx={{ ml: 1 }}
              >
                <ToggleButton value="asc" aria-label="ascending order">
                  <ArrowUpwardRounded />
                </ToggleButton>
                <ToggleButton value="desc" aria-label="descending order">
                  <ArrowDownwardRounded />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <Box sx={{ width: "100%" }}>
            {notes?.map((noteData: NotesType, index: number) => (
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
                      flexGrow: 1,
                      flexShrink: 0,
                      width: "33%",
                      maxWidth: "33%",
                      alignSelf: "center",
                      mx: { xs: 2, sm: 4, md: 5 },
                    }}
                  >
                    {noteData.job.company}
                  </Typography>
                  <Typography
                    sx={{ color: "text.secondary", alignSelf: "center" }}
                  >
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
                  <Typography
                    className={styles.NoteMain}
                    sx={{ backgroundColor: "neutral.light" }}
                  >
                    {noteData.note}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default NotePage;
