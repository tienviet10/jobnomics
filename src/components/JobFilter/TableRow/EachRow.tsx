import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import {
  useChangeFavoriteOnlyMutation,
  useUpdateJobMutation,
} from "../../../app/services/job-api";
import { useDispatch } from "react-redux";
import { setModalId, toggleJobModal } from "../../../features/jobSlice";

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
import { EachRowType, Job } from "../../../types/jobTypes";
import { useGetAJob } from "../../../hooks/get-a-job";
import { setFavoriteLocally } from "../../../features/filterSlice";

const EachRow: React.FC<EachRowType> = ({
  job,
  menuStates,
  handleMenuOpen,
  handleMenuClose,
  handleDelete,
  handleRecover,
}): JSX.Element => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  // const [localFavorite, setLocalFavorite] = useState<boolean>(job?.isFavorite);
  const [updateFavorite] = useChangeFavoriteOnlyMutation();
  const { refetch } = useGetAJob();

  const handleToggleFavorite = async (job: Job) => {
    // setLocalFavorite((prev) => {
    //   updateFavorite({
    //     jobId: job.id,
    //     categoryId: job.categoryId,
    //     favorite: !prev,
    //   });
    //   return !prev;
    // });
    await updateFavorite({
      jobId: job.id,
      categoryId: job.categoryId,
      favorite: !job.isFavorite,
    });
    dispatch(setFavoriteLocally(job))
    console.log(job)
  };

  const handleOpenModal = async (job: Job) => {
    dispatch(setModalId({ jobId: job.id, categoryId: job.categoryId }));
    // Same fix as JobItem
    await refetch();
    dispatch(toggleJobModal(true));
  };

  // useEffect(() => {
  //   setLocalFavorite(job?.isFavorite);
  // }, [job?.isFavorite]);

  return (
    <TableRow hover className={styles.JobRow}>
      <TableCell
        className={styles.JobLogo}
        onClick={() => handleOpenModal(job)}
        sx={{
          "&::WebkitBoxShadow": `15px 0 0 ${
            categoryColors[job.categoryId].color
          } inset`,
          "&::MozBoxShadow": `15px 0 0 ${
            categoryColors[job.categoryId].color
          } inset`,
          boxShadow: `15px 0 0 ${categoryColors[job.categoryId].color} inset`,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar
          variant="square"
          src={job.logo}
          alt={job.company}
          sx={{ bgcolor: job.avatarColor, ml: 2 }}
        />
      </TableCell>
      <TableCell
        onClick={() => handleOpenModal(job)}
        sx={{
          color: job.isActive ? "#000000" : "neutral.darker",
        }}
      >
        {job.company}
      </TableCell>
      <TableCell
        onClick={() => handleOpenModal(job)}
        sx={{
          color: job.isActive ? "#000000" : "neutral.darker",
          minWidth: "200px",
        }}
      >
        {job.title}
      </TableCell>

      <TableCell
        align="center"
        onClick={() => handleOpenModal(job)}
        sx={{
          color: job.isActive ? "#000000" : "neutral.darker",
        }}
      >
        {new Date(job.updatedByUserAt).toLocaleDateString(user?.locale)}
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => handleToggleFavorite(job)}
          sx={{
            color: job.isActive ? "#000000" : "neutral.dark",
          }}
          disabled={!job.isActive}
        >
          {job.isFavorite ? <Favorite /> : <FavoriteBorder />}
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
          {!job.isActive && (
            <MenuItem onClick={() => handleRecover(job)}>Reactivate</MenuItem>
          )}
          <MenuItem onClick={() => handleDelete(job)}>Delete</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default EachRow;
