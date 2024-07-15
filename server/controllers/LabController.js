const fetch = require("node-fetch");
const qs = require("qs");
const Lab = require("../models/Labs");
const User = require("../models/User");

module.exports.loginUser = async () => {
  const url = "https://cloudlabs.nuvepro.com/v1/users/login";

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const requestBody = qs.stringify({
    username: "cybervie-apiadmin@nuvelabs.com",
    password: "Masters#21@$",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response data3:", responseData);

    // Create a new lab entry with the response data
    const labDetails = {
      labName: "Linux Playground",
      companyId: "3292",
      planId: "5942",
      teamId: "5943",
    };

    //updating the existing lab entry
    const updatedLab = await Lab.findOneAndUpdate(
      labDetails,
      { responseNuvePro: JSON.stringify(responseData) },
      { new: true, useFindAndModify: false }
    );

    if (updatedLab) {
      console.log("Lab entry updated in MongoDB:", updatedLab);
      const data = {
        teamId: updatedLab.teamId,
        companyId: updatedLab.companyId,
        credentials: responseData,
      };
      return data;
    } else {
      console.log("Lab entry not found with the provided details.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

function generatePassword() {
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  // Ensuring the password meets the criteria
  const allChars = upperCaseChars + lowerCaseChars + numberChars + specialChars;

  // Function to pick a random character from a string
  const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];

  let password = "";
  password += getRandomChar(upperCaseChars);
  password += getRandomChar(lowerCaseChars);
  password += getRandomChar(numberChars);
  password += getRandomChar(specialChars);

  // Fill the rest of the password length with random characters
  for (let i = 4; i < 12; i++) {
    password += getRandomChar(allChars);
  }

  // Shuffle the password to ensure randomness
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
}

const userDataUpdates = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const [firstName, lastName] = user.name.split(" ");
    const username = `${firstName}${lastName}cybervie`;
    const password = generatePassword();
    // const hashedPassword = await bcrypt.hash(password, 10);

    user.firstName = firstName;
    user.lastName = lastName;
    user.userName = username;
    user.password = password;
    user.nuveProStatus = "onhold";
    user.subscriptionId = "000";
    user.labCreated = false;
    await user.save();

    console.log(`User updated: ${user}`);
    console.log(`Generated password: ${password}`);

    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const addUserToTeams = async (user, MasterCredentials) => {
  const userLabObject = {
    userName: user.email,
    companyId: parseInt(MasterCredentials.companyId),
    teamIds: parseInt(MasterCredentials.teamId),
  };

  const url = "https://cloudlabs.nuvepro.com/v1/users/addUserIntoTeams";
  const token = MasterCredentials.credentials["token"];
  const cookieValue =
    MasterCredentials.credentials["session_name"] +
    "=" +
    MasterCredentials.credentials["sessid"];
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-CSRF-Token": token,
    Cookie: cookieValue,
  };
  const urlEncodedData = new URLSearchParams(userLabObject).toString();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: urlEncodedData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userEmail = user.email;
    const existingUserData = await User.findOne({ email: userEmail });

    const responseData = await response.json();
    existingUserData.nuveProStatus = responseData.ResponseStatus;
    await existingUserData.save();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

module.exports.createNewLabForUser = async (req, res) => {
  const { email } = req.query; // Get the email from the query parameter

  try {
    var user = await User.findOne({ email });
    if (!user.nuveProStatus || !user.nuveProStatus === "SUCCESS") {
      user = await userDataUpdates(email);
    }
    const MasterCredential = await this.loginUser(); //getting the updated session data
    console.log(`MasterCredential : ${MasterCredential}`);
    const userLabObject = {
      userName: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      companyId: parseInt(MasterCredential.companyId),
      teamId: parseInt(MasterCredential.teamId),
    };

    const url = "https://cloudlabs.nuvepro.com/v1/users";
    const token = MasterCredential.credentials["token"];
    const cookieValue =
      MasterCredential.credentials["session_name"] +
      "=" +
      MasterCredential.credentials["sessid"];
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRF-Token": token,
      Cookie: cookieValue,
    };
    const urlEncodedData = new URLSearchParams(userLabObject).toString();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: urlEncodedData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response data2:", responseData); //email already exists message
      const resp = await addUserToTeams(user, MasterCredential, responseData);
      console.log(resp);
      if (user.subscriptionId === "000") {
        const createSubscriptionResponse = await createSubscription(
          user,
          MasterCredential
        );
        console.log(createSubscriptionResponse);
      }
      getSubscription(user, MasterCredential,"Create")
        .then(async (responseData) => {
          console.log("Response data1:", responseData);

          // labCreated status check
          if (
            (responseData.action === "Stop" &&
              responseData.status === "Complete") ||
            (responseData.action === "Create" &&
              responseData.status === "Complete")
          ) {
            var latestUserData = await User.findOne({ email });
            latestUserData.labCreated = true;
            await latestUserData.save();
            return res.status(200).json({
              success: true,
              labCreated: true,
              data: latestUserData,
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    // res.status(500).json({ success: false, message: error.message });
  }
};

const createSubscription = async (user, MasterCredentials) => {
  const userLabObject = {
    userName: user.email,
    planId: "5942",
    companyId: parseInt(MasterCredentials.companyId),
    teamId: parseInt(MasterCredentials.teamId),
  };

  const url = "https://cloudlabs.nuvepro.com/v1/subscriptions";
  const token = MasterCredentials.credentials["token"];
  const cookieValue =
    MasterCredentials.credentials["session_name"] +
    "=" +
    MasterCredentials.credentials["sessid"];
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-CSRF-Token": token,
    Cookie: cookieValue,
  };

  const urlEncodedData = new URLSearchParams(userLabObject).toString();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: urlEncodedData,
    });
    const responseData = await response.json();
    const userEmail = user.email;
    const existingUserData = await User.findOne({ email: userEmail });
    if (existingUserData) {
      existingUserData.subscriptionId = responseData.subscriptionId;
      await existingUserData.save();
    }
    return responseData;

    if (!responseData.ok) {
      throw new Error(`HTTP error! status: ${responseData.status}`);
    }
  } catch (error) {}
};

const getSubscription = async (user, MasterCredentials,action) => {
  const url = `https://cloudlabs.nuvepro.com/v1/subscriptions/${user.subscriptionId}`;

  const token = MasterCredentials.credentials["token"];
  const cookieValue =
    MasterCredentials.credentials["session_name"] +
    "=" +
    MasterCredentials.credentials["sessid"];
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-CSRF-Token": token,
    Cookie: cookieValue,
  };

  async function fetchData() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const responseData = await response.json();

      if (responseData.status === "Complete") {
        const userEmail = user.email;
        const existingUserData = await User.findOne({ email: userEmail });
        existingUserData.labCreated = true;
        await existingUserData.save();
        return responseData;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 15000)); // Wait for 15 seconds before retrying
        return fetchData(); // Retry fetching data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  return fetchData();
};

module.exports.startSubscription = async (req, res) => {
  const { email } = req.query; // Get the email from the query parameter
  const user = await User.findOne({ email });
  const url = `https://cloudlabs.nuvepro.com/v1/subscriptions/launch`;
  let token = "";
  let cookieValue = "";

  if (user.labCreated) {
    const MasterCredentials = await this.loginUser();

    token = MasterCredentials.credentials["token"];
    cookieValue =
      MasterCredentials.credentials["session_name"] +
      "=" +
      MasterCredentials.credentials["sessid"];

    const checkSubscription = async () => {
      return await getSubscription(user, MasterCredentials, "Start");
    };

    let response = await checkSubscription();

    // Retry mechanism if userAccess is undefined
    for (let attempts = 0; attempts < 3; attempts++) {
      console.log("Response data:", response);

      if (
        (response.status === "Complete" && response.action === "Stop") ||
        (response.status === "Complete" && response.action === "Delete")
      ) {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRF-Token": token,
          Cookie: cookieValue,
        };
        const objBody = {
          subscriptionId: user.subscriptionId,
        };
        const urlEncodedData = new URLSearchParams(objBody).toString();

        const fetchResponse = await fetch(url, {
          method: "POST",
          headers: headers,
          body: urlEncodedData,
        });
        const responseData = await fetchResponse.json();

        if (responseData.userAccess === undefined) {
          console.log("userAccess is undefined, checking subscription again...");
          response = await checkSubscription();
          continue; // Retry the loop
        }

        const objData = {};
        const stats = responseData.stats;

        if (responseData.userAccess && typeof responseData.userAccess === 'string') {
          const dataArray = JSON.parse(responseData.userAccess);
          dataArray.forEach((item) => {
            if (item.description === "Web desktop.") {
              objData.url = item.value;
            }
          });

          objData.stats = stats;

          return res.status(200).json({
            success: true,
            labData: objData,
          });
        } else {
          console.error('responseData.userAccess is not a valid JSON string or is undefined');
        }
      } else {
        const stats = response.stats;
        const dataArray = JSON.parse(response.userAccess);
        const objData = {};
        dataArray.forEach((item) => {
          if (item.description === "Web desktop.") {
            objData.url = item.value;
          }
        });

        objData.stats = stats;

        return res.status(200).json({
          success: true,
          labData: objData,
        });
      }
    }

    return res.status(500).json({ success: false, message: 'User access could not be determined after multiple attempts.' });
  } else {
    return res.status(400).json({ success: false, message: 'Lab not created for the user.' });
  }
};



module.exports.stopLab = async (req, res) => {
  const { email } = req.query; // Get the email from the query parameter
  var user = await User.findOne({ email });
  const url = `https://cloudlabs.nuvepro.com/v1/subscriptions/performAction`;
  var token = "";
  var cookieValue = "";
  if (user.labCreated) {
    const MasterCredentials = await this.loginUser();

    token = MasterCredentials.credentials["token"];
    cookieValue =
      MasterCredentials.credentials["session_name"] +
      "=" +
      MasterCredentials.credentials["sessid"];
      getSubscription(user, MasterCredentials,"Stop").then(async (response) => {
      console.log("Response data1:", response);

      if((response.action === "Start" && response.status === "Complete") || (response.action === "Create" && response.status === "Complete")) { 
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRF-Token": token,
          Cookie: cookieValue,
        };
        const objBody = {
          subscriptionId: user.subscriptionId,
          actionName:"Stop"
        };
        const urlEncodedData = new URLSearchParams(objBody).toString();
          const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: urlEncodedData,
          });
          const responseData = await response.json();
          const stats = responseData;
          return res.status(200).json({
            success: true,
            labData: stats,
          });
      }
      
    })
  }
}
