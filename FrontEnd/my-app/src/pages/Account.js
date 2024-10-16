import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you have Bootstrap styles imported

export default function Account() {
  const { state } = useContext(AuthContext); 
  const [user, setUser] = useState({}); // State to store user data
  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
  const [formData, setFormData] = useState({ name: '', phone: '' }); // State for the form data

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${state.user._id}`, { 
          headers: { 'Authorization': localStorage.getItem('token') },
        });
        setUser(response.data); 
        setFormData({ name: response.data.name, phone: response.data.phone }); // Pre-fill form with user data
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    if (state.user && state.user._id) {
      fetchUser();
    }
  }, [state.user]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to edit user details
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/edit', formData, {
        headers: { 'Authorization': localStorage.getItem('token') },
      });
      setUser(response.data); // Update user state with new data
      setIsEditing(false); // Close the form
    } catch (err) {
      console.error('Error updating user data:', err);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title">Account Details</h3>

              {/* If editing, show the form */}
              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="mt-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
                </form>
              ) : (
                // Display user data
                <>
                  <ul className="list-group list-group-flush mt-4">
                    <li className="list-group-item">
                      <strong>Name:</strong> {user.name || 'Loading...'}
                    </li>
                    <li className="list-group-item">
                      <strong>Phone:</strong> {user.phone || 'Loading...'}
                    </li>
                    <li className="list-group-item">
                      <strong>Email:</strong> {user.email || 'Loading...'}
                    </li>
                  </ul>

                  <div className="mt-4 d-flex justify-content-between">
                    <Link to={`/reset-password`} className="btn btn-outline-primary">Reset Password</Link>
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
