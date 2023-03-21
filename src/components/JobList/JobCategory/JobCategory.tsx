import React, { useState } from "react";
import { useGetAllJobsQuery } from "../../../app/services/job-api";
import { Droppable } from "react-beautiful-dnd";
import { Button, Typography, Paper } from "@mui/material";
import styles from "./JobCategory.module.css";
import JobItem from "../JobItem";
import CreateJobModal from "../../CreateJobModal";

import type { CategoryProps, Job } from "../../../types/jobTypes";

const JobCategory = ({ category }: CategoryProps): JSX.Element => {
  const { data: jobState } = useGetAllJobsQuery();
  const [open, setOpen] = useState(false);

  const handleAddJobClick = () => {
    setOpen(true);
  };

  return (
    <>
      {jobState && (
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
          <Droppable droppableId={String(jobState[category]?.id)}>
            {(provided, snapshot) => (
              <Paper
                elevation={0}
                className={styles.JobItems}
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  bgcolor: snapshot.isDraggingOver ? "#efefef" : "#f8f8f8",
                  pb: snapshot.isDraggingOver ? 5 : 2,
                }}
              >
                {jobState[category].jobs.length > 0 &&
                  jobState[category].jobs?.map((job: Job, index: number) => (
                    <JobItem
                      key={`${job?.id}-chores`}
                      draggableId={`${job?.id}`}
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
      )}
    </>
  );
};

export default JobCategory;
