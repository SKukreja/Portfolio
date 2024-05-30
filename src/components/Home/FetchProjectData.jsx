import axios from 'axios';

const FetchProjectData = async (projectId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/slugify/slugs/work/${projectId}?populate=deep`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
};

export default FetchProjectData;
