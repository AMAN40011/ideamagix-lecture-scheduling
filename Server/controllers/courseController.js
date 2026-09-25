import Course from "../models/Course.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;

    // Validate required fields
    if (!name || !level || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "Name, level, description and image are required",
      });
    }

    // Create course
    const course = await Course.create({
      name,
      level,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating course",
    });
  }
};


export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
    });
  }
};