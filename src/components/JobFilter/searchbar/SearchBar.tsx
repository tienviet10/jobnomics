import React from "react";

import { useDispatch } from "react-redux";
import { handleSearch } from "../../../features/filterSlice";

import styles from "./SearchBar.module.css";
import { TextField } from "@mui/material";

const SearchBar = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <TextField
      placeholder="Search"
      size="small"
      onChange={(e) => dispatch(handleSearch(e.target.value))}
      className={styles.SearchBar}
    />
  );
};

export default SearchBar;
