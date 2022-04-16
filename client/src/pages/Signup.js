import React, { useState } from 'react';

// import useMutation and ADD_USER mutation
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    // track the state of the form
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

    // create function for calling the mutation
    const [addUser, { error }] = useMutation(ADD_USER);

    // update the form when the value of an input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // authenticate and create the user when the form is submitted
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const { data } = await addUser({
                variables: { ...formState }
            });
          
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className='flex-row justify-center mb-4'>
            <div className='col-12 col-md-6'>
                <div className='card'>
                    <h4 className='card-header'>Sign Up</h4>
                    <div className='card-body'>
                        <form onSubmit={handleFormSubmit}>
                        <input
                            className='form-input'
                            placeholder='Your username'
                            name='username'
                            type='username'
                            id='username'
                            value={formState.username}
                            onChange={handleChange}
                        />
                        <input
                            className='form-input'
                            placeholder='Your email'
                            name='email'
                            type='email'
                            id='email'
                            value={formState.email}
                            onChange={handleChange}
                        />
                        <input
                            className='form-input'
                            placeholder='******'
                            name='password'
                            type='password'
                            id='password'
                            value={formState.password}
                            onChange={handleChange}
                        />
                        <button className='btn d-block w-100' type='submit'>
                            Submit
                        </button>
                        </form>
                        {error && <div>Sign up failed</div>}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Signup;