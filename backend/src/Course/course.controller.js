import Course from "./course.model.js";

// Add new course
export const addNewCourse = async (req, res) => {
    try {
        // Create a new Course instance with the data from the request body
        const newCourse = new Course({
            ...req.body
        });

        // Save the new course instance to the database
        const saveCourse = await newCourse.save();
        
        // Respond with the saved course data and a status of 201 (Created)
        res.status(201).json(saveCourse);
    } catch (error) {
        // Handle any errors that occur during the creation process
        res.status(500).json({
            message: "Error creating course",
            error: error.message,
            success: false
        });
    }
};

// Get all courses
export const GetAllCourses = async (req, res) => {
    try {
        // Retrieve all courses from the database, sorted by creation date (newest first)
        const courses = await Course.find({}).sort({ createdAt: -1 });
        
        // Respond with the retrieved courses and a status of 200 (OK)
        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        res.status(500).json({
            success: false,
            message: "Error fetching courses",
            error: error.message
        });
    }
};

// Get a single course by ID
export const GetSingleCourse = async (req, res) => {
    try {
        // Get the course ID from the request parameters
        const courseId = req.params.id;

        // Find the course by ID and populate the userId field with email and username
        const course = await Course.findById(courseId).populate("userId", "email username");

        // If the course is not found, respond with a 404 (Not Found) status
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "course not found",
            });
        }

        // Respond with the found course and a status of 200 (OK)
        res.status(200).json({
            course
        });
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        res.status(500).json({
            success: false,
            message: "Error fetching single course",
            error: error.message
        });
    }
};

// Update a course by ID
export const UpdateCourse = async (req, res) => {
    try {
        // Get the course ID from the request parameters
        const courseId = req.params.id;

        // Find the course by ID and update it with the data from the request body
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { ...req.body },
            { new: true } // Return the updated course instead of the original
        );

        // If the course is not found, respond with a 404 (Not Found) status
        if (!updatedCourse) {
            return res.status(404).send({ message: "Course not found" });
        }

        // Respond with the updated course and a status of 200 (OK)
        res.status(200).send({
            message: "Course updated successfully",
            course: updatedCourse,
        });
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error("Error updating the course", error);
        res.status(500).send({ message: "Failed to update the course" });
    }
};

// Delete a course by ID
export const DeleteCourse = async (req, res) => {
    try {
        // Get the course ID from the request parameters
        const courseId = req.params.id;

        // Find the course by ID and delete it from the database
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        // If the course is not found, respond with a 404 (Not Found) status
        if (!deletedCourse) {
            return res.status(404).send({ message: "Course not found" });
        }

        // Respond with a success message and a status of 200 (OK)
        res.status(200).send({
            message: "Course deleted successfully",
        });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error("Error deleting the course", error);
        res.status(500).send({ message: "Failed to delete the course" });
    }
};
