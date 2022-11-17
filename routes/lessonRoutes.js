const express = require('express');
const router = express.Router();
const passport = require('passport');

const requireToken = passport.authenticate('bearer', { session: false })

const { Course } = require('../models/courseModel')
const { Section } = require('../models/courseModel')
const { Lesson } = require('../models/courseModel')

// create a new lesson 
router.post('/course/:courseId/section/:sectionId/lesson', requireToken, async (req, res, next) => {
  let sectionID = req.params.sectionId;
  let courseID = req.params.courseId
  let section = await Section.findById(sectionID).populate('lessons')
  let newLesson = await Lesson.create({
    course_id: courseID, 
    section_id: sectionID
  });
  section.lessons.push(newLesson);
  let newSection = await section.save();
  
  res.json({ newSection });
  //complete
})

// get a single lesson
router.get('/lesson/:id', requireToken, async (req, res, next) => {
  let lessonID = req.params.id;
  let lesson = await Lesson.findById(lessonID)
  res.json({ lesson })
  //complete
})

// get lessons of a section
router.get('/section/:id/lessons', requireToken, async (req, res, next) => {
  let sectionID = req.params.id;
  let lessons = await Lesson.find({ section_id: sectionID })
  res.json({ lessons })
  //complete
})

// edit a lesson

// delete a lesson
router.delete('/section/:sectionId/lesson/:lessonId', requireToken, async (req, res, next) => {
  let lessonID = req.params.lessonId;
  let sectionID = req.params.sectionId;
  let lesson = await Lesson.findByIdAndDelete(lessonID)
  let lessons = await Lesson.find({ section_id: sectionID })
  res.json({ lessons })
})

module.exports = router