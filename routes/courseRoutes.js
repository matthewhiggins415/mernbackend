const express = require('express')
const router = express.Router()
const passport = require('passport')

const requireToken = passport.authenticate('bearer', { session: false })

const { Course } = require('../models/courseModel')

// create a new course 
router.post('/course', requireToken, async (req, res, next) => {
  let newCourse = await Course.create({});
  let courses = await Course.find({})
  res.json({ courses });
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

// edit a single course 
router.put('/course/:id', requireToken, async (req, res, next) => {
  let id = req.params.id;
  let data = req.body.course
  let course = await Course.findById(id)

  if (data.title) {
    course.title = data.title;
  }

  if (data.isPublished) {
    course.isPublished = data.isPublished
  } else {
    course.isPublished = false
  }

  let updatedCourse = await course.save();

  res.json({ updatedCourse })
})

// delete a course
router.delete('/course/:id', requireToken, async(req, res, next) => {
  let id = req.params.id;
  
  try {
    const course = await Course.findByIdAndDelete(id);
    res.status(201).json({ message: "course removed"});
  } catch(e) {
    res.status({ message: "unable to delete course."})
  }
})

module.exports = router