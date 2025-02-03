import React, { useState } from 'react';
import { Button, TextField, Container, Grid, CircularProgress, Typography, Select, MenuItem, InputLabel, FormControl, Card, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { submitApplication } from '../services/api';

const ApplicationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    degree_certificate: null,
    id_proof: null,
    profile_image: null,
  });
  const [fileErrors, setFileErrors] = useState({
    degree_certificate: "",
    id_proof: "",
    profile_image: ""
  });

  const MIN_FILE_SIZE = 1024 * 1024; 
  const checkFileSize = (file) => {
    if (file && file.size < MIN_FILE_SIZE) {
      return `File must be at least 1MB.`;
    }
    return null;
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const error = checkFileSize(file);

    if (error) {
      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      setFileErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ""
      }));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('name', data.name);
    formDataToSend.append('email', data.email);
    formDataToSend.append('date_of_birth', data.date_of_birth);
    formDataToSend.append('degree_certificate', formData.degree_certificate);
    formDataToSend.append('id_proof', formData.id_proof);
    formDataToSend.append('profile_image', formData.profile_image);
    formDataToSend.append('address', data.address);
    formDataToSend.append('city', data.city);
    formDataToSend.append('nationality', data.nationality);
    formDataToSend.append('guardian_number', data.guardian_number);
    formDataToSend.append('mobile_number', data.mobile_number);
    formDataToSend.append('parent_name', data.parent_name);
    formDataToSend.append('age', data.age);
    formDataToSend.append('qualification', data.qualification);
    formDataToSend.append('pincode', data.pincode);
    formDataToSend.append('selected_course', data.selected_course);

    try {
      const response = await submitApplication(formDataToSend);
      if (response.ok) {
        setStatusMessage("Application submitted successfully!");
      } else {
        setStatusMessage("Failed to submit the application.");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
      <Card sx={{ maxWidth: 600, margin: 'auto', padding: '20px', backgroundColor: '#fff' }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  {...register('name', { required: 'Full name is required' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  {...register('email', { required: 'Email is required' })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  {...register('dob', { required: 'Date of birth is required' })}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  {...register('address')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  {...register('city')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nationality"
                  variant="outlined"
                  {...register('nationality')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Guardian Number"
                  variant="outlined"
                  {...register('guardian_number')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  variant="outlined"
                  {...register('mobile_number')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Parent Name"
                  variant="outlined"
                  {...register('parent_name')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Age"
                  variant="outlined"
                  type="number"
                  {...register('age')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Qualification"
                  variant="outlined"
                  {...register('qualification')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Pincode"
                  variant="outlined"
                  {...register('pincode')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Selected Course</InputLabel>
                  <Select
                    {...register('selected_course')}
                    label="Selected Course"
                  >
                    <MenuItem value="course1">Course 1</MenuItem>
                    <MenuItem value="course2">Course 2</MenuItem>
                    <MenuItem value="course3">Course 3</MenuItem>
                    {/* Add more courses as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Degree Certificate
                  <input
                    type="file"
                    hidden
                    name="degree_certificate"
                    onChange={handleFileChange}
                    required
                  />
                </Button>
                {fileErrors.degree_certificate && (
                  <Typography variant="body2" color="error">{fileErrors.degree_certificate}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload ID Proof
                  <input
                    type="file"
                    hidden
                    name="id_proof"
                    onChange={handleFileChange}
                    required
                  />
                </Button>
                {fileErrors.id_proof && (
                  <Typography variant="body2" color="error">{fileErrors.id_proof}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Profile Image
                  <input
                    type="file"
                    hidden
                    name="profile_image"
                    onChange={handleFileChange}
                  />
                </Button>
                {fileErrors.profile_image && (
                  <Typography variant="body2" color="error">{fileErrors.profile_image}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit Application'}
                </Button>
              </Grid>
            </Grid>
          </form>

          {statusMessage && (
            <Typography variant="body1" color={statusMessage.includes("successfully") ? 'green' : 'red'} style={{ marginTop: '20px' }}>
              {statusMessage}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ApplicationForm;
