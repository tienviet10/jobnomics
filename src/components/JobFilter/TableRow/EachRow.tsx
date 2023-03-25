import React, { useEffect, useState } from "react";
import styles from "./EachRow.module.css";
import {
  IconButton,
  TableCell,
  TableRow,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import { categoryColors } from "../categoryColors";
import { useAuth0 } from "@auth0/auth0-react";
import { Job } from "../../../types/jobTypes";
import { useUpdateJobMutation } from "../../../app/services/job-api";
import { useDispatch } from "react-redux";
import { setModalId, toggleJobModal } from "../../../features/jobSlice";


const EachRow: React.FC<any> = ({ job, menuStates, handleMenuOpen, handleMenuClose, handleDelete }): JSX.Element => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [localFavorite, setLocalFavorite] = useState<boolean>(job?.isFavorite);
  const [updateJob] = useUpdateJobMutation();

  const handleToggleFavorite = (job: Job) => {
    setLocalFavorite(!job.isFavorite);
    console.log("Job",job)
    updateJob({
      jobId: job.id,
      categoryId: job.categoryId,
      favorite: !job.isFavorite,
      interviewDate: job.interviewDate,
      type: "update",
    });
  };

  const handleOpenModal = (job: Job) => {
    dispatch(setModalId({ jobId: job.id, categoryId: job.categoryId }));
    dispatch(toggleJobModal(true));
  };

  useEffect(()=>{
    setLocalFavorite(job?.isFavorite);
  },[job?.isFavorite])


  return (
    <TableRow
      hover
      className={styles.JobRow}
      sx={{
        boxShadow: `6px 0 0 ${categoryColors[job.categoryId].color
          } inset`,
      }}
    >
      <TableCell
        className={styles.JobLogo}
        onClick={() => handleOpenModal(job)}
      >
        <Avatar variant="square" src={job.logo} alt={job.company} />
      </TableCell>
      <TableCell
        onClick={() => handleOpenModal(job)}
        sx={{
          color: job.isActive ? "#000000" : "#A9A9A9",
          fontWeight: job.isActive ? "normal" : "bold",
        }}
      >
        {job.company}
      </TableCell>
      <TableCell
        onClick={() => handleOpenModal(job)}
        sx={{
          color: job.isActive ? "#000000" : "#A9A9A9",
          fontWeight: job.isActive ? "normal" : "bold",
        }}
      >
        {job.title}
      </TableCell>

      <TableCell
        align="center"
        onClick={() => handleOpenModal(job)}
        sx={{
          color: job.isActive ? "#000000" : "#A9A9A9",
          fontWeight: job.isActive ? "normal" : "bold",
        }}
      >
        {new Date(job.updatedByUserAt).toLocaleDateString(
          user?.locale
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => handleToggleFavorite(job)}
          sx={{
            color: job.isActive ? "#000000" : "#A9A9A9",
            fontWeight: job.isActive ? "normal" : "bold",
          }}
          disabled={!job.isActive}
        >
          {localFavorite ? (
            <Favorite />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <Button
          aria-controls={`basic-menu-${job.id}`}
          aria-haspopup="true"
          aria-expanded={menuStates[job.id]?.open}
          onClick={(event) => handleMenuOpen(job, event)}
        >
          <MoreVert />
        </Button>
        <Menu
          id={`basic-menu-${job.id}`}
          key={job.id}
          anchorEl={menuStates[job.id]?.anchorEl}
          open={menuStates[job.id]?.open || false}
          onClose={() => handleMenuClose(job)}
          MenuListProps={{
            "aria-labelledby": `basic-button-${job.id}`,
          }}
        >
          <MenuItem onClick={() => handleDelete(job)}>
            Delete
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default EachRow;
