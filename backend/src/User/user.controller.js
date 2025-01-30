import bcrypt from 'bcrypt';
import User from "./user.model.js";
import generateToken from '../middleware/generateToken.js';

// Register
export const Register = async (req, res) => {
    try {
        // Extract username, email, and password from the request body
        const { username, email, password } = req.body;

        // Hash the password using bcrypt with a salt round of 10
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new User instance with the hashed password
        const user = new User({
            email,
            username,
            password: hashPassword
        });

        // Save the new user to the database
        await user.save();

        // Respond with success message and status 200 (OK)
        res.status(200).json({
            success: true,
            message: "User created successfully"
        });
    } catch (error) {
        // Handle any errors that occur during the registration process
        res.status(500).json({
            message: "Error registering user",
            error: error.message,
            success: false
        });
    }
};

// Login
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email in the database
        const user = await User.findOne({ email });

        // If the user is not found, respond with a 404 (Not Found) status
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);

        // If the password is invalid, respond with a 401 (Unauthorized) status
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate a JWT token for the user
        const token = await generateToken(user._id);

        // Set the token as an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        // Respond with success message, token, and user information
        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession,
            }
        });
    } catch (error) {
        // Handle any errors that occur during the login process
        res.status(500).json({
            message: "Error logging in user",
            error: error.message,
            success: false
        });
    }
};

// Logout
export const Logout = (req, res) => {
    // Clear the HTTP-only cookie containing the token
    res.clearCookie('token');

    // Respond with success message and status 200 (OK)
    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
};

// Delete User
export const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID and delete from the database
        const user = await User.findByIdAndDelete(id);

        // If the user is not found, respond with a 404 (Not Found) status
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Respond with success message and status 200 (OK)
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        res.status(500).json({
            message: "Error deleting user",
            error: error.message,
            success: false
        });
    }
};

// Get All Users
export const GetAllUser = async (req, res) => {
    try {
        // Retrieve all users from the database, selecting only id, email, and role
        const users = await User.find({}, 'id email role').sort({ createdAt: -1 });

        // Respond with success message and the retrieved users
        res.status(200).json({
            success: true,
            users: users
        });
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        res.status(500).json({
            message: "Error fetching all users",
            error: error.message,
            success: false
        });
    }
};



// Edit Profile
export const EditProfile = async (req, res) => {
    try {
        const { userId, username, email } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).send({ message: "User ID is required" });
        }

        // Find the user by ID in the database
        const user = await User.findById(userId);

        // If the user is not found, respond with a 404 (Not Found) status
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Update user profile information if provided
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;

        // Save the updated user profile to the database
        await user.save();

        // Respond with success message and the updated user information
        res.status(200).send({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        // Handle any errors that occur during the profile update process
        console.error("Error updating user profile", error);
        res.status(500).send({ message: "Error updating user profile" });
    }
};
