import React from "react";
import styles from "./Legends.module.css";

import { categoryColors } from "../categoryColors";
import { Box } from "@mui/material";

const Legends = (): JSX.Element => {
  return (
    <Box
      className={styles.LegendContainer}
      sx={{
        width: { xs: "100%", sm: "inherit" },
        mb: { xs: 0, sm: 2 },
        my: 2,
      }}
    >
      <div className={styles.LegendColumn1}>
        {Object.values(categoryColors).map((category, index) => {
          return (
            index < 3 && (
              <div className={styles.LegendItem}>
                <div
                  className={styles.LegendColor}
                  style={{ backgroundColor: category.color }}
                ></div>
                <div className={styles.LegendLabel}>{category.name}</div>
              </div>
            )
          );
        })}
      </div>
      <div className={styles.LegendColumn2}>
        {Object.values(categoryColors).map((category, index) => {
          return (
            index > 2 && (
              <div className={styles.LegendItem}>
                <div
                  className={styles.LegendColor}
                  style={{ backgroundColor: category.color }}
                ></div>
                <div className={styles.LegendLabel}>{category.name}</div>
              </div>
            )
          );
        })}
      </div>
    </Box>
  );
};

export default Legends;
