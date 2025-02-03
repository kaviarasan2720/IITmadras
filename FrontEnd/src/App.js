import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './components/ApplicationForm';
import ApplicationReview from './components/ApplicationReview';
import AdmissionLetter from './components/AdmissionLetter';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/admin/review" element={<ApplicationReview />} />
        <Route path="/download/:appId" element={<AdmissionLetter />} />
      </Routes>
    </Router>
  );
};

export default App;
