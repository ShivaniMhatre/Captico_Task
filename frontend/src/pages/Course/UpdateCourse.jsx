import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchCourseByIdQuery, useUpdateCourseMutation } from '../../redux/features/course/courseApi';
import { toast } from 'react-toastify';

export default function UpdateCourse() {
    // Get the course ID from the URL parameters
    const { id } = useParams();
    // Initialize the navigate hook
    const navigate = useNavigate();
    // Access user information from Redux store
    const { user } = useSelector((state) => state.auth);
    // Initialize state for course details
    const [course, setCourse] = useState({
        coursename: '',
        instructor: '',
        description: ''
    });

    // Fetch single course data using the provided course ID
    const { data: courseData, isLoading: isCourseLoading, error: fetchError, refetch } = useFetchCourseByIdQuery(id);

    // Destructure course data from the API response or initialize as an empty object
    const { coursename, description, instructor } = courseData?.course || {};

    // Initialize the updateCourse mutation hook
    const [updateCourse, { isLoading: isUpdating, error: updateError }] = useUpdateCourseMutation();

    // Update course state when courseData changes
    useEffect(() => {
        if (courseData) {
            setCourse({
                coursename: coursename || '',
                instructor: instructor || '',
                description: description || '',
            });
        }
    }, [courseData]);

    // Handle input changes and update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create updated course object
        const updatedCourse = {
            ...course,
            userId: user?._id
        };

        try {
            // Call the updateCourse mutation
            await updateCourse({ id: id, ...updatedCourse }).unwrap();
            toast.success('Course updated successfully');
            await refetch(); // Refetch course data after updating
            navigate("/viewCourses"); // Navigate to view courses page
        } catch (error) {
            console.error('Failed to update course:', error);
        }
    };

    // Render loading message while fetching data
    if (isCourseLoading) return <div>Loading....</div>;
    // Render error message if there's an error fetching data
    if (fetchError) return <div>Error fetching course!...</div>;

    return (
        <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>Update Course</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor="coursename" className='block text-sm font-medium text-gray-700'>Course Name</label>
                    <input name="coursename" id="coursename"
                        className='add-product-InputCSS'
                        value={course.coursename}
                        placeholder='Write a Course Name'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea name="description" id="description"
                        className='add-product-InputCSS'
                        value={course.description}
                        placeholder='Write a course description'
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="instructor" className='block text-sm font-medium text-gray-700'>Instructor</label>
                    <input name="instructor" id="instructor"
                        className='add-product-InputCSS'
                        value={course.instructor}
                        placeholder='Write an instructor name'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type='submit'
                        className='add-product-btn'
                    >
                        {isUpdating ? 'Updating...' : 'Update Course'}
                    </button>
                </div>
            </form>
        </div>
    );
}
