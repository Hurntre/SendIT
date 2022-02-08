import axios from 'axios';

const geocoder = async (address, key) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
    );
    if (response.data.results === 0 || response.data.status !== 'OK') {
      return {
        status: 'invalid address',
      };
    }
    return response.data.results;
  } catch (error) {
    return error;
  }
};

export default geocoder;
