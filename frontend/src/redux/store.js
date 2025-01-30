import { configureStore } from '@reduxjs/toolkit'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import courseApi from './features/course/courseApi'

export const store = configureStore({
    reducer: {
       
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [courseApi.reducerPath]: courseApi.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            courseApi.middleware),
})