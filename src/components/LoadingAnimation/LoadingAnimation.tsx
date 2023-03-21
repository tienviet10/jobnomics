import React from "react";

import styles from "./LoadingAnimation.module.css";

const LoadingAnimation = () => {
  return (
    <div className={styles.Spinner}>
      <div className={styles.SpinnerItem}></div>
      <div className={styles.SpinnerItem}></div>
      <div className={styles.SpinnerItem}></div>
    </div>
  );
};

export default LoadingAnimation;
