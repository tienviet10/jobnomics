import React, { useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card/Card";

import styles from "./JobItem.module.css";
import { Avatar, Icon, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

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
  const job = jobState[category].jobs[index];
  const { title, company, logo } = job;
  const [isFavorite, setIsFavorite] = useState(job.isFavorite);
  console.log(job);

  const handleToggleFavorite = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsFavorite((prev) => !prev);
  };

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
            <Avatar alt={company} src={logo} />
            <div className={styles.JobDetails}>
              <Typography variant="h5">{title}</Typography>
              <Typography variant="h6">{company}</Typography>
            </div>

            {isFavorite ? (
              <Favorite fontSize="large" onClick={handleToggleFavorite} />
            ) : (
              <FavoriteBorder fontSize="large" onClick={handleToggleFavorite} />
            )}
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default JobItem;
