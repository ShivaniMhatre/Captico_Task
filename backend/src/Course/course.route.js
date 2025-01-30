import express from 'express'
import { addNewCourse, DeleteCourse, GetAllCourses, GetSingleCourse, UpdateCourse } from './course.controller.js'


const router = express.Router()

router.post('/addNewCourse', addNewCourse);
router.get('/getallcourse',GetAllCourses);
router.get('/:id', GetSingleCourse);
router.patch('/updateCourse/:id', UpdateCourse)
router.delete('/:id', DeleteCourse);
export default router