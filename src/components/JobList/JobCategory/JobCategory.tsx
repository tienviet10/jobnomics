import React, { useState } from "react";
import { useGetAllJobsQuery } from "../../../app/services/job-api";
import { Droppable } from "react-beautiful-dnd";
import { Button, Typography, Paper } from "@mui/material";
import styles from "./JobCategory.module.css";
import JobItem from "../JobItem";
import CreateJobModal from "../../CreateJobModal";

import type { AllActiveJobsType, CategoryProps } from "../../../types/jobTypes";

const JobCategory = ({ category }: CategoryProps): JSX.Element => {
  const { data } = useGetAllJobsQuery({});
  const [open, setOpen] = useState(false);

  const handleAddJobClick = () => {
    setOpen(true);
  };

  return (
    <>
      {data?.allActiveJobs && (
        <Paper
          elevation={3}
          className={styles.JobListContainer}
          sx={{ backgroundColor: "translucent.light" }}
        >
          <div className={styles.JobListHeader}>
            <Typography variant="subtitle1" className={styles.CategoryLabel}>
              {category}
            </Typography>
            {category === "Bookmarked" && (
              <Button
                variant="contained"
                onClick={handleAddJobClick}
                sx={{ backgroundColor: "accent.main" }}
              >
                Add new job
              </Button>
            )}
          </div>
          <Droppable droppableId={String(data?.allActiveJobs[category]?.id)}>
            {(provided, snapshot) => (
              <Paper
                elevation={0}
                className={styles.JobItems}
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  backgroundColor: snapshot.isDraggingOver
                    ? "neutral.dark"
                    : "neutral.main",
                  pb: snapshot.isDraggingOver ? 5 : 2,
                }}
              >
                {data?.allActiveJobs[category].jobs.length > 0 &&
                  data?.allActiveJobs[category].jobs?.map(
                    (job: AllActiveJobsType, index: number) => (
                      <JobItem
                        key={`${job?.id}-${job?.title}`}
                        draggableId={`${job?.id}`}
                        index={index}
                        category={category}
                      />
                    )
                  )}
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
