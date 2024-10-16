import { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import axios from '../config/axios';

const initialState = {
    user: null, 
    isLoggedIn: false 
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_USER' : {
            return { ...state, isLoggedIn: true, user: action.payload };
        } 
        case 'LOGOUT_USER' : {
            return { ...state, isLoggedIn: false, user: null };
        }
        default:
            return state;
    }
};

function AuthProvider(props) {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userResponse = await axios.get('/api/user/account', {
                        headers: { 'Authorization': token },
                    });
                    dispatch({ type: 'LOGIN_USER', payload: userResponse.data });
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    // Optionally handle the error here, such as logging out the user or redirecting
                }
            }
        })();
    }, []);
    const handleRegister = async (formData) => {
        try {
            await axios.post('/api/user/register', formData);
            toast('Successfully Registered', { autoClose: 1000 });
            navigate('/login');
        } catch (err) {
            console.log(err.response.data); // Log the response to see detailed error
        }
    };
    

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post('/api/user/login', formData);
            localStorage.setItem('token', response.data.token);
            toast('Successfully logged in', { autoClose: 500 });

            const userResponse = await axios.get('/api/user/account', {
                headers: { 'Authorization': localStorage.getItem('token') },
            });
            dispatch({ type: 'LOGIN_USER', payload: userResponse.data });
            // console.log(userResponse.data)
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT_USER' });
        toast('Successfully logged out');
        navigate('/login');
    };

    const handleResetPassword = async (formData) => {
        try {
            await axios.put('/api/user/reset', formData, { headers: { 'Authorization': localStorage.getItem('token') }});
            toast('Successfully Reset Password', { autoClose: 1000 });
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
        }
    };

    const handleForgotPassword = async (formData) => {
        try {
            await axios.post('/api/users/forget-password', formData);
            toast('Password reset link sent', { autoClose: 1000 });
        } catch (err) {
            console.log(err);
        }
    };

    const handleOtpVerification = async (formData) => {
        try {
            await axios.put('/api/user/otp-verification', formData);
            toast('OTP successfully verified', { autoClose: 1000 });
        } catch (err) {
            console.log(err);
        }
    };

    const handleResetForgotPassword = async (formData) => {
        try {
            await axios.put('/api/users/reset-forget-password', formData);
            toast('Password successfully reset', { autoClose: 1000 });
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    const handlePropertyCreation = async (formData) => {
        try {
            const response = await axios.post('/api/property/post-property', formData, {
                headers: { 'Authorization': localStorage.getItem('token') },
            });
            if (response.status === 201) {
                toast('Property created successfully', { autoClose: 1000 });
                navigate('/home');
            }
        } catch (err) {
            console.error('Property creation error:', err.response ? err.response.data : err.message);
            toast.error('Property creation failed');
        }
    };

    const handleAuctionCreation = async (formData) => {
        try {
            const response = await axios.post('/api/auction/create', formData, {
                headers: { 'Authorization': localStorage.getItem('token') },
            });
            if (response.status === 201) {
                toast('Property created successfully', { autoClose: 1000 });
                navigate('/auctions');
            }
        } catch (err) {
            console.error('Property creation error:', err.response ? err.response.data : err.message);
            toast.error('Property creation failed');
        }
    };

    
    
    

    return (
        <AuthContext.Provider value={{ state, handleRegister, handleLogin, handleLogout, handleResetPassword, handleForgotPassword, handleOtpVerification,
         handleResetForgotPassword,handlePropertyCreation,handleAuctionCreation }}>
            { props.children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
