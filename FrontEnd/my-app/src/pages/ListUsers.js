import { useEffect, useState, useContext } from "react";
import axios from "../config/axios";
import AuthContext from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/ListUsers.css"; // Import your custom CSS

export default function ListUsers() {
    const [users, setUsers] = useState([]);
    const { state } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/user/accounts', {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err.response?.data || err.message);
            }
        };
        fetchUsers();
    }, []);

    const handleChangeRole = async (id, role) => {
        try {
            const response = await axios.put(`/api/user/role/${id}`, { role }, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            setUsers(users.map(user => user._id === id ? response.data : user));
        } catch (err) {
            console.error("Error changing user role:", err.response?.data || err.message);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`/api/user/deleteUser/${id}`, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            setUsers(users.filter(user => user._id !== id));
        } catch (err) {
            console.error("Error deleting user:", err.response?.data || err.message);
        }
    };

    // Calculate user statistics
    const totalUsers = users.length;
    const adminCount = users.filter(user => user.role === 'admin').length;
    const moderatorCount = users.filter(user => user.role === 'moderator').length;
    const usersCount=users.filter(user => user.role === 'user').length;

    return (
        <div className="container mt-5">
            <div className="user-stats mb-4">
                {/* <h2>User Statistics</h2> */}
                <div className="stats">
                    <div className="stat-item">
                        <strong>Total Users: </strong>{totalUsers}
                    </div>
                    <div className="stat-item">
                        <strong>Admins: </strong>{adminCount}
                    </div>
                    <div className="stat-item">
                        <strong>Moderators: </strong>{moderatorCount}
                    </div>
                    <div className="stat-item">
                        <strong>Users: </strong>{usersCount}
                    </div>
                </div>
            </div>
            <h2 className="mb-4 text-center" style={{ color: 'black' }}>Listing Users</h2>
            <ul className="list-group">
                {users.map((user) => (
                    <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <b>{user.name.toUpperCase()}</b> - {user.email} - <strong>{user.role}</strong>
                        </div>
                        {state.user.role === 'admin' && state.user._id !== user._id && (
                            <div className="d-flex align-items-center">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleChangeRole(user._id, e.target.value)}
                                    className="form-select me-2"
                                    style={{ width: 'auto' }} // Optional: Set width to auto
                                >
                                    <option value=''>Select Role</option>
                                    {['admin', 'moderator', 'user'].map((role, i) => (
                                        <option value={role} key={i}>{role}</option>
                                    ))}
                                </select>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleDeleteUser(user._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
