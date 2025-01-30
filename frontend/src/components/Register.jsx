import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

export default function Register() {
    // State variables for form inputs and error message
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Initialize registerUser mutation hook
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    
    // Initialize navigate hook for navigation
    const navigate = useNavigate();
    
    // Initialize dispatch hook for Redux actions
    const dispatch = useDispatch();

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password
        };

        try {
            // Call the registerUser mutation
            const response = await registerUser(data).unwrap();
            toast.success("Register Successful");
            navigate('/login'); // Navigate to login page after successful registration
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <section className="h-screen flex items-center justify-center">
            <div className="max-w-sm border shadow bg-white mx-auto p-8">
                <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
                <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {message && <p className="text-red-500">{message}</p>}
                    <button
                        type="submit"
                        className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
                    >
                        Register
                    </button>
                </form>
                <p className="my-5 italic text-sm text-center">
                    Already have an account?
                    Please <Link to="/login" className='text-red-700 px-1 underline'>Login</Link>
                </p>
            </div>
        </section>
    );
}
