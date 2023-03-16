import React from "react";
import styled from "styled-components";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

import { Droppable } from "react-beautiful-dnd";
import JobItem from "../JobItem";

type CategoryProps = {
  category: string;
};

type StyleProps = {
  isDraggingOver: boolean;
};

const JobListContainer = styled.ul`
  background-color: ${({ isDraggingOver }: StyleProps) =>
    isDraggingOver ? "#efefef" : "#e4c8c8"};
`;

const JobCategory = ({ category }: CategoryProps): JSX.Element => {
  const jobState = useSelector((state: RootState) => state.job.categories);
  const categoryObj = jobState[category];

  return (
    <div className="todo_list">
      <h3 className="todo_label">{category}</h3>
      <Droppable droppableId={String(categoryObj.id)}>
        {(provided, snapshot) => (
          <JobListContainer
            className="todo_items"
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
    </div>
  );
};

export default JobCategory;
