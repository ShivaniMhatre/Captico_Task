import { useEffect, useState } from 'react';
import { useFetchSingleCourseQuery } from '../../redux/features/course/courseApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
                    </div>
                </div>
            </section>
        </>
    );
}
