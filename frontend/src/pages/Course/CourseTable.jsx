import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDeleteCourseMutation, useFetchAllCoursesQuery } from "../../redux/features/course/courseApi";
import { toast } from "react-toastify";
import { use, useEffect } from "react";

export default function CourseTable({ courses }) {
    // Access user information from Redux store
    const { user } = useSelector((state) => state.auth);
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

  
    return (
        <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                    <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            #
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Course Id
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Course Name
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Description
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Instructor
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            View Course
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Edit
                        </th>
                    </tr>
                </thead>

                {/* map the course */}
                <tbody>
                    {
                        courses && courses.map((course, index) => (
                            <tr key={index}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                    {index + 1}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {course?._id}
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {course?.coursename}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {course?.description}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {course?.instructor}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ml-10">
                                    <button
                                        onClick={() => navigate(`/viewCourse/${course?._id}`)}
                                        className='bg-blue-600 text-white px-2 py-1'><i className="ri-eye-line"></i></button>
                                </td>
                                {/* if logged user id and user id in course is equal then only display edit and delete (course is added by user only this user is allow to delete) */}
                                {
                                    user?._id === course?.userId &&
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer hover:text-primary flex items-center gap-5">
                                        <Link className='bg-green-600 text-white px-2 py-1' to={`/updateCourse/${course._id}`}>
                                            <i className="ri-file-edit-line"></i>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProduct(course?._id)}
                                            className='bg-red-600 text-white px-2 py-1'>
                                            <i className="ri-delete-bin-6-line"></i>
                                        </button>
                                    </td>
                                }
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
