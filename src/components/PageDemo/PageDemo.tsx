import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";

// import buyIcon from "../media/buy_icon.png";
// import sellIcon from "../media/sell_icon.png";
// import rentIcon from "../media/rent_icon.png";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const PageDemo = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "100vw",
    padding: `${theme.spacing(8)} ${theme.spacing(5)}`,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    width: "250px",
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      width: "250px",
    },
    objectFit: "cover",
    margin: "20px auto",
  }));

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

      <GuidesBox>
        <GuideBox>
          <Box sx={{ height: "200px" }}>
            <img
              src={"/images/organize.svg"}
              alt="person organizing search result"
              style={{ height: "100%" }}
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
            Get email notification before interview date and after interview to
            keep track of interview experiences.
          </Typography>
        </GuideBox>

        <GuideBox>
          <Box sx={{ height: "200px" }}>
            <img
              src={"/images/time_management.svg"}
              alt="person in front of large clock"
              style={{ height: "100%" }}
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
        </GuideBox>

        <GuideBox>
          <Box sx={{ height: "200px" }}>
            <img
              src={"/images/question.svg"}
              alt="two people around a large question mark"
              style={{ height: "100%" }}
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
            Get sample interview questions and answers based on the specific job
            application.
          </Typography>
        </GuideBox>
      </GuidesBox>
    </Box>
  );
};

export default PageDemo;
