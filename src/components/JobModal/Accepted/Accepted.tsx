import React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import styles from "./AcceptedModal.module.css";
import { Container } from '@mui/system';

const Accepted = () => {

  const state = useSelector((state: RootState) => state.job);
  const selectedJob = state.selectedJob;
  
  return (
    <div className={styles.ModalBody}>
      <Typography variant="h5" className={styles.Congratulation}>
        Congratulations on getting a job offer!
      </Typography>
      <Typography variant="body1" className={styles.TopHeader}>
        To help you with the next steps, here are some resources to consider:
      </Typography>
      <Container className={styles.Suggestions}>
        <Typography variant="body1" className={styles.Paragraph}>
          1) Salary Negotiation Tips:
        </Typography>
        <Typography variant="body1" className={styles.Link}>
          http://www.example.com
        </Typography>
        <Typography variant="body1" className={styles.Paragraph}>
          2) Search up the average salary for your role:
        </Typography>
        <Typography variant="body1" className={styles.Link}>
          http://www.example.com
        </Typography>
        <Typography variant="body1" className={styles.Paragraph}>
          3) Here is a salary calculator to estimate your salary:
        </Typography>
        <Typography variant="body1" className={styles.Link}>
          http://www.example.com
        </Typography>
      </Container>
      {selectedJob?.job?.skills && <Typography variant="body2" className={styles.Skill}>
        <strong>Required Skills:</strong> {selectedJob?.job?.skills?.map((skill) => skill.name).join(", ")}
      </Typography>}

    </div>
  );
};

export default Accepted;;