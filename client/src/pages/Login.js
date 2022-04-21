import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4 mx-auto">
      <div className="col-12 col-md-6">
        <div className="card form">
          <h4 className="card-header"
          style={{color: '#3e535f',
        }}>Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
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
                Enter your password
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
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
}; 

export default Login;