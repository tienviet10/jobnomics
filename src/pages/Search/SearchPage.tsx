import React from 'react';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FilterList from '../../components/JobFilter';
import ChipsComponent from '../../components/JobFilter/chips';
import SearchBar from '../../components/JobFilter/searchbar/SearchBar';
import DrawerComponent from '../../components/JobFilter/drawer';
import { useManageSearchPage } from './manage-search-page';

const theme = createTheme();

const SearchPage = () => {
  const {filter, updateCategoryFilter, state, sentFilterRequest, setState, setSearchKeyword, listCal, logout} = useManageSearchPage();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Search Page
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <DrawerComponent filter={filter} updateCategoryFilter={updateCategoryFilter} state={state} sentFilterRequest={sentFilterRequest} setState={setState}/>
        <SearchBar setSearchKeyword={setSearchKeyword}/>
        <Container maxWidth="md">
          <ChipsComponent filter={filter} updateCategoryFilter={updateCategoryFilter} />
          <FilterList listCal={listCal} />
        </Container>
      </main>
      <button onClick={() => logout()}>Logout</button>
    </ThemeProvider>
  );
};

export default SearchPage;
