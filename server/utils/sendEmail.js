const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        clientId:
          "229588821244-jc51apbo25fvtkpddp45o1d430u3k5dv.apps.googleusercontent.com",
        clientSecret: "D44cH5YCDQaPv63kwmYzph2s",
      },
    });
    transporter.on("token", (token) => {
      console.log("A new access token was generated");
      console.log("User: %s", token.user);
      console.log("Access Token: %s", token.accessToken);
      console.log("Expires: %s", new Date(token.expires));
    });
    // setup e-mail data with unicode symbols
    let mailOptions = {
      from: "learn@cybervie.com", // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      html: options.html, // html body

      auth: {
        user: "learn@cybervie.com",
        refreshToken:
          "1//04aafO51Zx_mRCgYIARAAGAQSNwF-L9IrYnuk-Fq1bhLw_KgFKZFoXkL6HNWibntxPRayC884Xr17XyJBQn2PGT2oFmjN4TninCs",
        accessToken:
          "ya29.a0ARrdaM-2tHqdcfwvJOJ-EFsIezLtDEupS-9gR3EaD3CXYza0Lz6ubULqnbF_GWBsX2IFgLNwsm2gkqLcTNCx9C7rVV-nV9otb_lU-YTa79tpkRg6Wp0WCYeDYFMJ1Q_xeB60jcysfK3nRGbKU8ZtYVQCFpij",
        expires: 1494388182480,
      },
    };

    //  transport.sendMail(message);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error is-> " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("mail error", error);
  }
};

module.exports = sendEmail;
