import mongoose, { model, Schema } from "mongoose";

const courseSchema = new Schema({
    coursename: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })
const Course = new model('Course', courseSchema);
export default Course

