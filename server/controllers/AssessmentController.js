const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Assessment = require('../models/assessment');
const Questions = require('../models/Questions');

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

