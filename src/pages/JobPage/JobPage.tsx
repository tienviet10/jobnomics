import React from "react";

import JobList from "../../components/JobList";

import { Typography } from "@mui/material";

const JobPage = () => {
  return (
    <div>
      <Typography variant="h3">(User's) Job Board</Typography>
      <JobList />
    </div>
  );
};

export default JobPage;
