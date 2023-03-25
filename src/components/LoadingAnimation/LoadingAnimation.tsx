import React from "react";

import styles from "./LoadingAnimation.module.css";
import { Typography } from "@mui/material";

const LoadingAnimation = ({ children }: { children?: string }) => {
  return (
    <div className={styles.SpinnerContainer}>
      <div className={styles.Spinner}>
        <div className={styles.SpinnerItem}></div>
        <div className={styles.SpinnerItem}></div>
        <div className={styles.SpinnerItem}></div>
      </div>
      <Typography variant="subtitle2" sx={{ pt: 2 }}>
        {children}
      </Typography>
    </div>
  );
};

export default LoadingAnimation;
