import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { CheckBoxEntity, DrawComponentType } from '../../../types/jobTypes';
import FilterListIcon from '@mui/icons-material/FilterList';
import styles from "./Drawer.module.css";

const choices = ["category", "languages", "framework"];

const DrawerComponent: React.FC<DrawComponentType> = ({ filter, updateCategoryFilter, state, sentFilterRequest, setState }): JSX.Element => {

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState(open);
      };

  const list = () => (
    <div className={styles.Drawer}>
      <Box
        sx={{ width: 'auto', display: 'flex' }}
        role="presentation"
        // onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {choices.map((choice) => {
          return (
            <FormControl key={choice} sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Filtering</FormLabel>
              <FormGroup>
                {
                  filter[choice].map((cate: CheckBoxEntity) =>
                  (<FormControlLabel
                    key={cate.name}
                    control={
                      <Checkbox checked={cate.check}
                        onChange={updateCategoryFilter({ ...cate, cate: choice, auto: false })}
                        name={cate.name} />
                    }
                    label={cate.name}
                  />
                  ))
                }
              </FormGroup>
            </FormControl>
          );
        })}
      </Box>
      <Button variant="contained" onClick={() => sentFilterRequest(filter)}>Filter</Button>
    </div>
  );

  return (
    <>
      <Drawer
        anchor="top"
        open={state}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
      <Button onClick={toggleDrawer(true)}><FilterListIcon sx={{ fontSize: 30 }} /></Button>
    </>
  );
};

export default DrawerComponent;