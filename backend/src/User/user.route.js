import express from 'express';
import {
    EditProfile,
    GetAllUser,
    Login,
    Logout,
    Register,
} from './user.controller.js';

const router = express.Router();

router.post("/register", Register)
router.post("/login", Login);
router.post('/logout', Logout);
router.get('/getalluser', GetAllUser)
router.patch('/edit-profile', EditProfile)


export default router