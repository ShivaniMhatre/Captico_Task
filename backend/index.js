import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import userRoutes from './src/User/user.route.js';
import courseRoutes from './src/Course/course.route.js'


dotenv.config();

const app = express()
//middleware setup
app.use(express.json())
// app.use(express.urlencoded({ limit: '50mb' }))
app.use(cookieParser());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// app.use(cors())

app.listen(5000, () => {
    console.log("Server running on port 5000!!!")
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(() => {
        console.log("Error connecting to MongoDB")
    })


//all route
app.use('/api/auth', userRoutes);
app.use('/api/course', courseRoutes);

// app.post('/uploadimage', (req, res) => {
//     uploadImage(req.body.image)
//         .then((url) => res.send(url))
//         .catch((err) => res.status(500).send(err));
// });

// app.post('/uploadimage', async (req, res) => {
//     try {
//         console.log("Received image data:", req.body.image);
//         if (!req.body.image) {
//             return res.status(400).json({ error: "Image data is required" });
//         }

//         const url = await uploadImage(req.body.image);
//         res.json({ imageUrl: url });
//     } catch (error) {
//         console.error("Image Upload Error:", error);  // <-- Log full error
//         res.status(500).json({ error: "Failed to upload image", details: error.message });
//     }
// });



// console.log("Cloudinary Config:", {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });


// Image upload route
