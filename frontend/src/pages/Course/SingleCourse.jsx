
import { useDeleteCourseMutation, useFetchSingleCourseQuery } from '../../redux/features/course/courseApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function SingleCourse() {
    // Access user information from Redux store
    const { user } = useSelector((state) => state.auth);

    // Get the course ID from the URL parameters
    const { id } = useParams();

    // Fetch single course data using the provided course ID
    const { data, error, isLoading } = useFetchSingleCourseQuery(id);

    // Destructure course data from the API response or initialize as an empty object
    const singleCourse = data?.course || {};

    // Log the fetched course data for debugging purposes
    console.log(singleCourse);

    // Initialize the navigation hook
    const navigate = useNavigate();


    // Initialize the deleteCourse mutation hook
    const [deleteCourse] = useDeleteCourseMutation();

    // Handle delete course action
    const handleDeleteProduct = async (id) => {
        try {
            // Call the deleteCourse mutation
            const response = await deleteCourse(id).unwrap();
            toast.success("Course deleted successfully");

            // Optionally, refetch data or update state to reflect the deletion
            await refetch(); // Ensure this function is defined or handled appropriately
        } catch (error) {
            console.error("Error deleting course", error);
        }
    };

    // Render loading message while fetching data
    if (isLoading) return <p>Loading.....</p>;

    // Render error message if there's an error fetching data
    if (error) return <p>Error While Loading Product Details...</p>;

    return (
        <>
            <section className="section__container mt-8">
                <div className="flex flex-col items-center md:flex-row gap-8">
                    <div className="md:w-1/2 w-full">
                        <h3 className="text-2xl font-semibold mb-4">
                            <strong>Course Name: </strong>{singleCourse?.coursename}
                        </h3>
                        <p className="text-gray-700 mb-4">
                            <strong>Course Description: </strong>{singleCourse?.description}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong>Course Instructor: </strong>{singleCourse?.instructor}
                        </p>
                        {
                            user?._id === singleCourse?.userId?._id && (
                                <div>
                                    <button className="w-full mt-5 bg-indigo-900 text-white font-medium py-3 rounded-md" onClick={() => navigate(`/updateCourse/${singleCourse?._id}`)}>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(singleCourse?._id)} className="w-full mt-5 bg-green-900 text-white font-medium py-3 rounded-md" >
                                        Delete
                                    </button>
                                </div>)
                        }
                    </div>
                </div>
            </section>
        </>
    );
}
