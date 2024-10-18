import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/Login.css'; 

export default function Login() {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email) => {
    if (!email) {
      return "Email field is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email should be in valid format";
    }
    return "";
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!password) {
      return "Password field is required";
    } else if (!passwordRegex.test(password)) {
      return "Password must contain one number, lowercase, uppercase, symbol, and the minimum length should be 8";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    // Clear errors if everything is valid
    setErrors({ email: '', password: '' });

    // If valid, proceed with login
    const formData = { email, password };
    handleLogin(formData);
    setEmail("")
    setPassword("")
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <form className="login-form border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
          <h1 className="mb-4 text-center">Login</h1>

          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>

          <div className="mt-3 text-center">
            <p>
              Don't have an account? <a href="/register" className="custom-link">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
