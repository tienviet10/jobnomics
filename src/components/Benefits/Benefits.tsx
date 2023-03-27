import React, { useState } from "react";

import { Box, Button, Card, Modal, styled, Typography } from "@mui/material";

const Benefits = () => {
  const [openOriginalJob, setOpenOriginalJob] = useState(false);
  const [openSummarizedJob, setOpenSummarizedJob] = useState(false);
  const [openQAndAJob, setOpenQAndAJob] = useState(false);

  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const BenefitsBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "100vw",
    padding: `${theme.spacing(8)} ${theme.spacing(5)}`,
    paddingBottom: 0,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const BenefitBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(5),
    width: "280px",
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      width: "250px",
    },
    objectFit: "cover",
    margin: "40px auto",
  }));

  const handleOriginalJobClose = () => {
    setOpenOriginalJob(false);
  };

  const handleSummarizedJobClose = () => {
    setOpenSummarizedJob(false);
  };

  const handleQAndAJobClose = () => {
    setOpenQAndAJob(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 10,
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{
          fontSize: "35px",
          fontWeight: "bold",
          color: "primary.dark",
          my: 3,
        }}
      >
        How it works?
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#5A6473",
            textAlign: "center",
          }}
        >
          Store and organize all of your job applications with the help of AI
          generated tools.
        </Typography>
      </CustomBox>

      <BenefitsBox>
        <BenefitBox>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                height: "200px",
                width: "80%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={"/images/newsletter.svg"}
                alt="person opening envelope"
                style={{ height: "90%" }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                color: "primary.dark",
                my: 1,
              }}
            >
              Get email notification before interview date and after interview
              to keep track of interview experiences.
            </Typography>
          </Box>
        </BenefitBox>

        <BenefitBox>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                height: "200px",
                width: "80%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={"/images/time_management.svg"}
                alt="person in front of large clock"
                style={{ height: "90%" }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                color: "primary.dark",
                my: 1,
              }}
            >
              Saves you time by displaying key point of the job information and
              technical skills needed for each job in less than 150 words.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "200px", mb: 1, mt: 1 }}
              onClick={() => setOpenOriginalJob(true)}
            >
              Original Job Posting
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "accent.dark", width: "200px" }}
              onClick={() => setOpenSummarizedJob(true)}
            >
              AI Summarized Job Description
            </Button>
          </Box>
        </BenefitBox>

        <BenefitBox>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                height: "200px",
                width: "80%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={"/images/question.svg"}
                alt="two people around a large question mark"
                style={{ height: "90%" }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                color: "primary.dark",
                my: 1,
              }}
            >
              Get sample interview questions and answers based on the specific
              job application.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ bgcolor: "accent.dark", width: "200px" }}
              onClick={() => setOpenSummarizedJob(true)}
            >
              AI Extracted Sample Interview Q & A
            </Button>
          </Box>
        </BenefitBox>
      </BenefitsBox>
      <Modal open={openOriginalJob} onClose={handleOriginalJobClose}>
        <Card></Card>
      </Modal>
      <Modal open={openSummarizedJob} onClose={handleSummarizedJobClose}>
        <Card></Card>
      </Modal>
      <Modal open={openQAndAJob} onClose={handleQAndAJobClose}>
        <Card></Card>
      </Modal>
    </Box>
  );
};

export default Benefits;
