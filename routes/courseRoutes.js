const express = require('express')
const router = express.Router()
const passport = require('passport')

const requireToken = passport.authenticate('bearer', { session: false })

const { Course } = require('../models/courseModel')

// create a new course 
router.post('/course', requireToken, async (req, res, next) => {
  let newCourse = await Course.create({});
  res.json({ newCourse });
  //complete
})

// publish a course 
router.put('/course/:id/publish', requireToken, async (req, res, next) => {
  let courseID = req.params.id;
  let course = Course.findById(courseID);
  let { isPublished } = course;
  course.isPublished = !isPublished;
  let updatedCourse = await course.save();
  res.json({ updatedCourse });
})

// get all courses
router.get('/courses', requireToken, async (req, res, next) => {
  const courses = await Course.find().populate({path:"sections", model:"Section", populate: {path:'lessons', model:"Lesson"}});
  res.json({ courses });
  //complete
})

// get a single course 
router.get('/courses/:id', requireToken, async (req, res, next) => {
  let id = req.params.id;
  const course = await Course.findById(id).populate({path:"sections", model:"Section", populate: {path:'lessons', model:"Lesson"}});
  res.json({ course });
  //complete
})

module.exports = router