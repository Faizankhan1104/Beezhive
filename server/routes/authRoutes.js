const express = require("express");
const { registerController, loginController, uploadResume, getResumes } = require('../controllers/authController');
const { verifyToken, requireSignIn } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/multer.middleware")
const {createJob, getJobs, getJobDetails} = require('../controllers/jobFormController');
const File = require('../models/file.model');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel")
const multer = require("multer");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/upload", verifyToken, upload, uploadResume);
// router.post('/postjob', createJob);


// Protected routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/", (req, res) => {

  if (req.cookies.jwt) {
    const verify = jwt.verify(req.cookies.jwt, "helloandwelcometotechywebdevtutorialonauthhelloandwelcometotechywebdevtutorialonauth")
    res.render("home", { name: verify.name })
  }

  else {
    res.render("login")
  }

})
// router.get('/getjobs', getJobs);


router.get("/register", (req, res) => {
  res.render("register")
})

router.get('/protected-route', verifyToken, (req, res) => {
  
  res.json({ message: 'This is a protected route', user: req.user });
});
router.get('/getjob/:jobId', getJobDetails);
router.get('/resumes', verifyToken, getResumes);




module.exports = router;

