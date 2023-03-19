import React, { useState } from "react";

import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { useAddJobMutation } from "../../../app/services/job-api";

import { Droppable } from "react-beautiful-dnd";
import { Button, Typography, Paper } from "@mui/material";
import styles from "./JobCategory.module.css";

import JobItem from "../JobItem";
import CreateJobModal from "../../CreateJobModal";

import type { CategoryProps } from "../../../types/jobTypes";

const JobCategory = ({ category }: CategoryProps): JSX.Element => {
  const jobState = useSelector((state: RootState) => state.job.categories);
  const categoryObj = jobState[category];
  const [addJob, { isLoading: isUpdating }] = useAddJobMutation();

  const [open, setOpen] = useState(false);

  const handleAddJobClick = () => {
    setOpen(true);
  };

  return (
    <Paper elevation={3} className={styles.JobListContainer}>
      <div className={styles.JobListHeader}>
        <Typography variant="subtitle1" className={styles.CategoryLabel}>
          {category}
        </Typography>
        {category === "Bookmarked" && (
          <Button variant="contained" onClick={handleAddJobClick}>
            <Typography variant="subtitle2">Add New Job</Typography>
          </Button>
        )}
      </div>
      <Droppable droppableId={String(categoryObj.id)}>
        {(provided, snapshot) => (
          <Paper
            elevation={0}
            className={styles.JobItems}
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ bgcolor: snapshot.isDraggingOver ? "#efefef" : "#f8f8f8" }}
          >
            {categoryObj.jobs?.map((job, index) => (
              <JobItem
                key={`${job.id}-chores`}
                draggableId={`${job.id}`}
                index={index}
                category={category}
              />
            ))}
            {provided.placeholder}
          </Paper>
        )}
      </Droppable>
      <CreateJobModal open={open} setOpen={setOpen} />
    </Paper>
  );
};

export default JobCategory;
