import { createSlice } from "@reduxjs/toolkit";

// Function to load user data from local storage
const loadUserFromLocalStorage = () => {
    try {
        // Get the serialized state from local storage
        const serializedState = localStorage.getItem('user');
        // If no data is found, return an initial state with user as null
        if (serializedState == null) return { user: null };
        // Parse and return the serialized state as an object
        return { user: JSON.parse(serializedState) };
    } catch (error) {
        console.log(error);
        // If an error occurs, return an initial state with user as null
        return { user: null };
    }
};

// Initialize the state with user data from local storage
const initialState = loadUserFromLocalStorage();

// Create an authentication slice using createSlice from Redux Toolkit
const authSlice = createSlice({
    // Name of the slice
    name: 'auth',
    // Initial state of the slice
    initialState,
    // Reducers to handle state changes
    reducers: {
        // Set user reducer: updates the state with user data
        setUser: (state, action) => {
            state.user = action.payload.user;
            // Save user data to local storage
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        // Logout reducer: clears the user data from state and local storage
        logout: (state) => {
            state.user = null;
            // Remove user data from local storage
            localStorage.removeItem('user');
        }
    }
});

// Export the setUser and logout actions
export const { setUser, logout } = authSlice.actions;
// Export the auth slice reducer
export default authSlice.reducer;
