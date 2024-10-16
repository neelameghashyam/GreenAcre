import { useState, useContext } from 'react'; 
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ResetPass.css'

export default function ResetPassword() {
    const { handleResetPassword } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            newPassword: newPassword,
            password: password,
        };
        handleResetPassword(formData);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Reset Password</h2>
            <div className="card p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Current Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Current Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
