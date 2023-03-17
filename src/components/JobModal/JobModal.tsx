import React from "react";
import styles from "./JobModal.module.css";

import ModalWrapper from "../Modal";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const JobModal = () => {
  const state = useSelector((state: RootState) => state.job);
  const selectedJob = state.selectedJob;

  return (
    <ModalWrapper>
      {/* from category -> display modal views accordingly */}
    </ModalWrapper>
  );
};

export default JobModal;
