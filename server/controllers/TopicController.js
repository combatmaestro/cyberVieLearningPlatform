const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Module = require('../models/Module')
const Topic = require('../models/Topic')
const ErrorHandler = require('../utils/errorHandler')
const cloudinary = require('cloudinary')

//admin controls

//-> /topic/admin/seed
module.exports.seedTopic = catchAsyncErrors(async (req, res, next) => {
  let module = await Module.findById(req.query.id)

  if (!module) {
    return next(new ErrorHandler('Module not found', 404))
  }

  const topic = await Topic.create(req.body)

  module.topic.push(topic._id)
  await module.save()
  module = await module.populate('topic', 'topicName').execPopulate()

  return res.status(200).json({
    success: true,
    message: 'Topic created Success',
    data: topic,
  })
})

//-> /topic/admin/update
module.exports.update = catchAsyncErrors(async (req, res, next) => {
  const newTopicData = {
    topicName: req.body.topicName,
    hidden: req.body.hidden,
  }

  const topic = await Topic.findByIdAndUpdate(req.query.id, newTopicData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  return res.status(200).json({
    success: true,
    message: 'topic updated Success',
    data: topic,
  })
})

//-> /topic/admin/content

module.exports.addContent = catchAsyncErrors(async (req, res, next) => {
  const topic = await Topic.findById(req.query.id).select('topicName content')

  if (!topic) {
    return next(new ErrorHandler('Topic not found', 404))
  }

  topic.content = req.body.content
  await topic.save()

  return res.status(200).json({
    success: true,
    message: 'topic content updated',
    data: topic,
  })
})

//-> /topic/admin/getcontent

module.exports.getContent = catchAsyncErrors(async (req, res, next) => {
  console.log('get')
  const topic = await Topic.findById(req.query.id).select('topicName content')

  if (!topic) {
    return next(new ErrorHandler('Topic not found', 404))
  }

  return res.status(200).json({
    success: true,
    message: 'topic content',
    data: topic,
  })
})

module.exports.getCtf = catchAsyncErrors(async (req, res, next) => {
  const topic = await Topic.findById(req.query.id)
    .select('ctf')
    .populate({
      path: 'ctf',
      options: {
        sort: {
          sno: 1,
        },
      },
    })

  if (!topic) {
    return next(new ErrorHandler('Topic not found', 404))
  }

  return res.status(200).json({
    success: true,
    message: 'topic ctfs',
    data: topic,
  })
})

module.exports.uploadImage = catchAsyncErrors(async (req, res, next) => {
  if (req.body.image !== '') {
    const result = await cloudinary.v2.uploader.upload_large(req.body.image, {
      folder: 'contentImage',
    })

    return res.status(200).json({
      success: true,
      url: result.secure_url,
    })
  }
})
