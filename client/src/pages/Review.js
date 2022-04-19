import { useState } from 'react';
import { useMutation } from '@apollo/client';
import React from 'react';

import Auth from '../utils/auth';

import { ADD_REVIEW } from '../utils/mutations';

const ReviewForm = () => {
    const [formState, setFormState] = useState({ album: '', author: '', rating: '' });
    const [review, { error }] = useMutation(ADD_REVIEW);


        const handleChange = (event) => {
          const { review, value } = event.target;
      
          setFormState({
            ...formState,
            [review]: value,
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
          <main className="flex-row justify-center mb-4">
            <div className="col-12 col-md-6">
              <div className="card">
                <h4 className="card-header">Review</h4>
                <div className="card-body">
                  <form onSubmit={handleFormSubmit}>
                    <input
                      className="form-input"
                      placeholder="Your review"
                      name="review"
                      type="text"
                      id="_id"
                      value={formState.review}
                      onChange={handleChange}
                    />
                    <button className="btn d-block w-100" type="submit">
                      Submit
                    </button>
                  </form>
      
                  {error && <div>Adding review failed</div>}
                </div>
              </div>
            </div>
          </main>
        );
      }; 
export default ReviewForm;