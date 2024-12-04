import axios from 'axios';

const API_BASE_URL = 'https://api-app-staging.wobot.ai/app/v1';
const TOKEN = '4ApVMIn5sTxeW7GQ5VWeWiy';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchCameras = async () => {
  try {
    const response = await api.get('/fetch/cameras');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cameras:', error);
    throw error;
  }
};

export const updateCameraStatus = async (id, status) => {
  try {
    await api.post('/update/camera/status', { id, status });
  } catch (error) {
    console.error('Error updating camera status:', error);
    throw error;
  }
};