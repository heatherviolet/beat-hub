import React, { useState } from 'react'

import { Form, Button } from "react-bootstrap";

import { CREATE_COLLECTION } from '../utils/mutations';

import { useMutation } from '@apollo/client';

import { Redirect, Link } from 'react-router-dom';

export default function AddCollection() {
    const [nameInput, setNameInput] = useState("");
    const [success, setSuccess] = useState(false);

    const [createCollection, { createErr }] = useMutation(CREATE_COLLECTION);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (nameInput) {
            await createCollection({
                variables: { name: nameInput }
            }).then(setSuccess(true));
        }
      };

    return (
        <div className="mx-auto">
            <h1>Add a collection!</h1>
            <Form className="form" onSubmit={handleFormSubmit}>
                <Form.Group className="searchForm mb-3">
                    <Form.Label>Collection name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name your collection"
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                    {success ? (
                        <p>Collection added!</p>
                    ) : (
                        <p></p>
                    )}
                    <Button
                        variant="secondary"
                        type="submit"
                        className="button py-2 my-3"
                    >
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}