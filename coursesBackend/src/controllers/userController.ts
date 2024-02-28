import { Request, Response } from "express"
import { getUsersAction, getUserByIdAction, updateUserAction, updateUserAvailableCoursesAction, addUserAction } from "../services/db/actions/userActions"

export const getUsersHandler = async (req: Request, res: Response) => {
    try {
        const items = await getUsersAction()

        if (!items) {
            return res.status(404)
        }

        return res.json(items)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const user = await getUserByIdAction(id)

        if (!user) {
            return res.status(404)
        }

        return res.json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const patchUserHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const item = await updateUserAction(id, req.body)

        if (!item) {
            return res.status(404)
        }

        return res.json(item)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const patchUserCourseHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'invalid id' })
        }

        const item = await updateUserAvailableCoursesAction(id, req.body.courseId)

        return res.json(item)
    } catch (err) {
        res.status(500).json(err)
    }
}