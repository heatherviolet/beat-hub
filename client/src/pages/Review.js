import { useState } from 'react';
import { useMutation } from '@apollo/client';
import React from 'react';

import Auth from '../utils/auth';

import { WRITE_REVIEW } from '../utils/mutations';

const ReviewForm = () => {
    const [review, setReview] = useState('');
    // const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const [addReview, { error }] = useMutation(WRITE_REVIEW);


      const handleChange = (event) => {
           const { review, _id } = event.target;
      
          setReview({
            [review]: _id,
          });
        };
      
        // submit form
        // const handleFormSubmit = async (event) => {
        //   event.preventDefault();
      
        //   try {
        //     const { data } = await login({
        //       variables: { ...formState },
        //     });
      
        //     Auth.login(data.login.token);
        //   } catch (e) {
        //     console.error(e);
        //   }
      
         
      
        return (
          <main className="flex-row justify-center mb-4">
            <div className="col-12 col-md-6">
              <div className="card">
                <h4 className="card-header">Review</h4>
                <div className="card-body">
                  <form onSubmit={review}>
                    <input
                      className="form-input"
                      placeholder="Your review"
                      name="review"
                      type="text"
                      id="_id"
                      // value={formState.review}
                      onChange={setReview}
                    />
                    <button className="btn d-block w-100" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        );
      }; 
export default ReviewForm;