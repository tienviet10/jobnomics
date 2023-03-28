import React, { useState } from "react";

import styles from "./Legends.module.css";
import { Box } from "@mui/material";

import { categoryColors } from "../categoryColors";

const Legends = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category: { name: string }) => {
    if (selectedCategory === category.name) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category.name);
    }
  };

  const legendColumn = (
    category: { name: string; color: string },
    index: number
  ) => (
    <Box
      className={styles.LegendItem}
      key={index}
      onClick={() => handleCategoryClick(category)}
      sx={{
        "&:hover": { cursor: "pointer" },
        bgcolor:
          selectedCategory === category.name
            ? "accent.translucent"
            : "transparent",
      }}
    >
      <div
        className={styles.LegendColor}
        style={{ backgroundColor: category.color }}
      ></div>
      <div className={styles.LegendLabel}>{category.name}</div>
    </Box>
  );

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
          return index < 3 && legendColumn(category, index);
        })}
      </div>
      <div className={styles.LegendColumn2}>
        {Object.values(categoryColors).map((category, index) => {
          return index > 2 && legendColumn(category, index);
        })}
      </div>
    </Box>
  );
};

export default Legends;
