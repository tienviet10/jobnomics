import React from "react";
import styles from "./JobModal.module.css";

import ModalWrapper from "../Modal";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

import BookmarkedAppliedView from "./BookmarkedApplied";
import Accepted from "./Accepted";
import Rejected from "./Rejected";
import Interviewing from "./Interviewing";
import InterviewedView from "./InterviewedView";

const JobModal = () => {
  const state = useSelector((state: RootState) => state.job);
  const selectedJobCategory = state.selectedJob?.category?.name;

  return (
    <ModalWrapper>
      {selectedJobCategory === "Job Offer" && <Accepted />}
      {selectedJobCategory === "Position Filled" && <Rejected />}
      {selectedJobCategory === "Interviewing" && <Interviewing />}
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
