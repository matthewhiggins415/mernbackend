const express = require('express');
const router = express.Router();
const passport = require('passport');

const requireToken = passport.authenticate('bearer', { session: false });

const { Section } = require('../models/courseModel');
const { Course } = require('../models/courseModel');

// create a new section 
router.post('/course/:courseId/section', requireToken, async (req, res, next) => {
  let courseID = req.params.courseId;
  let course = await Course.findById(courseID).populate("sections")
  let newSection = await Section.create({ course_id: courseID });
  course.sections.push(newSection)
  let updatedCourse = await course.save()
  res.json({ updatedCourse });
})

// get all sections
router.get('/course/:id/sections', requireToken, async (req, res, next) => {
  let courseID = req.params.id;
  let sections = await Section.find({ course_id: courseID });
  res.json({ sections })
  //complete
})

// get a single section
router.get('/section/:id', requireToken, async (req, res, next) => {
  let sectionID = req.params.id;
  const section = await Section.findById(sectionID)
  res.json({ section })
  //complete
})

// edit a section

// delete a section
router.delete('/course/:courseId/section/:sectionId', requireToken, async (req, res, next) => {
    let sectionID = req.params.sectionId;
    let courseID = req.params.courseId;
    const section = await Section.findByIdAndRemove(sectionID);
    let sections = await Section.find({ course_id: courseID })
    res.json({ sections });
    // complete
})

module.exports = router