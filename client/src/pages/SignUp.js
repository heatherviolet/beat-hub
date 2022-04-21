import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';


import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4 mx-auto">
      <div className="col-12 col-md-6">
        <div className="card form">
          <h4 className="card-header"
          style={{color: '#3e535f',
          }}>Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <label>
                Enter a username
              </label>
              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                style={{color: '#32434d',
                                
                                width: '100%',
                                backgroundColor: 'white',
                                padding: '5px',
                                borderRadius: '5px'
                            }}
                value={formState.username}
                onChange={handleChange}
              />
              <label>
                Enter your email
              </label>
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                style={{color: '#32434d',
                                
                                width: '100%',
                                backgroundColor: 'white',
                                padding: '5px',
                                borderRadius: '5px'
                            }}
                value={formState.email}
                onChange={handleChange}
              />
              <label>
                Enter a password
              </label>
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                style={{color: '#32434d',
                                
                                width: '100%',
                                backgroundColor: 'white',
                                padding: '5px',
                                borderRadius: '5px'
                            }}
                value={formState.password}
                onChange={handleChange}
              />
              <button id="signupbtn" className="btn d-block w-100" type="submit"
             >
                Submit
              </button>
            </form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;