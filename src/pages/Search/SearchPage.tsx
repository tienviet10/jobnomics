import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useFilterJobMutation } from '../../app/services/job-api';
import { Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';
import { Stack } from '@mui/system';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';


// TODO: fix import issue
// TODO: Fix types
const theme = createTheme();

const SearchPage = () => {
  const { logout } = useAuth0();

  const [filterJob] = useFilterJobMutation();
  const [filter, setFilter] = useState({
    category: [{ name: "Applied", check: false }, { name: "Bookmarked", check: false }, { name: "Interviewing", check: false }, { name: "Interviewed", check: false }, { name: "Job Offer", check: false }, { name: "Position Filled", check: false }],
    languages: [{ name: "javascript", check: false }, { name: "ruby", check: false }],
    framework: [{ name: "express", check: false }, { name: "node", check: false }, { name: "react", check: false }, { name: "rails", check: false }]
  });

  const [listOfCategories, setListOfCategories] = useState<any>({
    Bookmarked: {}
  });

  const [state, setState] = React.useState(false);


  const prefetchData = async () => {
    const res: any = await filterJob({
      userId: 1,
      category: ["Bookmarked", "Applied", "Interviewing", "Interviewed", "Job Offer", "Position Filled"],
      languages: []
    });
    setListOfCategories(res.data.formatUserJobs);
  };

  useEffect(() => {
    prefetchData();
  }, []);


  const updateCategoryFilter = (item: any) => () => {
    setFilter((prev: any) => {
      const res = { ...prev, [item.cate]: prev[item.cate].map((obj: any) => (obj.name === item.name ? { ...obj, check: !obj.check } : obj)) };
      return res;
    });
  };


  const sentFilterRequest = async () => {
    const newCategory = filter.category.filter((obj) => obj.check).map((obj) => obj.name);
    const languagesAndFramework = filter.languages.concat(filter.framework).filter((obj) => obj.check).map((obj) => obj.name);

    const res: any = await filterJob({
      userId: 1,
      category: newCategory,
      languages: languagesAndFramework
    });

    setListOfCategories(res.data.formatUserJobs);
  };

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
    <Box
      sx={{ width: 'auto', display: 'flex' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
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
                  onChange={updateCategoryFilter({ ...cate, cate: "category" })}
                  name={cate.name} />
              }
              label={cate.name}
            />
            ))
          }
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Filtering</FormLabel>
        <FormGroup>
          {
            filter.languages.map((lang) =>
            //Store the the student id in the value of each check box
            (<FormControlLabel
              key={lang.name}
              control={
                <Checkbox checked={lang.check}
                  onChange={updateCategoryFilter({ ...lang, cate: "languages" })}
                  name={lang.name} />
              }
              label={lang.name}
            />
            ))
          }
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Filtering</FormLabel>
        <FormGroup>
          {
            filter.framework.map((fra) =>
            //Store the the student id in the value of each check box
            (<FormControlLabel
              key={fra.name}
              control={
                <Checkbox checked={fra.check}
                  onChange={updateCategoryFilter({ ...fra, cate: "framework" })}
                  id={fra.name}
                  name="framework" />
              }
              label={fra.name}
            />
            ))
          }
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </Box>
  );

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
        {/* Hero unit */}
        <div>
          <React.Fragment key="top">
            <Button onClick={toggleDrawer(true)}>top</Button>
            <Drawer
              anchor="top"
              open={state}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </React.Fragment>

        </div>
        <Container maxWidth="md">
          <Stack direction="row" spacing={1} height={20}>
            {filter.category.map((cate) => (
              cate.check && (<Chip key={cate.name} label={cate.name}
                onDelete={updateCategoryFilter({ ...cate, cate: "category" })}
              />)
            ))}
            {filter.languages.map((lang) => (
              lang.check && (<Chip key={lang.name} label={lang.name}
                onDelete={updateCategoryFilter({ ...lang, cate: "languages" })}
              />)
            ))}
            {filter.framework.map((fra) => (
              fra.check && (<Chip key={fra.name} label={fra.name}
                onDelete={updateCategoryFilter({ ...fra, cate: "framework" })}
              />)
            ))}
          </Stack>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Update At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOfCategories?.Bookmarked?.jobs?.map((job: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>

      </main>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => sentFilterRequest()}>Fetch</button>
    </ThemeProvider>
  );
};

export default SearchPage;


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