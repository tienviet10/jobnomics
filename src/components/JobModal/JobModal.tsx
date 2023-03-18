import React from "react";
import ModalWrapper from "../Modal";
import BookmarkedAppliedView from "./BookmarkedApplied";
import Accepted from "./Accepted";
import Rejected from "./Rejected";
import Interviewing from "./Interviewing";
import { useGetAJob } from "../../hooks/get-a-job";

const JobModal = () => {
  const {selectedJob} = useGetAJob();
  const selectedJobCategory = selectedJob?.category?.name;

  return (
    <ModalWrapper>
      {selectedJobCategory === "Job Offer" && <Accepted/>}
      {selectedJobCategory === "Position Filled" && <Rejected/>}
      {selectedJobCategory === "Interviewing" && <Interviewing/>}
      {selectedJobCategory &&
        (selectedJobCategory === "Bookmarked" ||
          selectedJobCategory === "Applied") && <BookmarkedAppliedView />}
    </ModalWrapper>
  );
};

export default JobModal;
