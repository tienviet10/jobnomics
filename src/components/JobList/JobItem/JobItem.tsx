import React from "react";
import styled from "styled-components";

import { Draggable } from "react-beautiful-dnd";
import type { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";

type JobItemProps = {
  draggableId: string;
  index: number;
  category: string;
};

type StyleProps = {
  isDragging: boolean;
};

const ItemContainer = styled.li`
  background-color: ${({ isDragging }: StyleProps) =>
    isDragging ? "#ec589d" : "#ffffff"};
`;

const JobItem = ({
  draggableId,
  index,
  category,
}: JobItemProps): JSX.Element => {
  const dispatch = useDispatch();

  const jobState = useSelector((state: RootState) => state.job.categories);
  const jobs = jobState[category].jobs;

  return (
    <>
      <Draggable draggableId={draggableId} index={index}>
        {(provided, snapshot) => (
          <ItemContainer
            id={draggableId}
            className="todo_item"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            // onClick={handleOpenModal}
          >
            {`${jobs && jobs[index]}`}
          </ItemContainer>
        )}
      </Draggable>
    </>
  );
};

export default JobItem;
