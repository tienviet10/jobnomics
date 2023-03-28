import React, { useState, useEffect } from "react";
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
  InputAdornment,
} from "@mui/material";
import { ClearRounded, Close, Error } from "@mui/icons-material";
import { CreateJobModalPropType } from "../../types/jobTypes";

import LoadingAnimation from "../LoadingAnimation";

const CreateJobModal = ({
  open,
  setOpen,
}: CreateJobModalPropType): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [useLink, setUseLink] = useState(true);
  const [addJob, { isLoading: isPosting, isSuccess, isError }] =
    useAddJobMutation();
  const [error, setError] = useState(false);
  const [warningText, setWarningText] = useState("");

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
    setWarningText("");
  };

  const handleCloseWhenFail = () => {
    setOpen(false);
    setError(false);
  };

  const handleSaveJobClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (value.trim()) {
      addJob({
        manualForm: null,
        jobLink: value,
        interviewDate: null,
        type: "link",
      });
    } else {
      setWarningText("Please enter a valid link.");
    }
  };

  const handleManualJobSubmit = () => {
    const prepareTitle = formResponse.title.trim();
    const prepareCompany = formResponse.company.trim();
    const prepareLocation = formResponse.location.trim();
    const preparePlatform = formResponse.platform.trim();
    const prepareLink = formResponse.link.trim();
    const prepareDescription = formResponse.description.trim();

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
    } else {
      setWarningText("You cannot not submit incomeplete forms.");
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
      setWarningText("");
    }
    if (isError) {
      setError(isError);
    }
  }, [isSuccess, isError]);

  const handleEmptyInput = () => {
    setValue("");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.CreateJobModalContainer}
    >
      <Card elevation={5} className={styles.CreateJobModal}>
        <IconButton
          className={styles.CloseButton}
          sx={{ position: "absolute" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>

        {!error && !isPosting && useLink && (
          <Box
            sx={{
              px: { xs: 4, sm: "60px", md: "100px" },
              py: { xs: 6, sm: "120px", md: "130px" },
              pb: { xs: 2, sm: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className={styles.FormInstruction}>
              <Typography variant="h6" gutterBottom>
                Copy and paste the link to the job posting below:
              </Typography>
              <Alert
                severity="info"
                sx={{ backgroundColor: "accent.translucent" }}
              >
                At the moment, we only support{" "}
                <strong style={{ fontWeight: "bold" }}>LinkedIn</strong> ,{" "}
                <strong style={{ fontWeight: "bold" }}>ZipRecruiter</strong> and{" "}
                <strong style={{ fontWeight: "bold" }}>Indeed (Beta)</strong>.
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
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="empty input field"
                    onClick={handleEmptyInput}
                    edge="end"
                  >
                    {value && <ClearRounded />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {warningText && <Alert severity="error">{warningText}</Alert>}
            <Button
              variant="contained"
              className={styles.saveButton}
              onClick={handleSaveJobClick}
              sx={{
                mt: 2,
                width: { xs: "100%", sm: "200px" },
                alignSelf: "flex-end",
              }}
            >
              Save New Job
            </Button>
          </Box>
        )}
        {!error && !isPosting && !useLink && (
          <Box
            sx={{
              px: { xs: 4, sm: "60px", md: "100px" },
              py: { xs: 4, sm: 7, md: 10 },
              pt: { xs: 6 },
              pb: { xs: 0, sm: 0, md: 0 },
            }}
          >
            <div className={styles.FormInstruction}>
              <Typography variant="h6" textAlign="center" gutterBottom>
                Please fill out the form below to create a new job
              </Typography>
            </div>
            <form onSubmit={handleManualJobSubmit} className={styles.JobForm}>
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
                  width: { xs: "100%", sm: "200px", alignSelf: "flex-end" },
                }}
              >
                Save New Job
              </Button>
            </form>
          </Box>
        )}
        {isPosting && (
          <div className={styles.LoadingAnimation}>
            <LoadingAnimation>Preparing Job Summary...</LoadingAnimation>
          </div>
        )}
        {error && (
          <Box
            className={styles.errorModal}
            sx={{
              pt: { xs: 8, sm: 10, md: 10, lg: 15 },
              px: { xs: 4, sm: 6, md: 8 },
              pb: { xs: 4, sm: 5, md: 8, lg: 12 },
            }}
          >
            <Error color="error" sx={{ mb: 2, fontSize: 40 }} />
            <Typography variant="body1" textAlign={"center"}>
              There was an error. Please try again!
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3, width: { xs: "100%", sm: "200px" } }}
              onClick={() => handleCloseWhenFail()}
            >
              Okay
            </Button>
          </Box>
        )}
        {!error && !isPosting && (
          <Box
            className={styles.ModalFooter}
            sx={{ mt: { xs: 0.5, sm: 3 }, mb: { xs: 2, sm: 3 } }}
          >
            <Button
              className={styles.toggleCreateFormButton}
              onClick={() => {
                setUseLink((prev) => !prev);
                setWarningText("");
              }}
              sx={{ color: "accent.dark" }}
            >
              {useLink ? "Add Job Manually" : "Add Job With a Link"}
            </Button>
          </Box>
        )}
      </Card>
    </Modal>
  );
};

export default CreateJobModal;
