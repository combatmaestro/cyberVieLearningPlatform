const mongoose = require('mongoose');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Assessment = require('../models/assessment');
const Questions = require('../models/Questions');
const AssessmentReview = require('../models/assessmentReview');
const User =  require('../models/User');
const Class = require('../models/Class');
const QuestionAnswer = require('../models/QuestionAnswer');
module.exports.saveAssessment = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    const { selectedModule, questions } = req.body;
  
    try {
      // Check if an assessment for the selected module already exists
      let assessment = await Assessment.findOne({ moduleId: selectedModule });
  
      // If assessment exists, delete existing questions
      if (assessment) {
        await Questions.deleteMany({ _id: { $in: assessment.Questions } });
      } else {
        // If no assessment exists, create a new one
        assessment = new Assessment({
          moduleId: selectedModule,
          Questions: [],
        });
      }
  
      // Create and save each question
      const questionIds = await Promise.all(
        questions.map(async (questionData, index) => {
          const question = new Questions({
            sno: index + 1,
            question: questionData.title,
            totalMarks: questionData.marks,
          });
          const savedQuestion = await question.save();
          return savedQuestion._id;
        })
      );
  
      // Update the assessment with the new question IDs
      assessment.Questions = questionIds;
  
      // Save the updated assessment
      const savedAssessment = await assessment.save();
  
      // Send response
      res.status(200).json({
        message: 'Assessment saved successfully',
        data: {},
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
      res.status(500).json({
        message: 'Failed to save assessment',
        error: error.message,
      });
    }
  });


  module.exports.getAssessmentsByModuleId = catchAsyncErrors(async (req, res, next) => {
    const { moduleId } = req.params;

    try {
        const assessments = await Assessment.find({ moduleId: moduleId }).populate('Questions');

        if (!assessments.length) {
            return res.status(404).json({
                success: false,
                message: 'No assessments found for this module',
            });
        }

        res.status(200).json({
            success: true,
            data: assessments,
        });
    } catch (error) {
        console.error('Error fetching assessments:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch assessments',
            error: error.message,
        });
    }
});

module.exports.assessmentReview = async (req, res) => {
  const { userId, submittedBy, moduleId, questionandanswers , assessmentStatus } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    console.log("User document:", user);
    console.log("User's batch ID:", user.batch);

    // Ensure batch ID is an ObjectId and not a string
    const batchId = user.batch;
    const classDetails = await Class.findOne({ batchId });
    console.log("Teacher Class Document:", classDetails);

    if (!classDetails) {
      return res.status(404).json({ success: false, message: 'Teacher not found for the student' });
    }

    // Find the teacher allocated to the batch
    const teacherAllocated = classDetails.teacherId;
    const questionAnswerIds = [];
    for (const qa of questionandanswers) {
      const questionAnswer = new QuestionAnswer(qa);
      await questionAnswer.save();
      questionAnswerIds.push(questionAnswer._id);
    }
    // Create a new assessment review
    const newAssessmentReview = new AssessmentReview({
      userId,
      submittedBy,
      moduleId,
      teacherAllocated,
      questionAndAnswers : questionAnswerIds,
      assessmentStatus 
    });

    // Save the assessment review to the database
    await newAssessmentReview.save();

    res.status(200).json({
      success: true,
      data: newAssessmentReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};


module.exports.getAllAssessmentsToReview = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const assessments = await AssessmentReview.find({
      teacherAllocated: teacherId,
      assessmentStatus: 'submitted'
    }).populate('questionAndAnswers')

    res.status(200).json({
      success: true,
      data: assessments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports.getAllAssessments = catchAsyncErrors(async (req, res, next) => {
  try {
      const assessments = await Assessment.find().populate('Questions');

      res.status(200).json({
          success: true,
          data: assessments,
      });
  } catch (error) {
      console.error('Error fetching all assessments:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to fetch all assessments',
          error: error.message,
      });
  }
});