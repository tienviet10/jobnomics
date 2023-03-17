import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Job, JobListProps } from '../../types/jobTypes';


const FilterList:React.FC<JobListProps> = ({listCal}): JSX.Element => {
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
        {listCal.length > 0 && listCal[0] && listCal.map((job: Job, index: number) => (
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