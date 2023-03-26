import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { handleSearch } from "../../../features/filterSlice";
import { RootState } from "../../../app/store";

import styles from "./SearchBar.module.css";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ClearRounded } from "@mui/icons-material";

const SearchBar = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleEmptyInput = () => {
    dispatch(handleSearch(""));
  };

  const searchWord: string = useSelector(
    (state: RootState) => state.filter.searchWord
  );

  return (
    <FormControl className={styles.SearchBar} variant="outlined" size="small">
      <InputLabel htmlFor="display-name">Search</InputLabel>
      <OutlinedInput
        placeholder="Type here..."
        label="Search"
        sx={{ background: "#ffffff" }}
        onChange={(e) => dispatch(handleSearch(e.target.value))}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="empty input field"
              onClick={handleEmptyInput}
              edge="end"
            >
              {searchWord && <ClearRounded />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchBar;
