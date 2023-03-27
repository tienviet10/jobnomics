import React, { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import styles from "../JobModal/BookmarkedApplied/BookmarkedAppliedView.module.css";

const SampleBookmarked = () => {
  const [isDetail, setIsDetail] = useState(false);

  const toggleDetailView = () => {
    setIsDetail((prev) => !prev);
  };

  return (
    <>
      <Box className={styles.BookedAppliedContainer}>
        <Box
          className={styles.JobDescription}
          sx={{ p: { xs: "15px", sm: "30px", md: "45px" }, pb: 0 }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Job Summary:
          </Typography>
          <Typography variant="body1" paragraph>
            {isDetail
              ? "To get the best candidate experience, please consider applying for a maximum of 3 roles within 12 months to ensure you are not duplicating efforts. Job Category Products and Technology Job Details This is a general job posting. We are hiring at the Software II, Senior, and Staff levels. About Slack Slack is your Digital HQ – a place where work flows between your people, systems, partners, and customers. From Fortune 100 companies to corner markets, millions of people around the world use Slack to connect their teams, unify their systems, and drive their business forward. Slack breaks down communication silos inside and beyond your organization by bringing teams and tools together around common goals, projects and processes in channels and in Slack Connect. It removes the limits of physical walls, giving people the flexibility to do their best work where, when and how they prefer with features like huddles and clips. And it empowers everyone to automate common tasks with apps and workflows. In this digital-first era, Slack’s mission is to make people’s work lives simpler, more pleasant, and more productive. A taste of our scale and reach: 77% of the fortune 100 use Slack 150+ countries have daily active users in Slack Slack delivers 300k+ messages per second To date, 1.79 trillion messages have been sent on Slack 2.65 Billion actions are taken in Slack each day Slack has 200k+ paid customers About The Team We're looking for people who are passionate about crafting phenomenal web applications. As a Frontend Engineer you’ll use your extensive knowledge of JavaScript, HTML, and CSS to improve the Slack web client, a complex in-browser application relied upon by millions of users every day. You will work with real-time data streams, engineer for performance across browsers, and delight people by making the best software we can imagine. You will collaborate closely with Product, Design, Application Engineering, and QA to spec, conceptualize, build, test and deploy new features for our large (and growing!) user base. We’re currently hiring different levels of Frontend Engineers across pillars such as Conversations Search & Channels, Canvas, Quip, Virtual HQ, Developer Experience, Line of Business, Network, Expansion, and Platform. What You Will Be Doing You'll brainstorm with Product Managers and Designers to conceptualize new features. You'll collaborate with Application Engineering to build new features for our large-and-growing user base. You'll learn about new web technologies and discuss potential solutions to problems. You'll help our skilled support team triage bugs and tackle production issues. You'll mentor other engineers and deeply review code. What You Should Have 3-15+ years of experience writing client-side JavaScript and React Framework. Expertise in building complex layouts with CSS and HTML. Experience building and debugging complex systems in a team environment. Experience with modern browser technologies. Strong UX and design sensibilities, and a desire to sweat the small stuff. Strong communication skills, a positive attitude, and empathy. Self-­awareness and a desire to continually improve. You have a bachelor's degree in Computer Science, Engineering or related field, or equivalent training, fellowship, or work experience. Bonus Points Experience with Typescript. Experience with WebRTC. Experience investigating and improving JavaScript performance. Experience with WebSockets, Local Storage, or ES6. Experience in small start­up environments. Experience designing web sites or applications. Slack has a positive, diverse, and supportive culture—we look for people who are curious, inventive, and work to be a little better every single day. In our work together we aim to be smart, humble, hardworking and, above all, collaborative. If this sounds like a good fit for you, why not say hello? Accommodations If you require assistance due to a disability applying for open positions please submit a request via this Accommodations Request Form. Posting Statement At Salesforce we believe that the business of business is to improve the state of our world. Each of us has a responsibility to drive Equality in our communities and workplaces. We are committed to creating a workforce that reflects society through inclusive programs and initiatives such as equal pay, employee resource groups, inclusive benefits, and more. Learn more about Equality at Salesforce and explore our benefits. Salesforce, Inc . and Salesforce.org are Equal Employment Opportunity and Affirmative Action Employers. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status. Salesforce, Inc . and Salesforce.org do not accept unsolicited headhunter and agency resumes. Salesforce, Inc . and Salesforce.org will not pay any third-party agency or company that does not have a signed agreement with Salesforce, Inc . or Salesforce.org . Salesforce welcomes all. Show more Seniority level Mid-Senior level Employment type Full-time Job function Engineering and Information Technology Industries Technology, Information and Internet"
              : "To improve candidate experience, Slack suggests applying for a maximum of 3 roles within 12 months to avoid duplication of efforts. Slack is a digital HQ that connects teams, systems, partners, and customers globally. The company is hiring for Frontend Engineers at Software II, Senior, and Staff levels for its various pillars. The role involves brainstorming with Product Managers, building new features, and mentoring other engineers. Candidates should have 3-15+ years of experience in client-side JavaScript and React Framework, building complex layouts with CSS and HTML, and strong communication skills. Bonus skills include experience with Typescript, WebRTC, and JavaScript performance improvement."}
          </Typography>
          <Typography variant="subtitle2">
            Skills:{" "}
            <span>
              typescript, react, javascript, css, html, webrtc, performance
              optimization, websockets, local storage, ux design
            </span>
          </Typography>
        </Box>
      </Box>{" "}
      <Button
        variant="text"
        className={styles.ToggleDetailButton}
        onClick={toggleDetailView}
        sx={{ color: "accent.main" }}
      >
        {isDetail ? "View Summary" : "View Details"}
      </Button>
    </>
  );
};

export default SampleBookmarked;
