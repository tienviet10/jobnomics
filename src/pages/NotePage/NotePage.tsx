import React, { useState } from "react";

import { useGetAllNotesQuery } from "../../app/services/job-api";

import styles from "./NotePage.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  IconButton,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  EditRounded,
  ExpandMore,
} from "@mui/icons-material";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

import PageLoader from "../../components/PageLoader";
import NotepadModal from "./NotepadModal";

import { NotesType } from "../../types/jobTypes";

const NotePage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [column, setColumn] = useState<string>("company");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [notepadOpen, setNotepadOpen] = useState(false);
  const { data: notes, isLoading } = useGetAllNotesQuery({ column, order });
  const [noteType, setNoteType] = useState("");
  const [selectedNote, setSelectedNote] = useState<NotesType | undefined>();

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

  const handleInterviewEditClick = (noteData: NotesType) => {
    setNoteType("interview");
    setSelectedNote(noteData);
    setNotepadOpen(true);
  };

  const handleGeneralEditClick = (noteData: NotesType) => {
    setNoteType("general");
    setSelectedNote(noteData);
    setNotepadOpen(true);
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
            <Typography
              variant="h4"
              className={styles.NotePageTitle}
              color="neutral.darker"
              sx={{ minWidth: "300px", my: 2 }}
            >
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
                  bgcolor: "#ffffff",
                  width: { xs: "100%", md: "200px" },
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
                    sx={{
                      alignSelf: "center",
                      bgcolor: noteData.job.avatarColor,
                    }}
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
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    {noteData.generalNote && (
                      <Card
                        className={styles.NoteMain}
                        sx={{
                          flex: 1,
                          backgroundColor: "neutral.light",
                          mr: { xs: 0, md: noteData.note ? 2 : 0 },
                          mb: { xs: noteData.note ? 2 : 0, md: 0 },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Typography variant="subtitle1">
                            General Notes
                          </Typography>
                          <IconButton
                            onClick={() => handleGeneralEditClick(noteData)}
                          >
                            <EditRounded fontSize="small" />
                          </IconButton>
                        </Box>
                        <ReactQuill
                          theme="bubble"
                          value={noteData.generalNote}
                          readOnly={true}
                          className="my-quill-editor"
                        />
                      </Card>
                    )}
                    {noteData.note && (
                      <Card
                        className={styles.NoteMain}
                        sx={{ flex: 1, backgroundColor: "neutral.light" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Typography variant="subtitle1">
                            Interview Experience
                          </Typography>
                          <IconButton
                            onClick={() => handleInterviewEditClick(noteData)}
                          >
                            <EditRounded fontSize="small" />
                          </IconButton>
                        </Box>
                        <ReactQuill
                          theme="bubble"
                          value={noteData.note}
                          readOnly={true}
                          className="my-quill-editor"
                        />
                      </Card>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </>
      )}

      {selectedNote && (
        <NotepadModal
          open={notepadOpen}
          setOpen={setNotepadOpen}
          type={noteType}
          notesData={selectedNote}
        />
      )}
    </Box>
  );
};

export default NotePage;
