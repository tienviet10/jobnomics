import React from "react";

import styles from "../JobModal/InterviewingView/InterviewingView.module.css";
import { Box, Typography, TextField, Button } from "@mui/material";
import { extractDate, extractTime } from "../../helper/date-extractor";

const SampleInterviewing = () => {
  return (
    <>
      <Box className={styles.DateTimePicker} sx={{ mb: 2 }}>
        <TextField
          id="date"
          label="Date"
          type="date"
          value={extractDate(new Date())}
          fullWidth
          size="small"
          sx={{ flex: { xs: 1 }, mr: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
          className={styles.DatePicker}
        />
        <TextField
          id="time"
          label="Time"
          type="time"
          size="small"
          value={extractTime(new Date())}
          fullWidth
          sx={{ flex: { xs: 1 }, mr: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
        />
        <Button
          sx={{
            maxWidth: { xs: "100%", sm: "150px" },
            px: "20px",
            flex: { xs: 0.5, sm: 1 },
          }}
          variant="contained"
          disableRipple
        >
          Update
        </Button>
      </Box>
      <Box
        className={styles.InterviewingContainer}
        sx={{ height: { xs: "38vh", sm: "47vh" } }}
      >
        <Box
          className={styles.QuestionsContainer}
          sx={{ p: { xs: "15px", sm: "20px", md: "30px" }, pb: 0 }}
        >
          <Typography variant="h6" sx={{ pb: 2 }} gutterBottom>
            Sample Interview Q & A
          </Typography>
          <Typography variant="body1" className={styles.Questions}>
            1. What experience do you have with writing client-side JavaScript
            and React Framework?{"\n"}
            {"\n"}I have 5 years of experience writing client-side JavaScript
            and React Framework.{"\n"}
            {"\n"}2. How do you approach building complex layouts with CSS and
            HTML?{"\n"}
            {"\n"}I approach building complex layouts with CSS and HTML by
            breaking down each component into smaller, more manageable pieces. I
            also use modern CSS techniques such as grid and flexbox to create
            responsive designs.{"\n"}
            {"\n"}3. Can you give an example of a complex system you built in a
            team environment?{"\n"}
            {"\n"}One example of a complex system I built in a team environment
            was a real-time chat application that utilized WebSockets for
            instant messaging. This required a lot of collaboration with backend
            engineers and UX designers to ensure a seamless user experience.
            {"\n"}
            {"\n"}4. How do you stay up-to-date with modern browser
            technologies?{"\n"}
            {"\n"}I stay up-to-date with modern browser technologies by
            attending conferences, reading tech blogs, and experimenting with
            new features in my personal projects.{"\n"}
            {"\n"}5. How do you handle production issues and bugs?{"\n"}
            {"\n"}I approach production issues and bugs by first identifying the
            root cause of the problem, then working with my team to come up with
            a solution. I prioritize critical issues and communicate effectively
            with stakeholders to ensure timely resolution.
          </Typography>
        </Box>
      </Box>
      <Typography variant="subtitle2" className={styles.Skills}>
        <strong>Required Skills:</strong> typescript, react, javascript, css,
        html, webrtc, performance optimization, websockets, local storage, ux
        design
      </Typography>
    </>
  );
};

export default SampleInterviewing;
