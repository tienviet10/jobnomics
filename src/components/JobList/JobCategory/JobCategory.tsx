import React from "react";

import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

import { Droppable } from "react-beautiful-dnd";
import JobItem from "../JobItem";
import Paper from "@mui/material/Paper/Paper";
import { Button, Typography } from "@mui/material";

import { useAddJobMutation } from "../../../app/services/job-api";

import styles from "./JobCategory.module.css";

type CategoryProps = {
  category: string;
};

const JobCategory = ({ category }: CategoryProps): JSX.Element => {
  const jobState = useSelector((state: RootState) => state.job.categories);
  const categoryObj = jobState[category];
  const [addJob, { isLoading: isUpdating }] = useAddJobMutation();

  const handleAddJobClick = () => {
    console.log("Open Link Modal");
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
    </Paper>
  );
};

export default JobCategory;
