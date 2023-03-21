import React, { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { CheckBoxEntity, DrawComponentType } from "../../../types/jobTypes";

import { FilterList } from "@mui/icons-material";
import {
  Drawer,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Box,
  Typography,
} from "@mui/material";
import styles from "./FilterDrawer.module.css";

const choices = [
  { name: "Application Status", filter: "category" },
  { name: "Languages", filter: "languages" },
  { name: "Framework", filter: "framework" },
];

const FilterDrawer: React.FC<DrawComponentType> = ({
  updateCategoryFilter,
  sentFilterRequest,
}): JSX.Element => {
  const filterState = useSelector(
    (state: RootState) => state.filter.mainFilter
  );
  const [state, setState] = useState<boolean>(false);

  const handleSentRequest = () => {
    sentFilterRequest();
    setState(false);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };

  const list = () => (
    <>
      <Box
        className={styles.FilterDrawerContainer}
        role="presentation"
        // onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {choices.map((choice) => {
          return (
            <FormControl
              key={choice.filter}
              sx={{
                mt: { xs: 5, sm: 8 },
                ml: { xs: 4, sm: 10, lg: 15 },
                width: { xs: "100%", sm: "150px" },
              }}
              component="fieldset"
              variant="standard"
              className={styles.FilterColumn}
            >
              <FormLabel component="legend" sx={{ pb: 2 }}>
                {choice.name}
              </FormLabel>
              <FormGroup>
                {filterState[choice.filter].map((cate: CheckBoxEntity) => (
                  <FormControlLabel
                    key={cate.name}
                    control={
                      <Checkbox
                        checked={cate.check}
                        onChange={updateCategoryFilter({
                          ...cate,
                          cate: choice.filter,
                          auto: false,
                        })}
                        name={cate.name}
                      />
                    }
                    label={cate.name}
                  />
                ))}
              </FormGroup>
            </FormControl>
          );
        })}
      </Box>
      <Button
        variant="contained"
        onClick={handleSentRequest}
        sx={{ width: { xs: "100%", md: "200px" }, margin: "30px 0" }}
        className={styles.FilterButton}
      >
        Filter
      </Button>
    </>
  );

  return (
    <>
      <Drawer anchor="top" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Button onClick={toggleDrawer(true)} className={styles.FilterIconButton}>
        <FilterList fontSize="large" />
        <Typography variant="caption">Filter</Typography>
      </Button>
    </>
  );
};

export default FilterDrawer;