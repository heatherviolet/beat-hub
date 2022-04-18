import { useState } from "react";

const ReviewForm = () => { {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Leave your review below:
      <input 
        type="text" 
        name="review" 
        value={inputs.albumId || ""} 
        onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
  )
}
}
export default ReviewForm;