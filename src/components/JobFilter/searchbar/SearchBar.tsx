import React from 'react'
import TextField from '@mui/material/TextField';
import { SetSearchKeywordType } from '../../../types/jobTypes';

const SearchBar: React.FC<SetSearchKeywordType> = ({setSearchKeyword}): JSX.Element => {
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
      onChange={(e) => setSearchKeyword(e.target.value)}
    />
  </div >
  )
}

export default SearchBar