import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useFilterJobMutation, useGetAllJobsQuery } from '../../app/services/job-api';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';


const theme = createTheme();

const SearchPage = () => {
  const { logout } = useAuth0();
  const { data, error, isLoading } = useGetAllJobsQuery();
  const [filterJob] = useFilterJobMutation();
  const [filter, setFilter] = useState({
    category: [{ name: "Applied", check: false }, { name: "Bookmarked", check: false }],
    languages: [{ javascript: false }, { react: false }]
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updateCategoryFilter = (checkMark:any) => {
 
    setFilter((prev:any) => {
      const res = {...prev, category: prev.category.map((obj:any)=> (obj.name === checkMark ? {...obj, check:!obj.check}: obj))};
      return res
    });
  }

  const sentFilterRequest = () => {
    const newCategory = filter.category.filter((obj) => obj.check).map((obj)=> obj.name)

    filterJob({
      userId: 1,
      category: newCategory,
      languages: ["javascript", "react", "express"]
    })
  }
  // const callProtectedApi = async () => {
  //   const token = await getAccessTokenSilently();
  //   console.log(token);
  //   fetch("http://localhost:8080/protected", {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });

  // };
  return (
    // <div>
    //   <ul>
    //     <li>
    //       <button onClick={() => handleClick()}>Login Pop</button>
    //     </li>
    //     <li>
    //       <button onClick={() => logout()}>Logout</button>
    //     </li>
    //   </ul>

    //   <ul>
    //     <li><button onClick={callApi}>Call API</button></li>
    //     <li><button onClick={callProtectedApi}>Call Protected API route</button></li>
    //   </ul>
    //   {isAuthenticated && (
    //     <pre>{JSON.stringify(user, null, 2)}</pre>
    //   )}
    // </div>
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
        {/* Hero unit */}
        <Container maxWidth="md">
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Update At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.Bookmarked?.jobs?.map((job: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
        <div>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Filtering</FormLabel>
            <FormGroup>
              {
                filter.category.map((cate) =>
                //Store the the student id in the value of each check box
                (<FormControlLabel
                  key={cate.name}
                  control={
                    <Checkbox checked={cate.check} 
                    onChange={(e)=> updateCategoryFilter(e.target.name)} 
                    name={cate.name} />
                  }
                  label={cate.name}
                />
                ))
              }

            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
          </FormControl>

        </div>
      </main>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => sentFilterRequest()}>Fetch</button>
    </ThemeProvider>
  );
};

export default SearchPage;