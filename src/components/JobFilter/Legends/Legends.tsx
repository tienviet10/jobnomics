import React, { useState } from "react";

import styles from "./Legends.module.css";
import { Box } from "@mui/material";

import { categoryColors } from "../categoryColors";
import { DrawComponentType } from "../../../types/jobTypes";
import { useDispatch } from "react-redux";
import { toggleCheck } from "../../../features/filterSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const Legends: React.FC<DrawComponentType> = ({updateCategoryFilter, sentFilterRequest}): JSX.Element => {
  // const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const filterState = useSelector(
    (state: RootState) => state.filter.mainFilter.category
  );

  const selectedCategory = filterState.filter((val)=> val.check).map((val)=> val.name)

  const  dispatch = useDispatch()

  const handleCategoryClick = async (category: { name: string }) => {
    if (selectedCategory.includes(category.name)) {
      dispatch(toggleCheck(
        {
            cate: "category",
            name: category.name,
            auto: false,
            check: false
          }
      ));
      // setSelectedCategory(prev => prev.filter((val)=> val !== category.name));
    } else { 
      dispatch(toggleCheck(
        {
            cate: "category",
            name: category.name,
            auto: false,
            check: true
          }
      ));
      // setSelectedCategory(prev => ([...prev,category.name]));
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
          selectedCategory.includes(category.name)
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
