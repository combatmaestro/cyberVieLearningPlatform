const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Module = require('../models/Module')
const Responses = require('../models/Responses')
const User = require('../models/User')
const ErrorHandler = require('../utils/errorHandler')

module.exports.getAllModule = catchAsyncErrors(async (req, res, next) => {
  console.log(req)
  const modules = await Module.find({hidden: false}).select('title description type hidden')

  return res.status(200).json({
    success: true,
    data: modules,
  })
})

module.exports.getDetails = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.findById(req.query.id).populate({
    path: 'topic',
    match: { hidden: false },
    populate: {
      path: 'ctf',
      match: { hidden: false },
      options: {
        sort: {
          sno: 1,
        },
      },
    },
  })

 

  if (!module) {
    return next(new ErrorHandler('Module not found', 404))
  }

  if (
    req.user.role === 'user' &&
    req.user.tier === 'free' &&
    module.type === 'paid'
  ) {
    return next(new ErrorHandler('Module Access Not Found', 404))
  }

  if (req.user.role === 'user' && module.hidden) {
    return next(new ErrorHandler('Module  Not Found', 404))
  }

  const allResponses = await User.findById(req.user._id).select('responses')
  const responsesId = allResponses.responses.get(req.query.id)
  const responses = await Responses.findById(responsesId)

  return res.status(200).json({
    success: true,
    module: module,
    responses: responses ? responses.responses : [],
  })
})

// admin controls

//-> /module/admin/details

module.exports.getTopicDetails = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.findById(req.query.id).populate({
    path: 'topic',
    select: 'hidden topicName',
  })

  if (!module) {
    return next(new ErrorHandler('Module not found', 404))
  }

  return res.status(200).json({
    success: true,
    topic: module ? module.topic : [],
  })
})

//->  /module/admin/seed
module.exports.seed = catchAsyncErrors(async (req, res, next) => {
  const module = await Module.create(req.body)

  return res.status(200).json({
    success: true,
    message: 'Module created Success',
    data: module,
  })
})

//->  /module/admin/update

module.exports.update = catchAsyncErrors(async (req, res, next) => {
  const newModuleData = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    hidden: req.body.hidden,
  }

  const module = await Module.findByIdAndUpdate(req.query.id, newModuleData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  return res.status(200).json({
    success: true,
    message: 'Module updated Success',
    data: module,
  })
})

// /allDetails
module.exports.getModuleDetails = catchAsyncErrors(async (req, res, next) => {

  console.log("getModuleDetails function is called",req);
  // const moduleId = req.body.id;
  const modules = await Module.find({hidden: false}).select('title description type hidden')
  let allModulesData = []
  for(mod of modules) {
    const moduleId = mod._id;
    const module = await Module.findById(moduleId)
    .populate({
      path: 'topic',
      match: { hidden: false },
      populate: {
        path: 'ctf',
        match: { hidden: false },
        options: {
          sort: {
            sno: 1,
          },
        },
      },
    })
  
    if (!module) {
      return next(new ErrorHandler('Module not found', 404));
    }
  
    let totalQuestions = 0;
    module.topic.forEach((topic) => {
      totalQuestions += topic.ctf.length;
    });
    console.log("user!------------------------------------>",module.title,totalQuestions)
  
    const allResponses = await User.findById(req.body.user._id).select('responses')
    const responsesId = allResponses.responses.get(moduleId)
    const responses = await Responses.findById(responsesId)
    const totalResponses = responses ? responses.responses.length : [];
    let responseBody = {
      moduleTitle: module.title,
      totalQuestions: totalQuestions,
      totalResponses : totalResponses
    }
    allModulesData.push(responseBody)

  }
  
  return res.status(200).json({
    success: true,
    allModulesData
  });
});