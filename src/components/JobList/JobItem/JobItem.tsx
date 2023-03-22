import React from "react";

import { useDispatch } from "react-redux";
import {
  setModalId,
  toggleFavorite,
  toggleJobModal,
} from "../../../features/jobSlice";
import {
  useGetAllJobsQuery,
  useUpdateJobMutation,
} from "../../../app/services/job-api";
import { Draggable } from "react-beautiful-dnd";
import styles from "./JobItem.module.css";
import { Avatar, Typography, Card } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useGetAJob } from "../../../hooks/get-a-job";

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
  const { modalState, previousJob, refetch } = useGetAJob();
  const { data } = useGetAllJobsQuery();
  const job = data[category].jobs[index];
  const { id, title, company, logo, isFavorite } = job;

  const [updateJob] = useUpdateJobMutation();

  const handleToggleFavorite = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const body = {
      jobId: id,
      categoryId: data[category]?.id,
      favorite: !isFavorite,
      interviewDate: null,
      type: "update",
    };
    dispatch(toggleFavorite([category, id, !isFavorite]));
    updateJob(body);
  };

  const handleOpenModal = () => {
    dispatch(setModalId({ jobId: id, categoryId: data[category]?.id }));

    if (previousJob.jobId === id) {
      refetch();
    }

      dispatch(toggleJobModal(!modalState.open));

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
          >
            <Avatar alt={company} src={logo} onClick={handleOpenModal} />
            <div className={styles.JobDetails} onClick={handleOpenModal}>
              <Typography variant="body2" className={styles.JobTitle}>
                {title}
              </Typography>
              <Typography variant="caption" className={styles.Company}>
                {company}
              </Typography>
            </div>

            {isFavorite ? (
              <Favorite fontSize="medium" onClick={handleToggleFavorite} />
            ) : (
              <FavoriteBorder
                fontSize="medium"
                onClick={handleToggleFavorite}
              />
            )}
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default JobItem;
