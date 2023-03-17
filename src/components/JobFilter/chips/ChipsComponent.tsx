import React from 'react';
import { Stack } from '@mui/system';
import Chip from '@mui/material/Chip';
import { CheckBoxEntity, RemindersListType } from '../../../types/jobTypes';

const choices = ["category", "languages", "framework"];

const ChipsComponent: React.FC<RemindersListType> = ({ filter, updateCategoryFilter }) => {
  return (
    <Stack direction="row" spacing={1} height={20}>
      {choices.map((choice) => {
        return filter[choice].map((cate: CheckBoxEntity) => (
          cate.check && (<Chip key={cate.name} label={cate.name}
            onDelete={updateCategoryFilter({ ...cate, cate: choice, auto: true })}
          />)
        ));
      })}
    </Stack>
  );
};

export default ChipsComponent;