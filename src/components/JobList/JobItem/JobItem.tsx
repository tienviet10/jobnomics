import React from "react";

import { Draggable } from "react-beautiful-dnd";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card/Card";

import styles from "./JobItem.module.css";
import { Typography } from "@mui/material";

type JobItemProps = {
  draggableId: string;
  index: number;
  category: string;
};

const JobItem = ({
  draggableId,
  index,
  category,
}: JobItemProps): JSX.Element => {
  const jobState = useSelector((state: RootState) => state.job.categories);
  const jobs = jobState[category].jobs;

  return (
    <>
      <Draggable draggableId={draggableId} index={index}>
        {(provided, snapshot) => (
          <Card
            id={draggableId}
            className={styles.JobItem}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{ bgcolor: snapshot.isDragging ? "#dbe4ff" : "#ffffff" }}
            ref={provided.innerRef}
            // onClick={handleOpenModal}
          >
            <Typography variant="h6">{`${
              jobs && jobs[index].title
            }`}</Typography>
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default JobItem;
