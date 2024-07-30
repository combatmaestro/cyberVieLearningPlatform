const ScheduledClass = require('../models/Class');

exports.scheduleClass = async (req, res) => {
  const { batchId,teacherId, teacherName, time } = req.body;

  try {
    // Create a new scheduled class
    const newScheduledClass = new ScheduledClass({
      batchId,
      teacherName,
      teacherId,
      time,
    });

    // Save the scheduled class to the database
    await newScheduledClass.save();

    res.status(200).json({
      success: true,
      data: newScheduledClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
