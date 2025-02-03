const API_URL = 'http://localhost:5000/api'; 
export const submitApplication = async (formData) => {
  const response = await fetch(`${API_URL}/apply`, {
    method: 'POST',
    body: formData,
  });
  return response;
};
export const fetchApplications = async () => {
  const response = await fetch(`${API_URL}/admin/review`);
  const data = await response.json();
  return data;
};
export const approveApplication = async (appId) => {
  const response = await fetch(`${API_URL}/admin/approve/${appId}`, {
    method: 'POST',
  });
  return response.json();
};
export const rejectApplication = async (appId) => {
  const response = await fetch(`${API_URL}/admin/reject/${appId}`, {
    method: 'POST',
  });
  return response.json();
};
export const downloadAdmissionLetter = async (appId) => {
  const response = await fetch(`${API_URL}/download_admission/${appId}`);
  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admission_${appId}.pdf`;
    a.click();
    return { success: true };
  }
  return { success: false };
};
