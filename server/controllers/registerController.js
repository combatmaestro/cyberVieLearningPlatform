const FormData = require('../models/register');

exports.saveFormData = async (req, res) => {
  try {
    const { name, email, mobile, currentSalary, expectedSalary } = req.body;

    // Check if email or mobile already exists
    const existingUser = await FormData.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or mobile already exists' });
    }

    const newFormData = new FormData({ name, email, mobile, currentSalary, expectedSalary });

    await newFormData.save();

    return res.status(200).json({ message: 'Form data saved successfully', data: newFormData });
  } catch (error) {
    return res.status(500).json({ message: 'Error saving form data', error: error.message });
  }
};


exports.getAllFormData = async (req, res) => {
    try {
      // Retrieve all documents from the FormData collection
      const allData = await FormData.find();
  
      return res.status(200).json({ message: 'All form data retrieved successfully', data: allData });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving form data', error: error.message });
    }
  };