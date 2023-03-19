import React, { useState } from "react";

import {
  Drawer,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Box,
} from "@mui/material";

import { CheckBoxEntity, DrawComponentType } from "../../../types/jobTypes";
import FilterListIcon from "@mui/icons-material/FilterList";
import styles from "./Drawer.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const choices = ["category", "languages", "framework"];

const DrawerComponent: React.FC<DrawComponentType> = ({
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
    <div className={styles.Drawer}>
      <Box
        sx={{ width: "auto", display: "flex" }}
        role="presentation"
        // onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {choices.map((choice) => {
          return (
            <FormControl
              key={choice}
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">Filtering</FormLabel>
              <FormGroup>
                {filterState[choice].map((cate: CheckBoxEntity) => (
                  <FormControlLabel
                    key={cate.name}
                    control={
                      <Checkbox
                        checked={cate.check}
                        onChange={updateCategoryFilter({
                          ...cate,
                          cate: choice,
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
      <Button variant="contained" onClick={handleSentRequest}>
        Filter
      </Button>
    </div>
  );

  return (
    <>
      <Drawer anchor="top" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Button onClick={toggleDrawer(true)}>
        <FilterListIcon sx={{ fontSize: 30 }} />
      </Button>
    </>
  );
};

export default DrawerComponent;
