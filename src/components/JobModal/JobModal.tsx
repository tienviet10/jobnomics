import React from "react";
import styles from "./JobModal.module.css";

import ModalWrapper from "../Modal";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import Accepted from "./views/Accepted";
import Rejected from "./views/Rejected";

const JobModal = () => {
  const state = useSelector((state: RootState) => state.job);
  const selectedJob = state.selectedJob;
 

  return (
    <ModalWrapper>
      {selectedJob?.category?.name === "Job Offer" && <Accepted/>}
      {selectedJob?.category?.name === "Position Filled" && <Rejected/>}
      {/* from category -> display modal views accordingly */}
    </ModalWrapper>
  );
};

export default JobModal;
