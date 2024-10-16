import { Navigate } from 'react-router-dom'
export default function PrivateRoute(props) {
    if(localStorage.getItem('token')) {
        return props.children 
    } else {
        return <Navigate to="/login" />
    }
}