import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import styles from "./RejectedModal.module.css";
import { Container } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleJobModal } from '../../../features/jobSlice';
import { useRejectedReasonMutation } from '../../../app/services/job-api';

const Rejected = () => {
  const dispatch = useDispatch();
  const [updateReason] = useRejectedReasonMutation();
  const state = useSelector((state: RootState) => state.job);
  const selectedJob = state.selectedJob;
  console.log(selectedJob)

  const [toggle, setToggle] = useState(false);
  const [reason, setReason] = useState("");

  const handleOptionChange = (e: any) => {
    if (e.target.value === "other") {
      setToggle(true);
    } else {
      setToggle(false);
      setReason(e.target.value)
    }
  };

  const handleTextChange = (e: any) => {
    setReason(e.target.value)
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (reason) {
      updateReason({jobId: selectedJob?.job?.id, categoryId: selectedJob?.category?.id, reason});
      dispatch(toggleJobModal(false));
    }

  };
  return (
    <div className={styles.ModalBody}>
      <Typography variant="h5" className={styles.Rejection}>
        How were you informed about your rejection?
      </Typography>
      <Container className={styles.MainContainer} >
        <FormControl className={styles.FormStyle}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            className={styles.RadioStyles}
          >
            <FormControlLabel value="I got an email" control={<Radio />} label="I got an email" onClick={handleOptionChange} />
            <FormControlLabel value="I received a phone call" control={<Radio />} label="I received a phone call" onClick={handleOptionChange} />
            <FormControlLabel value="They ghost me" control={<Radio />} label="They ghost me" onClick={handleOptionChange} />
            <FormControlLabel value="other" control={<Radio />} label="Other" onClick={handleOptionChange} />
            {toggle ? <TextField
              variant="standard"
              color="primary"
              focused
              placeholder='Type Here'
              onChange={handleTextChange} className={styles.TextStyle}
            />
              : <Box className={styles.Placeholder}></Box>}
          </RadioGroup>
        </FormControl>
        <Box className={styles.BtnBox}><Button variant="contained" className={styles.Btn} onClick={handleSubmit} >Submit</Button></Box>

      </Container>
      {selectedJob?.job?.skills && <Typography variant="body2" className={styles.Skill}>
        Required Skills:  <strong>{selectedJob?.job?.skills?.map((skill) => skill.name).join(", ")}</strong>
      </Typography>}

    </div>
  );
};

export default Rejected;