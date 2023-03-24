import React, { useState } from "react";

import { useGetAllNotesQuery } from "../../app/services/job-api";

import styles from "./NotePage.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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

  console.log(notes);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={styles.NotePage}>
      {isLoading && !notes && <PageLoader />}
      {notes &&
        notes?.map((job: NotesType, index: number) => (
          <Accordion
            key={`note${index}-content`}
            expanded={expanded === `note${index}`}
            onChange={handleChange(`note${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`note${index}-content`}
              id={`note${index}-content`}
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                General settings
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                I am an accordion
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
};

export default NotePage;
