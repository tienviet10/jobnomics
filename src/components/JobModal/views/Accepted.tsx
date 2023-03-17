import React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import styles from "./AcceptedModal.module.css";

const Accepted = () => {

  const state = useSelector((state: RootState) => state.job);
  const selectedJob = state.selectedJob;
  console.log()
  return (
    <div className={styles.ModalBody}>
      <Typography variant="h5" className={styles.Congratulation}>
        Congratulations on getting a job offer!
      </Typography>
      <Typography variant="body1" gutterBottom>
        To help you with the next steps, here are some resources to consider:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Salary Negotiation Tips:
        http://www.example.com
      </Typography>
      <Typography variant="body1" gutterBottom>
        Search up the average salary for your role:
        http://www.example.com
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here is a salary calculator to estimate your salary:
      </Typography>
      {selectedJob?.job?.skills &&       <Typography variant="body2" gutterBottom>
        Required Skills: {selectedJob?.job?.skills?.map((skill)=> skill.name).join(", ")}
      </Typography>}

    </div>
  );
};

export default Accepted;;