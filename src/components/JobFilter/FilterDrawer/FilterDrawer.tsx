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
  { name: "Status", filter: "status" },
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
    <Box
      className={styles.FilterDrawerContainer}
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box className={styles.FilterDrawerList}>
        {choices.map((choice) => {
          return (
            <FormControl
              key={choice.filter}
              sx={{
                mt: { xs: 5, sm: 8 },
                mx: "auto",
                ml: { xs: 4, sm: 5, lg: 15 },
                minWidth: "160px",
              }}
              component="fieldset"
              variant="standard"
              className={styles.FilterColumn}
            >
              <FormLabel sx={{ pb: 2 }}>{choice.name}</FormLabel>
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
        sx={{
          width: { xs: "100%", sm: "200px" },
          mt: 3,
          backgroundColor: "accent.main",
        }}
      >
        Filter
      </Button>
    </Box>
  );

  return (
    <>
      <Drawer anchor="top" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Button
        onClick={toggleDrawer(true)}
        className={styles.FilterIconButton}
        sx={{ color: "accent.main" }}
      >
        <FilterList fontSize="large" />
        <Typography variant="caption">Filter</Typography>
      </Button>
    </>
  );
};

export default FilterDrawer;
