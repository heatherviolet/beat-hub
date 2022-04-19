const axios = require("axios");

export const searchSpotify = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
          q: query,
          type: 'multi',
          offset: '0',
          limit: '10',
          numberOfTopResults: '3'
        },
        headers: {
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
          'X-RapidAPI-Key': "5309b1aa14msh207cd3a0695d803p18e124jsn6b664d1cb7cc"
        }
      };

      try {
          const searchData = await axios.request(options);
          console.log(searchData);
          return searchData;
      } catch (error) {
          console.log(error);
      }
}