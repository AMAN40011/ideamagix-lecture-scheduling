import Lecture from "../models/Lecture.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

export const createLecture = async (req, res) => {
  try {
    const {
      course,
      batchName,
      instructor,
      scheduleDate,
    } = req.body;

    // 1. Validate required fields
    if (!course || !batchName || !instructor || !scheduleDate) {
      return res.status(400).json({
        success: false,
        message:
          "Course, batch name, instructor and schedule date are required",
      });
    }

    // 2. Check whether the course exists
    const existingCourse = await Course.findById(course);

    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 3. Check whether the instructor exists
    const existingInstructor = await User.findOne({
      _id: instructor,
      role: "instructor",
    });

    if (!existingInstructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // 4. Check instructor/date conflict
    const existingLecture = await Lecture.findOne({
      instructor,
      scheduleDate,
    });

    if (existingLecture) {
      return res.status(409).json({
        success: false,
        message:
          "This instructor already has a lecture scheduled on this date",
      });
    }

    // 5. Create lecture
    const lecture = await Lecture.create({
      course,
      batchName,
      instructor,
      scheduleDate,
    });

    // 6. Return created lecture
    const populatedLecture = await Lecture.findById(lecture._id)
      .populate("course", "name level")
      .populate("instructor", "name email");

    res.status(201).json({
      success: true,
      message: "Lecture scheduled successfully",
      lecture: populatedLecture,
    });
  } catch (error) {
    console.error("Create lecture error:", error);

    // Handle MongoDB duplicate-key race condition
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "This instructor already has a lecture scheduled on this date",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while scheduling lecture",
    });
  }
};

export const getMyLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      instructor: req.user.id,
    })
      .populate("course", "name level description image")
      .populate("instructor", "name email")
      .sort({ scheduleDate: 1 });

    res.status(200).json({
      success: true,
      lectures,
    });
  } catch (error) {
    console.error("Get my lectures error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching lectures",
    });
  }
};


export const getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("course", "name level")
      .populate("instructor", "name email")
      .sort({ scheduleDate: 1 });

    res.status(200).json({
      success: true,
      lectures,
    });
  } catch (error) {
    console.error("Get all lectures error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching lectures",
    });
  }
};