import { useState } from "react";
import CourseTable from "./CourseTable";
import { useFetchAllCoursesQuery } from "../../redux/features/course/courseApi";

export default function ViewCourse() {
    // Fetch all courses using the query hook
    const { data: { courses = [] } = {}, error, isLoading, refetch } = useFetchAllCoursesQuery();

    // Render loading message while fetching data
    if (isLoading) return <div>Loading...</div>;
    
    // Render error message if there's an error fetching data
    if (error) return <div>Error While Loading Course</div>;

    return (
        <>
            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-12 gap-8">
                    {/* left side */}
                    {/* Right Side */}
                    <div className="w-full">
                        {/* Pass fetched courses to the CourseTable component */}
                        <CourseTable courses={courses} />
                    </div>
                </div>
            </section>
        </>
    );
}
