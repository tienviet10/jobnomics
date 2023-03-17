import React from "react";
import styles from "./JobModal.module.css";

import ModalWrapper from "../Modal";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import Accepted from "./Accepted/Accepted";
import Rejected from "./Rejected/Rejected";

import BookmarkedAppliedView from "./BookmarkedApplied";

const JobModal = () => {
  const state = useSelector((state: RootState) => state.job);
  const selectedJob = state.selectedJob;
  const selectedJobCategory = state.selectedJob?.category?.name;

  return (
    <ModalWrapper>
      {selectedJob?.category?.name === "Job Offer" && <Accepted/>}
      {selectedJob?.category?.name === "Position Filled" && <Rejected/>}
      {selectedJobCategory &&
        (selectedJobCategory === "Bookmarked" ||
          selectedJobCategory === "Applied") && <BookmarkedAppliedView />}
    </ModalWrapper>
  );
};

export default JobModal;
