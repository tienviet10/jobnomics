import React from "react";

import JobList from "../../components/JobList";

import { Typography } from "@mui/material";

const JobBoard = () => {
  return (
    <div>
      <Typography>(User's) Job Board</Typography>
      <JobList />
    </div>
  );
};

export default JobBoard;
