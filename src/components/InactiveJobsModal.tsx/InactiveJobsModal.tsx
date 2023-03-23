import React from "react";
import { useGetAllJobsQuery } from "../../app/services/job-api";

const InactiveJobsModal = () => {
  const { data } = useGetAllJobsQuery();
  return <div>InactiveJobsModal</div>;
};

export default InactiveJobsModal;
