import React from 'react'
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { handleSearch } from '../../../features/filterSlice';

const SearchBar = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div
    style={{
      alignItems: 'center',
      width: '200px',
      display: 'flex',
      flexDirection: 'row'
    }}>
    <TextField style={{ flex: 1 }}
      placeholder='Search'
      InputLabelProps={{ style: { display: 'none' } }}
      onChange={(e) => dispatch(handleSearch(e.target.value))}
    />
  </div >
  )
}

export default SearchBar