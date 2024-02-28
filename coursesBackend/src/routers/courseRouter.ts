import { Router } from "express";
import { getCourseByIdHandler, getCoursesHandler, postCourseHandler, patchCourseHandler, deleteCourseHandler, patchCourseRatingHandler, patchCourseCommentsHandler } from "../controllers/courseController";

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/

const courseRouter = Router()

courseRouter.get('/courses', getCoursesHandler)
courseRouter.get('/courses/:id', getCourseByIdHandler)
courseRouter.post('/courses', postCourseHandler)
courseRouter.patch('/courses/:id', patchCourseHandler)
courseRouter.patch('/courses/:id/rating', patchCourseRatingHandler)
courseRouter.patch('/courses/:id/comments', patchCourseCommentsHandler)
courseRouter.delete('/courses/:id', deleteCourseHandler)

export default courseRouter