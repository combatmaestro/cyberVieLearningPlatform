const FormData = require('../models/register');
const portalUsers = require('../models/User');
exports.saveFormData = async (req, res) => {
  try {
    const { name, email, phoneNumber, organization, designation, experience, location, tier } = req.body;
    const existingUser = await portalUsers.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    
    const newFormData = await FormData.create(req.body);

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