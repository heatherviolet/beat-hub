import React, { useState } from 'react'

import { Form, Button } from "react-bootstrap";

import { CREATE_COLLECTION } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

import { useMutation, useQuery } from '@apollo/client';

import { Redirect, Link } from 'react-router-dom';

export default function AddCollection() {
    const [nameInput, setNameInput] = useState("");
    const [success, setSuccess] = useState(false);

    const [createCollection, { createErr }] = useMutation(CREATE_COLLECTION);
    const { loading, data: meData } = useQuery(QUERY_ME);

    const author = !loading && meData.me.username;

    console.log(author)

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (nameInput) {
            await createCollection({
                variables: { name: nameInput, author: author }
            }).then(setSuccess(true));
        }
      };

      if (success) {
          return <Redirect to='/profile'/>
      }

    return (
        <div className="mx-auto">
            <h1>Add a collection!</h1>
            <form onSubmit={handleFormSubmit}
                    style={{backgroundColor: '#282c34',
                            padding: '20px',
                            borderRadius: '15px'}}>
                <div className="searchForm mx-0" style={{width: '400px'}}>
                    <p style={{color: 'white'}}>Collection name:</p>
                    <input
                        type="text"
                        placeholder="Name your collection"
                        onChange={(e) => setNameInput(e.target.value)}
                        style={{color: 'white',
                                width: '100%',
                                backgroundColor: '#32434d',
                                border: 'none',
                                padding: '5px',
                                borderRadius: '5px'
                            }}
                    />
                    {success ? (
                        <p>Collection added!</p>
                    ) : (
                        <p></p>
                    )}
                    <button
                        type="submit"
                        disabled={success}
                        style={{
                            color: '#32434d',
                            border: 'none',
                            padding: '5px',
                            backgroundColor: '#DCF763',
                            borderRadius: '5px',
                            marginTop: '10px'
                        }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}