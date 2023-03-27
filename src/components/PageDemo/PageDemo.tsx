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
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
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
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/70/Solid_white.svg",
      title: "Drag and drop jobs into corresponding application category.",
      subimage:
        "https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG?20100811194351",
      subimageAlt: "drag and drop view",
      description:
        "Organize your job application in a single drag and drop board. You also have an option to pick the job status through a drop down menu for better mobile experience.",
    },
    {
      name: "Job Board Page",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/70/Solid_white.svg",
      title: "Search for and filter your job applications.",
      // subimage:
      //   "https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG?20100811194351",
      //   subimageAlt: "drag and drop view",
      description:
        '"I have no time to manually search for job application. I need a quicker way!" Look no further! Our search page allows you to view only the most relevant jobs and sort based on company name, job title, updated date, and favorited jobs.',
    },
    {
      name: "Note Page",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/70/Solid_white.svg",
      title: "All of your interview notes in one place.",
      // subimage:
      //   "https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG?20100811194351",
      //   subimageAlt: "drag and drop view",
      description:
        "Record your interview experience and refer to them for all of your future interviews.",
    },
  ];

  return (
    <Box sx={{ py: 10, bgcolor: "#E6F0FF" }}>
      {/* <Container> */}
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
                height: "100%",

                borderRadius: "20px",
              }}
            />
          </ImgContainer>

          <Box sx={{ width: "40vw" }}>
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

      {/* </Container> */}
    </Box>
  );
};

export default PageDemo;
