import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { fetchApplications, approveApplication, rejectApplication } from '../services/api';

const ApplicationReview = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getApplications = async () => {
      setLoading(true);
      const apps = await fetchApplications();
      setApplications(apps);
      setLoading(false);
    };
    getApplications();
  }, []);

  const handleApprove = (appId) => {
    approveApplication(appId);
  };

  const handleReject = (appId) => {
    rejectApplication(appId);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Review Applications</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {applications.map((app) => (
            <Grid item xs={12} key={app.id}>
              <Typography>{app.name}</Typography>
              <Button onClick={() => handleApprove(app.id)} variant="contained" color="primary">Approve</Button>
              <Button onClick={() => handleReject(app.id)} variant="contained" color="secondary">Reject</Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ApplicationReview;
