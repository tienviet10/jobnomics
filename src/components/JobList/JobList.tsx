import React, { useEffect } from "react";
import type { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { updateColumns } from "../../features/jobSlice";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
} from "../../app/services/job-api";

import "./JobList.css";
import JobCategory from "./JobCategory";

const JobList = (): JSX.Element => {
  const dispatch = useDispatch();

  const jobCategories = useSelector(
    (state: RootState) => state.job.categoryOrder
  );
  const jobState = useSelector((state: RootState) => state.job.categories);
  const { Bookmarked } = jobState;

  const { data, error, isLoading } = useGetAllJobsQuery(null);

  useEffect(() => {
    if (data) {
      const newState = data;

      console.log(newState);

      dispatch(updateColumns(newState));
    }
  }, [data]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = jobState[source.droppableId];
    const endColumn = jobState[destination.droppableId];

    console.log(startColumn);
    console.log(endColumn);

    // if (startColumn === endColumn) {
    //   // Moving within the same column
    //   const newTodos = [...startColumn.todos];
    //   const [removedTodo] = newTodos.splice(source.index, 1);
    //   newTodos.splice(destination.index, 0, removedTodo);

    //   const newColumn = {
    //     ...startColumn,
    //     todos: newTodos,
    //   };

    //   const newState = {
    //     ...todosState,
    //     [newColumn.id]: newColumn,
    //   };

    //   dispatch(updateColumns(newState));
    //   return;
    // }

    // // Moving to a different column
    // const startTodos = [...startColumn.todos];
    // const [removedTodo] = startTodos.splice(source.index, 1);
    // const newStartColumn = {
    //   ...startColumn,
    //   todos: startTodos,
    // };

    // const endTodos = [...endColumn.todos];
    // endTodos.splice(destination.index, 0, removedTodo);
    // const newEndColumn = {
    //   ...endColumn,
    //   todos: endTodos,
    // };

    // const newState = {
    //   ...todosState,
    //   [source.droppableId]: newStartColumn,
    //   [destination.droppableId]: newEndColumn,
    // };

    // dispatch(updateColumns(newState));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="todo_container">
        {jobCategories.map((category: string) => (
          <JobCategory key={category} category={category} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default JobList;
