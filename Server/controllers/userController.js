import User from "../models/User.js";

export const getInstructors = async (req, res) => {
  try {
    const instructors = await User.find(
      { role: "instructor" },
      { password: 0 }
    );

    res.status(200).json({
      success: true,
      instructors,
    });
  } catch (error) {
    console.error("Get instructors error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching instructors",
    });
  }
};