import React from "react";
import styles from "./ModalWrapper.module.css";
import { Typography, IconButton, Skeleton } from "@mui/material";
import { Close, Delete, Favorite } from "@mui/icons-material";

const ModalPlaceholder = () => {
  return (
    <>
      <div className={styles.ModalHeader}>
        <IconButton
          sx={{ position: "absolute", top: "15px", right: "15px" }}
        >
          <Close fontSize="medium" />
        </IconButton>
        <div className={styles.JobHeader}>
          <Typography
            variant="h5"
            className={styles.JobTitle}
            sx={{
              fontSize: { xs: "20px", sm: "24px" },
              fontWeight: "bold",
            }}
          >
            <Skeleton animation="wave" width={210} />
          </Typography>
          <Typography
            variant="h6"
            className={styles.JobCompany}
            sx={{ fontSize: { xs: "15px", sm: "20px" } }}
          >
            <Skeleton animation="wave" width={210} />
          </Typography>
          <Typography variant="caption" className={styles.JobUpdatedDate}>
            <Skeleton animation="wave" width={210} />
          </Typography>
        </div>
      </div>
      <div className={styles.ModalMain}>
        <Skeleton animation="wave" className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation={false} className={styles.PlaceHolderItem} />
        <Skeleton animation="wave" className={styles.PlaceHolderItem} />
      </div>
      <div className={styles.ModalFooter}>
        <IconButton
          className={styles.Button}
          disableRipple
        >
          <Typography className={styles.ButtonText}>Favorite</Typography>
          <Favorite fontSize="medium" />
        </IconButton>
        <IconButton
          className={styles.Button}
          disableRipple
        >
          <Typography className={styles.ButtonText}>Delete</Typography>
          <Delete fontSize="medium" />
        </IconButton>
      </div>
    </>
  );
};

export default ModalPlaceholder;