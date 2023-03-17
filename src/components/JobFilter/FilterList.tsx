import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Job } from '../../types/jobTypes';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useUpdateJobMutation } from '../../app/services/job-api';

type FilterListType = {
  prefetchData: () => Promise<void>;
}

const FilterList: React.FC<FilterListType> = ({ prefetchData }): JSX.Element => {
  const jobsList = useSelector((state: RootState) => state.filter.displayArrayJobs);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [updateJob] = useUpdateJobMutation();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (job: Job) => {
    updateJob({ jobId: job.id, categoryId: job.categoryId, type: "delete" });
    prefetchData();
    setAnchorEl(null);
  };

  return (
    <Table size="medium">
      <TableHead>
        <TableRow>
          <TableCell>Company</TableCell>
          <TableCell>Job Title</TableCell>
          <TableCell>Update At</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jobsList.length > 0 && jobsList[0] && jobsList.map((job: Job, index: number) => (
          <TableRow key={index}>
            <TableCell>{job.company}</TableCell>
            <TableCell>{job.title}</TableCell>
            <TableCell>{job.updatedAt}</TableCell>
            <TableCell>
              <div>
                <Button
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handleDelete(job)}>Delete</MenuItem>
                </Menu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FilterList;