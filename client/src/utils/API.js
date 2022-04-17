const axios = require("axios");

export const searchSpotify = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
          q: query,
          type: 'albums',
          offset: '0',
          limit: '5',
          numberOfTopResults: '3'
        },
        headers: {
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
          'X-RapidAPI-Key': "98749236fcmsh9a0a6d6e384a89ep1d7bd0jsn68ffef7de409"
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