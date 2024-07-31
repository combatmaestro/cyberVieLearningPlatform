const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Module = require('../models/Module')
const Topic = require('../models/Topic')
const SubTopic = require('../models/subTopics')
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


//-> /topic/admin/gettopics
module.exports.getTopics = catchAsyncErrors(async (req, res, next) => {
  const { moduleId } = req.query;

  
  const module = await Module.findById(moduleId).populate({
    path: 'topic',
    select: '_id topicName' // Only select _id and topicName fields
  });
  if (!module) {
    return next(new ErrorHandler('Module not found', 404));
  }

  return res.status(200).json({
    success: true,
    message: 'Topics fetched successfully',
    data: module.topic,
  });
});

exports.addSubTopic = catchAsyncErrors(async (req, res, next) => {
  const { topicId, subtopics } = req.body;

  try {
    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found',
      });
    }
    const subtopicsWithTopicName = subtopics.map(subtopic => ({
      ...subtopic,
      topicName: topic.topicName,
    }));
    // Create subtopics and save them to the database
    const createdSubtopics = await SubTopic.insertMany(subtopicsWithTopicName);

    // Get the IDs of the created subtopics
    const subtopicIds = createdSubtopics.map(subtopic => subtopic._id);

    // Append the subtopic IDs to the topic's subTopics array
    for(let i = 0; i < subtopicIds.length; i++){
      topic.subTopics.push(subtopicIds[i]);
    }
    // topic.subTopics = topic.subTopics.concat(subtopicIds);
    await topic.save();

    res.status(200).json({
      success: true,
      message: 'SubTopics added successfully',
      data: createdSubtopics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.getAllSubTopics = catchAsyncErrors(async (req, res, next) => {
  try {
    const subtopics = await SubTopic.find({}, 'title topicName');

    res.status(200).json({
      success: true,
      data: subtopics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
