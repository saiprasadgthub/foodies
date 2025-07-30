import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function Signup() {
  const [cred, setCred] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: json } = await api.post('/createuser', {
        name: cred.name,
        email: cred.email,
        password: cred.password,
        location: cred.geolocation
      });

      console.log(json.data);

      if (!json.success) {
        alert(`Error: ${json.error || 'Enter valid credentials'}`);
      } else {
        alert("User created successfully. You can now log in.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={cred.name}
            onChange={handleChange}
            aria-describedby="nameHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={cred.email}
            onChange={handleChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={cred.password}
            onChange={handleChange}
            id="exampleInputPassword1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputLocation" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="geolocation"
            value={cred.geolocation}
            onChange={handleChange}
            id="exampleInputLocation"
          />
        </div>

        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
      </form>
    </div>
  );
}
