import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../components/Login'
import Register from '../components/Register'
import Profile from '../pages/Profile'
import ViewCourse from '../pages/Course/ViewCourse'
import SingleCourse from '../pages/Course/SingleCourse'
import AddCourse from '../pages/Course/AddCourse'
import Home from '../pages/Home'
import UpdateCourse from '../pages/Course/UpdateCourse'
import PrivateRoute from './PrivateRoute'
// import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            // { path: '/categories/:categoryName', element: <CategoryPage /> },
            // { path: '/search', element: <Search /> },
            { path: "/addCourse", element:<PrivateRoute> <AddCourse /> </PrivateRoute>},
            { path: '/viewCourses', element: <PrivateRoute> <ViewCourse /></PrivateRoute> },
            { path: '/viewCourse/:id', element: <PrivateRoute> <SingleCourse /></PrivateRoute> },
            { path: '/profile', element: <PrivateRoute> <Profile /> </PrivateRoute>},
            { path: '/updateCourse/:id', element: <PrivateRoute> <UpdateCourse /></PrivateRoute> },
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },

    //dashboar route


])

export default router