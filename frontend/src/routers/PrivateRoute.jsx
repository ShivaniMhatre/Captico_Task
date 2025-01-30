
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function PrivateRoute({ children, role }) {
    const { user } = useSelector((state) => state.auth)
    const location = useLocation()
    if (!user) {
        toast.error('You Must be logged in!!!');
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    // if (role && user.role !== role) {
    //     toast.error('You no authorized to access this page !!!');
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }


    return children
}
