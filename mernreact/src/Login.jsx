import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from './lib/api';

export default function Login() {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: json } = await api.post('/loginuser', {
        email: cred.email,
        password: cred.password
      });

      if (json.success) {
        localStorage.setItem('useremail', cred.email);
        localStorage.setItem('authtoken', json.authToken);
        console.log("useremail saved:", localStorage.getItem("useremail"));
        console.log("authtoken saved:", localStorage.getItem("authtoken"));
        navigate('/');
      } else {
        alert(`Error: ${json.error || json.errors || 'Enter valid credentials'}`);
        console.log(json);
      }
    } catch (error) {
      alert('Login failed. Please check your connection or credentials.');
      console.error('Login error:', error);
    }
  };

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/createuser" className="m-3 btn">New to GoFood</Link>
      </form>
    </div>
  );
}
