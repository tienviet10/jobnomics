import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
import { useAddJobMutation } from "../../app/services/job-api";

import styles from "./CreateJobModal.module.css";
import {
  Card,
  IconButton,
  Modal,
  Input,
  Typography,
  Button,
  Alert,
  Box,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { CreateJobModalPropType } from "../../types/jobTypes";

import LoadingAnimation from "../LoadingAnimation";

// const socket = io("http://localhost:8080", {
//   withCredentials: true,
// });

const CreateJobModal = ({
  open,
  setOpen,
}: CreateJobModalPropType): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [useLink, setUseLink] = useState(true);
  const [addJob, result] = useAddJobMutation();
  const [error, setError] = useState(false);

  const { isLoading: isPosting, isSuccess, isError } = result;
  const [formResponse, setFormResponse] = useState({
    title: "",
    company: "",
    location: "",
    platform: "",
    link: "",
    description: "",
  });

  const handleClose = () => {
    setOpen(false);
    setUseLink(true);
    setError(false);
  };

  console.log(result);

  // useEffect(() => {
  //   const onConnect = () => {
  //     console.log("Connected!");
  //   };

  //   const onAddJob = () => {
  //     refetch()
  //   };

  //   socket.on("connect", onConnect);

  //   socket.emit("add-job");

  //   socket.on("add-job", onAddJob);

  //   return () => {
  //     socket.off("connect");
  //     socket.off("add-job");
  //   };
  // }, [isSuccess]);

  const handleSaveJobClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (value.trim()) {
      addJob({
        manualForm: null,
        jobLink: value,
        interviewDate: null,
        type: "link",
      });
    }
  };

  const handleManualJobSubmit = () => {
    const prepareTitle = formResponse.title.trim();
    const prepareCompany = formResponse.company.trim();
    const prepareLocation = formResponse.location.trim();
    const preparePlatform = formResponse.platform.trim();
    const prepareLink = formResponse.link.trim();
    const prepareDescription = formResponse.description.trim();

    console.log(
      prepareTitle,
      prepareCompany,
      prepareLocation,
      preparePlatform,
      prepareLink,
      prepareDescription
    );
    if (
      prepareTitle &&
      prepareCompany &&
      prepareLocation &&
      prepareLink &&
      prepareDescription
    ) {
      const data = {
        title: prepareTitle,
        company: prepareCompany,
        location: prepareLocation,
        platform: preparePlatform,
        link: prepareLink,
        description: prepareDescription,
      };

      addJob({
        manualForm: data,
        jobLink: prepareLink,
        interviewDate: null,
        type: "manual",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setValue("");
      setOpen(false);
      setFormResponse({
        title: "",
        company: "",
        location: "",
        platform: "",
        link: "",
        description: "",
      });
      setUseLink(true);
    }
    if (isError) {
      setError(isError);
    }
  }, [isSuccess, isError]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.CreateJobModalContainer}
    >
      <Card
        elevation={5}
        className={styles.CreateJobModal}
        sx={{
          px: { xs: 4, sm: "60px", md: "100px" },
          py: { xs: 4, sm: "80px", md: "100px" },
          pb: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <IconButton
          className={styles.CloseButton}
          sx={{ position: "absolute" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>

        <div className={styles.ModalMain}>
          {!error && !isPosting && useLink && (
            <>
              <div className={styles.FormInstruction}>
                <Typography variant="h6" gutterBottom>
                  Copy and paste the link to the job posting below:
                </Typography>
                <Alert severity="info">
                  At the moment, we only support{" "}
                  <strong style={{ fontWeight: "bold" }}>LinkedIn</strong> and{" "}
                  <strong style={{ fontWeight: "bold" }}>ZipRecruiter</strong>.
                </Alert>
              </div>
              <Input
                required
                placeholder="https://"
                autoFocus={false}
                size="medium"
                fullWidth
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
                sx={{ my: 2 }}
              />
              <Button
                variant="contained"
                className={styles.saveButton}
                onClick={handleSaveJobClick}
                sx={{ mt: 2, width: { xs: "100%", sm: "200px" } }}
              >
                Save New Job
              </Button>
            </>
          )}
          {!error && !isPosting && !useLink && (
            <>
              <div className={styles.FormInstruction}>
                <Typography variant="h6" textAlign="center" gutterBottom>
                  Please fill out the form below to create a new job
                </Typography>
              </div>
              <form onSubmit={handleManualJobSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    mb: 2,
                  }}
                  className={styles.ShortInputContainer}
                >
                  <TextField
                    required
                    placeholder="e.g., React Developer"
                    autoFocus={false}
                    size="small"
                    label="Job Title"
                    value={formResponse.title}
                    onChange={(event) => {
                      setFormResponse((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }));
                    }}
                    sx={{
                      mr: { xs: 0, sm: 2 },
                      mb: { xs: 2, sm: 0 },
                      flex: 1,
                      minWidth: { xs: "240px" },
                      width: { xs: "100%" },
                    }}
                  />
                  <TextField
                    required
                    placeholder="e.g., Job Inc."
                    autoFocus={false}
                    size="small"
                    label="Company Name"
                    value={formResponse.company}
                    onChange={(event) => {
                      setFormResponse((prev) => ({
                        ...prev,
                        company: event.target.value,
                      }));
                    }}
                    sx={{
                      flex: 1,
                      minWidth: { xs: "270px" },
                      width: { xs: "100%" },
                    }}
                  />
                </Box>
                <Box
                  className={styles.ShortInputContainer}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    mb: 2,
                  }}
                >
                  <TextField
                    required
                    placeholder="e.g., Toronto, ON (Remote)"
                    autoFocus={false}
                    size="small"
                    value={formResponse.location}
                    label="Location"
                    onChange={(event) => {
                      setFormResponse((prev) => ({
                        ...prev,
                        location: event.target.value,
                      }));
                    }}
                    sx={{
                      mr: { xs: 0, sm: 2 },
                      mb: { xs: 2, sm: 0 },
                      flex: 1,
                      minWidth: { xs: "270px" },
                      width: { xs: "100%" },
                    }}
                  />
                  <TextField
                    placeholder="e.g., Indeed, LinkedIn"
                    autoFocus={false}
                    size="small"
                    label="Job Platform"
                    value={formResponse.platform}
                    onChange={(event) => {
                      setFormResponse((prev) => ({
                        ...prev,
                        platform: event.target.value,
                      }));
                    }}
                    sx={{
                      flex: 1,
                      minWidth: { xs: "270px" },
                      width: { xs: "100%" },
                    }}
                  />
                </Box>
                <TextField
                  required
                  placeholder="https://www.example.com"
                  autoFocus={false}
                  size="small"
                  fullWidth
                  label="Link"
                  value={formResponse.link}
                  onChange={(event) => {
                    setFormResponse((prev) => ({
                      ...prev,
                      link: event.target.value,
                    }));
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  required
                  placeholder="Copy and paste the entire job description for optimal results."
                  autoFocus={false}
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                  label="Job Description"
                  value={formResponse.description}
                  onChange={(event) => {
                    setFormResponse((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }));
                  }}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.saveButton}
                  sx={{
                    width: { xs: "100%", sm: "200px" },
                  }}
                >
                  Save New Job
                </Button>
              </form>
            </>
          )}
          {isPosting && (
            <div className={styles.LoadingContainer}>
              <LoadingAnimation />
              <Typography variant="subtitle2">
                Preparing Job Summary...
              </Typography>
            </div>
          )}
          {error && (
            <Typography variant="body1">
              There was an error. Please try again!
            </Typography>
          )}
        </div>
        <Box className={styles.ModalFooter}>
          <Button
            className={styles.toggleCreateFormButton}
            onClick={() => {
              setUseLink((prev) => !prev);
            }}
            sx={{ visibility: error ? "hidden" : "inherit" }}
          >
            {useLink ? "Add Job Manually" : "Add Job With a Link"}
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default CreateJobModal;
