import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import signinBg from './assets/images/signin-bg.jpg';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Backend API call
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Check if selected role matches user's role in database
      const userRole = response.data.user.role;
      const selectedRole = formData.role.toLowerCase();
      
      // Role validation (optional - can be removed if not needed)
      if (selectedRole === 'member' && userRole !== 'user') {
        setError('Invalid role selected!');
        return;
      }
      if ((selectedRole === 'president' || selectedRole === 'advisor') && userRole !== 'admin') {
        setError('Invalid role selected!');
        return;
      }

      // Save token and user info in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('selectedRole', formData.role); // Save selected role

      alert(`Welcome ${formData.role}!`);
      navigate('/'); // Redirect to home or dashboard
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed! Please check your credentials.');
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="signin-page" 
      style={{ backgroundImage: `url(${signinBg})` }}
    >
      <div className="signin-container">
        <div className="signin-box">
          <h2>Sign In</h2>
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="President">President</option>
              <option value="Advisor">Advisor</option>
              <option value="Member">Member</option>
            </select>

            {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</p>}

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="signup-link">
            Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;