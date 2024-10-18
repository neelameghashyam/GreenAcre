import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import '../css/Register.css'; // Import your custom CSS

export default function Register() {
  const { handleRegister } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '', password: '' });

  // Validation functions
  const validateName = (name) => {
    if (!name) {
      return "Name field is required";
    } else if (name.length < 2 || name.length > 50) {
      return "Name must be between 2 and 50 characters";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone) {
      return "Phone number field is required";
    } else if (!/^\d{10}$/.test(phone)) {
      return "Phone number must be exactly 10 digits long";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email) {
      return "Email field is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email should be in a valid format";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validations
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || phoneError || emailError || passwordError) {
      setErrors({ name: nameError, phone: phoneError, email: emailError, password: passwordError });
      return;
    }

    // Clear errors if valid
    setErrors({ name: '', phone: '', email: '', password: '' });

    const formData = { name, phone, email, password };
    handleRegister(formData);
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <form className="register-form border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Register</h2>

          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="text"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Enter Email"
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
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
