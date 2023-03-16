import React from "react";
import styled from "styled-components";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

import { Droppable } from "react-beautiful-dnd";
import JobItem from "../JobItem";
import Paper from "@mui/material/Paper/Paper";
import { Typography } from "@mui/material";

import styles from "./JobCategory.module.css";

type CategoryProps = {
  category: string;
};

type StyleProps = {
  isDraggingOver: boolean;
};

const JobListContainer = styled.ul`
  background-color: ${({ isDraggingOver }: StyleProps) =>
    isDraggingOver ? "#efefef" : "#f8f8f8"};
`;

const JobCategory = ({ category }: CategoryProps): JSX.Element => {
  const jobState = useSelector((state: RootState) => state.job.categories);
  const categoryObj = jobState[category];

  return (
    <Paper elevation={3} className={styles.JobListContainer}>
      <Typography variant="h5" alignSelf={"flex-start"}>
        {category}
      </Typography>
      <Droppable droppableId={String(categoryObj.id)}>
        {(provided, snapshot) => (
          <JobListContainer
            className={styles.JobItems}
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
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
          </JobListContainer>
        )}
      </Droppable>
    </Paper>
  );
};

export default JobCategory;
