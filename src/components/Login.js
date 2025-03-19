import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [luser, setLuser] = useState({ mobile: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setLuser({ ...luser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/login', luser);
      if (response.data.status === 1) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group col col-md-3">
          <label htmlFor="mobile">Mobile</label>
          <input
            className="form-control"
            type="text"
            name="mobile"
            value={luser.mobile}
            onChange={handlechange}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={luser.password}
            onChange={handlechange}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="btn btn-primary mt-4">
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <a>forgot password</a>
      <Link to={'/forgotpassword'}>
        <li className="nav-item">
          <a className="btn" aria-current="page">
            forgotpassword
          </a>
        </li>
      </Link>
    </div>
  );
}

export default Login;
