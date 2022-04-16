const axios = require("axios");

export const searchSpotify = (query) => {
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
          'X-RapidAPI-Key': process.env.SPOTIFY_API_KEY
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