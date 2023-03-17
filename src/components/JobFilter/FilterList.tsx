import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Job } from '../../types/jobTypes';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';


const FilterList = (): JSX.Element => {
  const jobsList = useSelector((state: RootState) => state.filter.arrayJobs);

  return (
    <Table size="medium">
      <TableHead>
        <TableRow>
          <TableCell>Company</TableCell>
          <TableCell>Job Title</TableCell>
          <TableCell>Update At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jobsList.length > 0 && jobsList[0] && jobsList.map((job: Job, index: number) => (
          <TableRow key={index}>
            <TableCell>{job.company}</TableCell>
            <TableCell>{job.title}</TableCell>
            <TableCell>{job.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FilterList;