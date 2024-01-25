const UserModel = require("../models/UserModel.js");
const { comparePassword, hashPassword } = require("../helpers/authHelpers.js");
const jwt = require('jsonwebtoken');

module.exports.registerController = async (req, res) => {
  try {
    const { userType, name, email, password } = req.body;
    if (!(userType && email && name && password)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      userType,
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      'shhhhhhhh',
      { expiresIn: '7d', }
    );

    // Send the token in the response
    res.status(201).send({ success: true, user: {
      userType: user.userType,
      _id: user._id,
      name: user.name,
      email: user.email,
      resumes: user.resumes
    }, token, ok: true });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};



// Login authentication
module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!(email && password)) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await jwt.sign({ _id: user._id }, 'shhhhhhhh', {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        userType: user.userType,
        _id: user._id,
        name: user.name,
        email: user.email,
        resumes: user.resumes
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// upload resume


module.exports.uploadResume = async (req, res) => {
  try {
    const user = await UserModel.findOne({_id: req.user.id ?? req.user._id });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newResume = {
      fileName: req.file.originalname,
      filePath: req.file.path,
    }; 

    user.resumes.push(newResume);
    await user.save();

    return res.status(200).json({ message: 'Resume uploaded successfully.' });
  } catch (error) {
    console.error('Error uploading resume:', error);
    return res.status(500).json({ error: 'Error uploading resume.' });
  }
}

exports.getResumes = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resumes = user.resumes; // Assuming resumes is an array field in your user model
    res.status(200).json({ resumes });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Error fetching resumes.' });
  }
};