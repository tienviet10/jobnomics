import React from "react";

import styles from "./PageLoader.module.css";

const PageLoader = () => {
  return (
    <div className={styles.PageLoaderContainer}>
      <div className={styles["loader-circle-9"]}>
        Loading
        <span></span>
      </div>
    </div>
  );
};

export default PageLoader;
