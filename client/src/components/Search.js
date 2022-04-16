import React, { useState } from 'react'
import Album from './Album';
const axios = require('axios');

export default function Search() {
    const [albums, setAlbums] = useState([]);
    const [formState, setFormState] = useState({ name: '' });

    // this function logs users input into a variable
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          name: value,
        });
    };

    // this function searches for album data
    const search = async(event) => {
        event.preventDefault();
        
        const albumTyped = formState.name;
        // defines the get request
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
              q: albumTyped,
              type: 'albums',
              offset: '0',
              limit: '5',
              numberOfTopResults: '5'
            },
            headers: {
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
              'X-RapidAPI-Key': '744db9b8d3msh414971d30f91303p14d63ajsn8b7bb8e485e7'
            }
        };
        // deploys a get request
        axios.request(options).then(function (response) {

            console.log(response.data);

            // set simplified album data into a useState variable
            const albumsArray = response.data.albums.items;
            setAlbums(albumsArray);

        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
    <>
        <form onSubmit={search}> 
            <label>
                Search An Album
            </label>
            <input
                placeholder="album name"
                name="album"
                onChange={handleChange}
            ></input>
            <button type="submit">Search</button>
        </form>
        <br/>
        <div>
            {albums.map(album=>(
                <Album album={album} key={album.data.uri}></Album>
            ))}
        </div>
    </>

    );
}
