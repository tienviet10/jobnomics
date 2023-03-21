import React from "react";

import styles from "./InterviewingView.module.css";
import { Box, Typography } from "@mui/material";

import { useGetAJob } from "../../../hooks/get-a-job";
import LoadingAnimation from "../../LoadingAnimation";

const InterviewingView = () => {
  const { selectedJob, skills } = useGetAJob();

  return (
    <>
      <Box
        className={styles.InterviewingContainer}
        sx={{ height: { xs: "46vh", sm: "47vh" } }}
      >
        {!selectedJob?.job?.interviewExamples ? (
          <div className={styles.LoadingContainer}>
            <LoadingAnimation />
            <Typography variant="subtitle2" sx={{ pt: 2 }}>
              Preparing sample interview questions and answers...
            </Typography>
          </div>
        ) : (
          <>
            <Box
              className={styles.QuestionsContainer}
              sx={{ p: { xs: "15px", sm: "20px", md: "30px" }, pb: 0 }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", pb: 2 }}
                gutterBottom
              >
                Sample Interview Q & A
              </Typography>
              <Typography variant="body1" className={styles.Questions}>
                {selectedJob?.job?.interviewExamples}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Typography
        variant="subtitle1"
        className={styles.Skills}
        sx={{
          fontSize: { xs: "13px", md: "16px" },
          lineHeight: { xs: "16px", md: "20px" },
        }}
      >
        <strong>Required Skills:</strong> {skills}
      </Typography>
    </>
  );
};

export default InterviewingView;
