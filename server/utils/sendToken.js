const sendToken = (user, token, statusCode, res) => {
  // Options for cookie
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  return res.status(statusCode).cookie("cybervie", token, options).json({
    success: true,
    token,
    data: user,
  });
};

module.exports = sendToken;