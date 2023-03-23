import { JobPreviewType } from "../types/jobTypes";

export const processColumns = (
  source: any,
  destination: any,
  allActiveJobs: any,
  sourceCategory: any,
  destinationCategory: any,
  data: any
) => {
  console.log(data);

  const startColumn = allActiveJobs[sourceCategory];
  const endColumn = allActiveJobs[destinationCategory];

  if (startColumn === endColumn) {
    // Moving within the same column
    const newJobs = JSON.parse(JSON.stringify(startColumn.jobs));
    let [removedJob] = newJobs.splice(source.index, 1);
    removedJob = { ...removedJob, position: destination.index };

    newJobs.forEach((job: { position: number }, index: number) => {
      if (
        source.index < destination.index &&
        index >= source.index &&
        index < destination.index
      ) {
        job.position = index;
      }
      if (
        source.index > destination.index &&
        index < source.index &&
        index >= destination.index
      ) {
        job.position = index + 1;
      }
    });

    newJobs.push(removedJob);
    newJobs.sort(
      (a: JobPreviewType, b: JobPreviewType) => a.position - b.position
    );

    const newColumn = {
      ...startColumn,
      jobs: newJobs,
    };

    const newState = {
      ...data,
      [sourceCategory]: newColumn,
      allActiveJobs: { ...data.allActiveJobs, [sourceCategory]: newColumn },
    };

    const updatedJobs = newJobs.map((job: { id: number; position: number }) => {
      if (job.position === destination.index) {
        return {
          jobId: job?.id,
          categoryId: Number(source.droppableId),
          newCategoryId: Number(destination.droppableId),
          position: job.position,
          isChanged: true,
        };
      }
      return {
        jobId: job?.id,
        categoryId: Number(source.droppableId),
        newCategoryId: Number(destination.droppableId),
        position: job.position,
      };
    });

    const body = {
      jobUpdates: updatedJobs,
      newState,
      type: "update",
    };

    return body;
  }

  // Moving to a different column
  const startJobs = JSON.parse(JSON.stringify(startColumn.jobs));
  const endJobs = JSON.parse(JSON.stringify(endColumn.jobs));
  let [removedJob] = startJobs.splice(source.index, 1);
  removedJob = { ...removedJob, position: destination.index };

  const startColumnUpdatedJobs = startJobs
    ?.splice(source.index)
    .map((job: { position: number }) => {
      return {
        ...job,
        position: job.position - 1,
      };
    });

  const endColumnUpdatedJobs = endJobs
    ?.splice(destination.index)
    .map((job: { position: number }) => {
      return {
        ...job,
        position: job.position + 1,
      };
    });

  const newStartColumn = {
    ...startColumn,
    jobs: [...startJobs, ...startColumnUpdatedJobs],
  };

  endColumnUpdatedJobs.push(removedJob);
  endColumnUpdatedJobs.sort(
    (a: JobPreviewType, b: JobPreviewType) => a.position - b.position
  );

  const newEndColumn = {
    ...endColumn,
    jobs: [...endJobs, ...endColumnUpdatedJobs],
  };

  const newState = {
    ...data,
    // [sourceCategory]: newStartColumn,
    // [destinationCategory]: newEndColumn,
    allActiveJobs: {
      ...data.allActiveJobs,
      [sourceCategory]: newStartColumn,
      [destinationCategory]: newEndColumn,
    },
  };

  const updatedJobsInSource = startColumnUpdatedJobs.map(
    (job: { id: number; position: number }) => {
      return {
        jobId: job?.id,
        categoryId: Number(source.droppableId),
        newCategoryId: Number(source.droppableId),
        position: job?.position,
      };
    }
  );

  const updatedJobsInDestination = endColumnUpdatedJobs.map(
    (job: { id: number; position: number }) => {
      if (job.position === destination.index) {
        return {
          jobId: job?.id,
          categoryId: Number(source.droppableId),
          newCategoryId: Number(destination.droppableId),
          position: job.position,
          isChanged: true,
        };
      }
      return {
        jobId: job?.id,
        categoryId: Number(destination.droppableId),
        newCategoryId: Number(destination.droppableId),
        position: job?.position,
      };
    }
  );

  const body = {
    jobUpdates: [...updatedJobsInSource, ...updatedJobsInDestination],
    newState,
    type: "update",
  };
  return body;
};
