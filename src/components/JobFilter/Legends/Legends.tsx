import React from "react";
import styles from "./Legends.module.css";

import { categoryColors } from "../categoryColors";

const Legends = (): JSX.Element => {
  return (
    <div className={styles.LegendContainer}>
      {Object.values(categoryColors).map((category) => (
        <div className={styles.LegendItem}>
          <div
            className={styles.LegendColor}
            style={{ backgroundColor: category.color }}
          ></div>
          <div className={styles.LegendLabel}>{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Legends;
