import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
    title: String,
    name: String,
})

export const difficultySchema = new mongoose.Schema({
    title: String,
    name: String,
})

export const rolesSchema = new mongoose.Schema({
    title: String,
    name: String,
})

export const userSchema = new mongoose.Schema({
    login: {type:String, required:true},
    password: {type:String, required:true},
    refreshToken: String,
    role: [rolesSchema],
    rating: [Number],
    ownCourses: [ObjectId],
    availableCourses: [ObjectId]
})

export const commentSchema = new mongoose.Schema({
    author: String,
    date: Date,
    description: String,
})

export const lessonSchema = new mongoose.Schema({
    title: String,
    description: String,
    video: String,
    attached: [],
})

export const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    rating: [Number],
    category: categorySchema,
    difficulty: difficultySchema,
    lessons: [lessonSchema],
    comments: [commentSchema]
})

export const coursesDb = mongoose.model('courses', courseSchema)
export const usersDb = mongoose.model('users', userSchema)