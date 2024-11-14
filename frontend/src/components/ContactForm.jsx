import React, { useState } from 'react';
import { Box, TextField, Button, Grid2, Typography, Container, Alert } from '@mui/material';
import useContacts from '../hooks/useContacts';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { contacts, fetchContacts } = useContacts();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.company || !formData.jobTitle) {
      setError('Please fill in all required fields.');
      setTimeout(() => setError(null), 3000)
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
        setTimeout(() => setSuccess(false), 3000);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          company: '',
          jobTitle: '',
        });
        fetchContacts();
      } else {
        setError('An error occurred while submitting the form. Please try again later.');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('An error occurred while submitting the form. Please try again later.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Form
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter the details of the contact to be added:
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>Form submitted successfully!</Alert>}
        <Grid2 container spacing={3} sx={{ mt: 2 }}>
          <Grid2 item xs={12} sm={6}>
            <TextField
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="company"
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 item xs={12}>
            <TextField
              required
              fullWidth
              id="jobTitle"
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </Grid2>
        </Grid2>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ContactForm;