import React, { useState } from "react";

import { useSelector } from "react-redux";

import type { RootState } from "../../../app/store";

import styles from "./InterviewedView.module.css";

const InterviewedView = () => {
  const [isNotepad, setIsNotepad] = useState(false);

  const selectedJobState = useSelector(
    (state: RootState) => state.job.selectedJob
  );

  console.log(selectedJobState);

  return <div>InterviewedView</div>;
};

export default InterviewedView;
