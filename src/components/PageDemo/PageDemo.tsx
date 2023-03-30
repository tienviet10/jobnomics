import React from "react";

import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

const PageDemo = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(10),
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",

    padding: "20px 0",
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    position: "relative",
  }));

  const Divider = styled("div")(({ theme }) => ({
    width: "13%",
    height: "5px",
    backgroundColor: "primary.dark",
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  const demoData = [
    {
      name: "Job Board Page",
      image: "/images/job_board.png",
      title: "Drag and drop jobs into corresponding application category.",
      subimage: "/images/drop_down.png",
      subimageAlt: "drag and drop view",
      description:
        "Organize your job application in a single drag and drop board. You also have an option to pick the job status through a drop down menu for better mobile experience.",
    },
    {
      name: "Search Page",
      image: "/images/search.png",
      title: "Search for and filter your job applications.",
      description:
        '"I have no time to manually search for job application. I need a quicker way!" Look no further! Our search page allows you to view only the most relevant jobs and sort based on company name, job title, updated date, and favorited jobs.',
    },
    {
      name: "Note Page",
      image: "/images/note.png",
      title: "All of your interview notes in one place.",
      description:
        "Record your interview experience and refer to them for all of your future interviews.",
    },
    {
      name: "Calendar Modal",
      image: "/images/calendar.png",
      title: "See all interview dates in a calendar.",
      description:
        "Sick of overcrowded calendars? This calendar keeps tracks of only your interview dates so that you can focus on preparing for your upcoming interviews.",
    },
  ];

  return (
    <Box
      sx={{
        py: 10,
        bgcolor: "#E6F0FF",
        px: { lg: 0, xl: 30 },
        margin: "auto",
      }}
    >
      {demoData.map((demoPage, index) => (
        <CustomBox
          key={demoPage.name}
          sx={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}
        >
          <ImgContainer>
            <img
              src={demoPage.image}
              alt={demoPage.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                height: "auto",
                borderTopLeftRadius: index % 2 === 0 ? 0 : "20px",
                borderTopRightRadius: index % 2 === 0 ? "20px" : 0,
                borderBottomLeftRadius: index % 2 === 0 ? 0 : "20px",
                borderBottomRightRadius: index % 2 === 0 ? "20px" : 0,
              }}
            />
            {demoPage.subimage && (
              <img
                src={demoPage.subimage}
                alt={demoPage.subimageAlt}
                style={{
                  width: "calc(10vw + 20px)",
                  height: "calc(10vw + 20px)",
                  position: "absolute",
                  borderRadius: "50%",
                  right: "0",
                  bottom: "0",
                }}
              />
            )}
          </ImgContainer>

          <Box sx={{ width: { xs: "80vw", lg: "40vw" } }}>
            <Divider />
            <Typography
              sx={{
                fontSize: "35px",
                color: "primary.dark",
                fontWeight: "700",
                my: 3,
              }}
            >
              {demoPage.title}
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
            >
              {demoPage.description}
            </Typography>
          </Box>
          <Box sx={{ width: "50px" }}></Box>
        </CustomBox>
      ))}
    </Box>
  );
};

export default PageDemo;
