const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Lesson
const lessonSchema = new Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  section_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section"
  },
  title: {
    type: String,
    default: 'lesson title',
    required: false
  },
  video: {
    type: String, 
    default: 'no video',
    required: false, 
  },
  goal: {
    type: String,
    default: 'lesson goal',
    required: false
  },
  slack: {
    type: String,
    default: 'http://slack-link.com',
    required: false, 
  },
  repo: {
    type: String,
    default: 'http://repo-link.com',
    required: false, 
  },
  resources: [{
    link: '',
    description: ''
  }]
}, {
  timestamps: true, 
})

const Lesson = mongoose.model('Lesson', lessonSchema)

// Section
const sectionSchema = new Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  title: {
    type: String,
    default: 'section title',
    required: false
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'
  }]
}, {
  timestamps: true, 
})

const Section = mongoose.model('Section', sectionSchema)

// Course
const courseSchema = new Schema({
  title: {
    type: String,
    default: 'title',
    required: false
  },
  isPublished: {
    type: Boolean, 
    default: false
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Section'
  }]
}, {
  timestamps: true, 
})

const Course = mongoose.model('Course', courseSchema)

module.exports = { Course, Section, Lesson }
  
