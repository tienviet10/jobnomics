import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Privacy = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginTop: "30px"
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography gutterBottom>
          Your privacy is important to us.​ <br></br>
          <br></br>We respect your privacy regarding any information we may
          collect while operating our website. Accordingly, we have developed this
          privacy policy in order for you to understand how we collect, use,
          communicate, disclose and otherwise make use of personal information. We
          have outlined our privacy policy below. <br></br>
          <br></br>We will collect personal information (such as name, and profile
          picture) by lawful and fair means and, where appropriate, with the
          knowledge or consent of the individual concerned.<br></br>
          <br></br>Before or at the time of collecting personal information, we
          will identify the purposes for which information is being collected.
          <br></br>
          <br></br>We will collect and use personal information solely for
          fulfilling those purposes specified by us and for other ancillary
          purposes, unless we obtain the consent of the individual concerned or as
          required by law.<br></br>
          <br></br>Personal data should be relevant to the purposes for which it
          is to be used, and, to the extent necessary for those purposes, should
          be accurate, complete, and up-to-date.<br></br>
          <br></br>We will protect personal information by using reasonable
          security safeguards against loss or theft, as well as unauthorized
          access, disclosure, copying, use or modification.
          <br></br>
          <br></br>We will make readily available to customers information about
          our policies and practices relating to the management of personal
          information.<br></br>
          <br></br>We will only retain personal information for as long as
          necessary for the fulfilment of those purposes.<br></br>
          <br></br>We are committed to conducting our business in accordance with
          these principles in order to ensure that the confidentiality of personal
          information is protected and maintained.
        </Typography>
      </Container>
    </Box>
  );
};

export default Privacy;