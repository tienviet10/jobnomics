import React from "react";
import { Stack } from "@mui/system";
import { Chip } from "@mui/material";
import { CheckBoxEntity, RemindersListType } from "../../../types/jobTypes";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

const choices = ["category", "languages", "framework", "status"];

const ChipsComponent: React.FC<RemindersListType> = ({
  updateCategoryFilter,
}): JSX.Element => {
  const filterState = useSelector(
    (state: RootState) => state.filter.mainFilter
  );

  return (
    <Stack
      direction="row"
      spacing={1}
      mb={1}
      sx={{
        overflow: "auto",
      }}
    >
      {choices.map((choice) => {
        return filterState[choice].map(
          (cate: CheckBoxEntity) =>
            cate.check && (
              <Chip
                key={cate.name}
                label={cate.name}
                onDelete={updateCategoryFilter({
                  ...cate,
                  cate: choice,
                  auto: true,
                  check: false
                })}
              />
            )
        );
      })}
    </Stack>
  );
};

export default ChipsComponent;
