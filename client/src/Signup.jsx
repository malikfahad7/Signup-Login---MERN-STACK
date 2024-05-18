import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const result = await axios.post('http://localhost:3001/register', formData);
        if(result.data === "Success"){
         

          navigate('/home');
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.username) errors.username = 'Username is required';
    if (!data.email) errors.email = 'Email is required';
    if (!data.password) errors.password = 'Password is required';
    return errors;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Register your account</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                id="username"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
              {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-block custom-button">Register</button>
            <p className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
