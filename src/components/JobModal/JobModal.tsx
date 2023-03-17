import { Typography, Modal, IconButton, Card, dividerClasses } from "@mui/material";

import React, { useEffect } from "react";
import type { RootState } from "../../app/store";

import { Close, Delete, Favorite, FavoriteBorder } from "@mui/icons-material";

import {
  toggleFavorite,
} from "../../features/jobSlice";
import {
  useUpdateJobMutation,
} from "../../app/services/job-api";
import { useDispatch, useSelector } from "react-redux";

import styles from "./JobModal.module.css";
import ModalWrapper from "../Modal";

const JobModal = () => {
  const state = useSelector((state: RootState) => state.job);
  const selectedJob = state.selectedJob;

  return (
    <ModalWrapper>
      
    </ModalWrapper>
  );
};

export default JobModal;
