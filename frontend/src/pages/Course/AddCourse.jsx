import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAddCourseMutation } from "../../redux/features/course/courseApi";

export default function AddCourse() {
    // Access user information from Redux store
    const { user } = useSelector((state) => state.auth);

    // Initialize state for course details
    const [course, setCourse] = useState({
        name: '',
        instructor: '',
        description: ''
    });

    // Initialize the AddCourse mutation hook
    const [AddCourse, { isLoading, error }] = useAddCourseMutation();

    // Handle input changes and update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value
        });
    };

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!course.coursename || !course.instructor || !course.description) {
            toast.error('Please fill all the required fields');
            return;
        }

        try {
            // Add course with user ID
            await AddCourse({ ...course, userId: user?._id }).unwrap();

            // Show success toast message
            toast.success('Course added successfully');

            // Reset form inputs
            setCourse({
                coursename: '',  // Corrected property name
                instructor: '',
                description: ''
            });

            // Navigate to view courses page
            navigate("/viewCourses");
        } catch (error) {
            console.log("Failed to submit course", error);
        }
    };

    return (
        <section className="h-screen flex items-center justify-center">
            <div className="max-w-sm border shadow bg-white mx-auto p-8">
                <h2 className="text-2xl font-semibold pt-5">Add a New Course</h2>
                <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto pt-8">
                    <input
                        type="text"
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        name="coursename"
                        id='coursename'
                        placeholder="Course Name"
                        value={course.coursename}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        id='description'
                        placeholder="Description"
                        value={course.description}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                        name="instructor"
                        id='instructor'
                        placeholder="Instructor Name"
                        value={course.instructor}
                        onChange={handleChange}
                    />
                    <div>
                        <button type='submit' className='add-product-btn'>Add Course</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
