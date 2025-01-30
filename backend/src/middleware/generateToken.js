import jwt from 'jsonwebtoken';
import User from '../User/user.model.js';

// Function to generate a JWT token for a given user ID
const generateToken = async (userId) => {
  try {
    // Find the user by ID in the database
    const user = await User.findById(userId);

    // If the user is not found, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // Generate a JWT token with the user ID and role, and set an expiration time
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h', // Token expires in 1 hour
      }
    );

    // Return the generated token
    return token;
  } catch (error) {
    // Handle any errors that occur during the token generation process
    console.error('Error generating token:', error.message);
    throw error;
  }
};

// Export the generateToken function for use in other parts of the application
export default generateToken;
