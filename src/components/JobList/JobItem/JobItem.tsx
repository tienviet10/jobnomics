import React, { useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import type { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card/Card";

import styles from "./JobItem.module.css";
import { Avatar, Icon, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import { useUpdateJobMutation } from "../../../app/services/job-api";
import { toggleFavorite } from "../../../features/jobSlice";

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
  const dispatch = useDispatch();
  const jobState = useSelector((state: RootState) => state.job.categories);
  const job = jobState[category].jobs[index];
  const { id, title, company, logo } = job;
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [isFavorite, setIsFavorite] = useState(job.isFavorite);
  console.log(job);

  const handleToggleFavorite = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsFavorite((prev) => !prev);

    // userId, JobId, categoryId
    const body = {
      userId: 1,
      jobId: id,
      categoryId: jobState[category].id,
      favorite: !isFavorite,
      interviewDate: null,
      type: "update",
    };

    dispatch(toggleFavorite([category, id, !isFavorite]));
    updateJob(body);
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
