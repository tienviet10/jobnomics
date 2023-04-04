import React from "react";

import { IconButton, styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { EmailRounded, LinkedIn, LocalPhoneRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  let navigate = useNavigate(); 

  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  const FooterLink = styled("span")(({ theme }) => ({
    fontSize: "16px",
    color: "#7A7A7E",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  }));

  return (
    <Box sx={{ py: 10 }}>
      <CustomContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/images/logo-dark.png"
            alt="jobnomics logo"
            style={{ width: "200px", objectFit: "contain" }}
          />
        </Box>
        <CustomContainer>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Resources
            </Typography>

            <FooterLink>About us</FooterLink>
            <br />
            <FooterLink>Support us</FooterLink>
            <br />
            <FooterLink>Story</FooterLink>
            <br />
            <FooterLink>Technology</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Company
            </Typography>

            <FooterLink>Partnerships</FooterLink>
            <br />
            <FooterLink>Terms of use</FooterLink>
            <br />
            <FooterLink onClick={()=> navigate("/privacy")}>Privacy</FooterLink>
            <br />
            <FooterLink>Sitemap</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Get in touch
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#7A7A7E",
                fontWeight: "500",
                mb: 2,
              }}
            >
              Feel free to reach out for any questions, comments or concerns!
            </Typography>

            <IconBox>
              <IconButton>
                <LinkedIn />
              </IconButton>
              <IconButton>
                <EmailRounded />
              </IconButton>
              <IconButton>
                <LocalPhoneRounded />
              </IconButton>
            </IconBox>
          </Box>
        </CustomContainer>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
