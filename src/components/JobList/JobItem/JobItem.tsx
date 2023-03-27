import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setModalId, toggleJobModal } from "../../../features/jobSlice";
import {
  useGetAllJobsQuery,
  useUpdateJobMutation,
} from "../../../app/services/job-api";
import { Draggable } from "react-beautiful-dnd";
import styles from "./JobItem.module.css";
import { Avatar, Typography, Card } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useGetAJob } from "../../../hooks/get-a-job";
import { AllActiveJobsType } from "../../../types/jobTypes";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

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
  const { refetch } = useGetAJob();
  const auth = useSelector((state: RootState) => state.auth);
  const { data } = useGetAllJobsQuery({token: auth.accessToken});
  const [updateJob] = useUpdateJobMutation();

  const job: AllActiveJobsType | undefined =
    data?.allActiveJobs[category].jobs[index];
  const { id, title, company, logo, isFavorite, avatarColor } =
    job as AllActiveJobsType;
  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  const handleToggleFavorite = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLocalFavorite((prev) => {
      const body = {
        jobId: id,
        categoryId: data?.allActiveJobs[category]?.id,
        favorite: !prev,
        interviewDate: null,
        type: "update",
      };
      updateJob(body);
      return !prev;
    });
  };

  useEffect(() => {
    setLocalFavorite(isFavorite);
  }, [isFavorite]);

  const handleOpenModal = async () => {
    dispatch(
      setModalId({ jobId: id, categoryId: data?.allActiveJobs[category]?.id })
    );

    // Needed for the same card to refresh
    // if (previousJob.jobId === id || previousJob.jobId === -1) {
    //   await refetch();
    // }
    // Looks like it should be run for all card to refresh the interview date update inside Interviewing. IF there is a problem, ONLY allow category = interviewing to run refetch
    await refetch();

    dispatch(toggleJobModal(true));
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
            sx={{
              bgcolor: snapshot.isDragging ? "accent.translucent" : "#ffffff",
            }}
            ref={provided.innerRef}
          >
            <Avatar
              alt={company}
              src={logo}
              onClick={handleOpenModal}
              sx={{ bgcolor: avatarColor }}
            />
            <div className={styles.JobDetails} onClick={handleOpenModal}>
              <Typography variant="body2" sx={{ fontWeight: 500 }} gutterBottom>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: "accent.main" }}>
                {company}
              </Typography>
            </div>

            {localFavorite ? (
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
