import React, { useState } from 'react';
// Import necessary dependencies

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform basic validation on the client side
    if (!formData.name || !formData.email || !formData.address || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    // If validation passes, submit the form data to the server
    try {
      const response = await fetch('http://localhost:3001/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // If the form submission is successful, display a success message
      if (data.success) {
        alert('Form submitted successfully!');
      } else {
        alert('Error submitting form: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div>

      
<form
 
onSubmit={handleSubmit}>

        
<label>
          Name:
          <input
 
type="text"
 
name="name"
 
value={formData.name}
 
onChange={handleInputChange} />

        
</label>

        
<br />

        
<label>
          E-mail:
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;