const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log("Sending email",options.email)  
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // type: "OAuth2",
        // clientId:
        //   "257899612719-9jsfnkbb5i5kgp6r34754vdlmjcdi6jb.apps.googleusercontent.com",
        // clientSecret: "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",
        // refreshToken: "1//0g5ONv2b7i1amCgYIARAAGBASNwF-L9IrpT3FrnTdQd-uEW0ndlnKEYMTMrILiqpKPe6-wi4EMHbvsTCqQBvP_nfOYaUAEpF60Zc",
        // accessToken: "ya29.a0AXooCguRU1PAtWQ-w6kq3Y3tnNahwftsDnyRyH8zD1-IhNG1y-sBqwLmrSH_Ztzf8KwyfM1pr6U85WMZJXxFMX-5ZgYDjxGHC9OLKQPJciAInjNRQKlWiNCRNw4yhnbKXiwpba4QrPoOUAW-y5AkNiwWRdQx6vhgCAyGaCgYKAR0SARMSFQHGX2Milcwj1-L1JKfmbRwg6d_CNQ0171",
        user:"info@cybervie.com",
        pass:"rtgp rsls upgz zctc"
      },
    });
    // transporter.on("token", (token) => {
    //   console.log("A new access token was generated");
    //   console.log("User: %s", token.user);
    //   console.log("Access Token: %s", token.accessToken);
    //   console.log("Expires: %s", new Date(token.expires));
    // });
    // setup e-mail data with unicode symbols
    let mailOptions = {
      from: "adarshsahu2510@gmail.com", // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      html: options.html, // html body

      // auth: {
      //   user: "adarshsahu2510@gmail.com",
      //   refreshToken:
      //     "1//0g5ONv2b7i1amCgYIARAAGBASNwF-L9IrpT3FrnTdQd-uEW0ndlnKEYMTMrILiqpKPe6-wi4EMHbvsTCqQBvP_nfOYaUAEpF60Zc",
      //   accessToken:
      //     "ya29.a0AXooCguRU1PAtWQ-w6kq3Y3tnNahwftsDnyRyH8zD1-IhNG1y-sBqwLmrSH_Ztzf8KwyfM1pr6U85WMZJXxFMX-5ZgYDjxGHC9OLKQPJciAInjNRQKlWiNCRNw4yhnbKXiwpba4QrPoOUAW-y5AkNiwWRdQx6vhgCAyGaCgYKAR0SARMSFQHGX2Milcwj1-L1JKfmbRwg6d_CNQ0171",
      //   expires: 1494388182480,
      // },
    };

    //  transporter.sendMail(message);

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
