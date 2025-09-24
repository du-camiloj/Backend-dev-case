const axios = require('axios');
const BASE = 'https://rickandmortyapi.com/api';

async function getCharactersByIds(ids) {
  const { data } = await axios.get(`${BASE}/character/${ids.join(',')}`);
  return Array.isArray(data) ? data : [data];
}

async function getEpisodeByUrl(url) { 
    const { data } = await axios.get(url); 
    return data; 
}

async function getLocationByUrl(url) { 
    const { data } = await axios.get(url); 
    return data; 
}

module.exports = { 
    getCharactersByIds, 
    getEpisodeByUrl, 
    getLocationByUrl 
};
