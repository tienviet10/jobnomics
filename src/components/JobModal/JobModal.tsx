import React from "react";

import BookmarkedAppliedView from "./BookmarkedApplied";
import AcceptedView from "./AcceptedView";
import Rejected from "./Rejected";
import InterviewingView from "./InterviewingView";
import ModalWrapper from "../Modal";
import InterviewedView from "./InterviewedView";

import { useGetAJob } from "../../hooks/get-a-job";

const JobModal = () => {
  const { selectedJob } = useGetAJob();
  const selectedJobCategory = selectedJob?.category?.name;

  return (
    <ModalWrapper>
      {selectedJobCategory === "Job Offer" && <AcceptedView />}
      {selectedJobCategory === "Position Filled" && <Rejected />}
      {selectedJobCategory === "Interviewing" && <InterviewingView />}
      {selectedJobCategory &&
        (selectedJobCategory === "Bookmarked" ||
          selectedJobCategory === "Applied") && <BookmarkedAppliedView />}
      {selectedJobCategory && selectedJobCategory === "Interviewed" && (
        <InterviewedView />
      )}
    </ModalWrapper>
  );
};

export default JobModal;
