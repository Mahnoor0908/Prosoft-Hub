import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import signupBg from './assets/images/signup-bg.jpg';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    adminCode: '' // Special code for President/Advisor
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin access codes (you can change these)
  const ADMIN_CODES = {
    'President': 'PRES200',
    'Advisor': 'ADV100'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    // Check admin code for President/Advisor
    if (formData.role === 'President' || formData.role === 'Advisor') {
      if (formData.adminCode !== ADMIN_CODES[formData.role]) {
        setError(`Invalid ${formData.role} access code!`);
        return;
      }
    }
    
    setLoading(true);

    try {
  const response = await axios.post('http://localhost:5000/api/auth/register', { 
    name: formData.name,
    email: formData.email,
    password: formData.password,
    confirm_password: formData.confirmPassword,
    role: formData.role.toLowerCase()
  });

  localStorage.setItem('token', response.data.token);

  alert('Account created successfully!');
  navigate('/signin');

} catch (err) {
  setError(err.response?.data?.message || 'Signup failed! Please try again.');
  console.error('Signup Error:', err);
} finally {
  setLoading(false);
}};

  return (
    <div 
      className="signup-page" 
      style={{ backgroundImage: `url(${signupBg})` }}
    >
      <div className="signup-container">
        <div className="signup-box">
          <h2>Sign Up</h2>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
              utoComplete="off"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              utoComplete="off"
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              utoComplete="off"
              minLength={6}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              utoComplete="off"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              utoComplete="off"
            >
              <option value="" disabled>Select Role</option>
              <option value="President">President</option>
              <option value="Advisor">Advisor</option>
              <option value="Member">Member</option>
            </select>

            {/* Show admin code field only for President/Advisor */}
            {(formData.role === 'President' || formData.role === 'Advisor') && (
              <input
                type="text"
                name="adminCode"
                placeholder={`Enter ${formData.role} Access Code`}
                value={formData.adminCode}
                onChange={handleChange}
                required
                utoComplete="off"
              />
            )}

            {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</p>}

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="signin-link">
            Already registered? <span onClick={() => navigate('/signin')}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;