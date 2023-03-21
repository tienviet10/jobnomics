import React from "react";

import { useDispatch } from "react-redux";
import { handleSearch } from "../../../features/filterSlice";

import styles from "./SearchBar.module.css";
import { TextField } from "@mui/material";

const SearchBar = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <TextField
      placeholder="Type here..."
      label="Search"
      onChange={(e) => dispatch(handleSearch(e.target.value))}
      sx={{ margin: "10px 0", background: "#ffffff" }}
      className={styles.SearchBar}
    />
  );
};

export default SearchBar;
