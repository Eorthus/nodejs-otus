import { Request, Response } from "express"
import { addCourseAction, getCoursesAction, getCourseByIdAction, deleteCourseAction, updateCourseAction, updateCourseRatingAction, updateCourseCommentsAction } from "../services/db/actions/courseActions"

export const getCoursesHandler = async (req: Request, res: Response) => {
    try {
        const items = await getCoursesAction()

        if (!items) {
            return res.status(404)
        }

        return res.json(items)
    } catch (err) {
        res.status(500).json(err)
    }
}


export const getCourseByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const item = await getCourseByIdAction(id)

        if (!item) {
            return res.status(404)
        }

        return res.json(item)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const patchCourseHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const item = await updateCourseAction(id, req.body)

        return res.json(item)
    } catch (err) {
        res.status(500).json(err)
    }
}


export const patchCourseRatingHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        } 
        const item = await updateCourseRatingAction(id, req.body.rating)
        return res.json(item)

    } catch (err) {
        res.status(500).json(err)
    }
}


export const patchCourseCommentsHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        } 
        const item = await updateCourseCommentsAction(id, req.body)
        return res.json(item)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const postCourseHandler = async (req: Request, res: Response) => {
    try {
        const data = await addCourseAction(req.body.form, req.body.userId)
        return res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteCourseHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const item = await deleteCourseAction(id)

        if (!item) {
            return res.status(404)
        }

        return res.json(item)
    } catch (err) {
        res.status(500).json(err)
    }

}