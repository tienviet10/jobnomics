import React from "react";

import styles from "./PageLoader.module.css";

const PageLoader = () => {
  return (
    <div className={styles.PageLoaderContainer}>
      <div className={styles["pac-man"]} />
    </div>
  );
};

export default PageLoader;
