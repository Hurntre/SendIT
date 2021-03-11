import axios from 'axios';

const geocoder = (address, key) => {
  return axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
  );
};

export default geocoder;
