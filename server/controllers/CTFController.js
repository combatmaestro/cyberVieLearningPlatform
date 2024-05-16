const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Topic = require('../models/Topic')
const Ctf = require('../models/Ctf')
const ErrorHandler = require('../utils/errorHandler')
const User = require('../models/User')
const Responses = require('../models/Responses')

//-> ctf/admin/seed
module.exports.seed = catchAsyncErrors(async (req, res, next) => {
  let topic = await Topic.findById(req.query.id).select('ctf')

  if (!topic) {
    return next(new ErrorHandler('Topic not found', 404))
  }

  const ctf = await Ctf.create(req.body)

  topic.ctf.push(ctf._id)
  await topic.save()

  return res.status(200).json({
    success: true,
    message: 'Ctf created Success',
    data: ctf,
  })
})

//-> ctf/admin/update
module.exports.update = catchAsyncErrors(async (req, res, next) => {
  const newCtfData = {
    question: req.body.question,
    answer: req.body.answer,
    hidden: req.body.hidden,
    hint: req.body.hint,
    sno: req.body.sno,
  }

  const ctf = await Ctf.findByIdAndUpdate(req.query.id, newCtfData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  return res.status(200).json({
    success: true,
    message: 'Ctf updated Success',
    data: ctf,
  })
})

//-> /ctf/submit
module.exports.submit = catchAsyncErrors(async (req, res, next) => {
  const { moduleId, questionId } = req.body

  const user = await User.findById(req.user._id)
  const responsesId = user.responses.get(moduleId)

  if (responsesId) {
    const responses = await Responses.findById(responsesId)

    if (responses.responses.indexOf(questionId) > -1)
      return next(new ErrorHandler('Already Submitted', 400))

    responses.responses.push(questionId)
    await responses.save()
  } else {
    const responses = await Responses.create({
      responses: new Array(questionId),
    })
    user.responses.set(moduleId, responses._id)
    await user.save()
  }

  user.marks = user.marks + 1
  await user.save()

  return res.status(200).json({
    success: true,
  })
})
