import React, { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';

const AdmissionLetter = ({ appId }) => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleDownload = async () => {
    try {
      setStatusMessage("Downloading admission letter...");
      const response = await fetch(`http://localhost:5000/api/download_admission/${appId}`);
      if (!response.ok) {
        setStatusMessage("Error: PDF not found or application not approved.");
        return;
      }
      const pdfBlob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `admission_${appId}.pdf`;  
      link.click(); 
      setStatusMessage("");
    } catch (error) {
      setStatusMessage("Error: Unable to download the admission letter.");
    }
  };

  return (
    <Container>
      <Typography variant="h6">Download Admission Letter</Typography>
      <Button onClick={handleDownload} variant="contained" color="primary">
        Download Letter
      </Button>
      {statusMessage && <Typography>{statusMessage}</Typography>}
    </Container>
  );
};

export default AdmissionLetter;
