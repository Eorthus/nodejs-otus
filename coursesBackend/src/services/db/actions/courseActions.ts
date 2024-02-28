import { coursesDb, courseSchema, commentSchema } from "../schemas"
import { updateUserOwnCoursesAction } from "./userActions"

export const addCourseAction = async (item: typeof courseSchema, userId: string) => {
    const data = await coursesDb.create(item)
    //@ts-ignore
    const user = await updateUserOwnCoursesAction(userId, data._id)
    return {data, user}
}

export const getCoursesAction = async () => {
    const data = await coursesDb.find()

    const items = JSON.parse(JSON.stringify(data))

    items.forEach((el: { rating: number[] | number }) => {
        if (Array.isArray(el.rating) && !el.rating.length) {
            el.rating = 0
        }

        if (Array.isArray(el.rating) && el.rating.length) {
            el.rating = el.rating.reduce((acc: number, number: number) => acc + number, 0) / el.rating.length
        }
    })

    return items
}

export const getCourseByIdAction = async (id: string) => {
    const data = await coursesDb.findById(id)

    const item = JSON.parse(JSON.stringify(data))

    if (!item.rating.length) {
        item.rating = 0
        return item
    }

    item.rating = item.rating.reduce((acc: number, number: number) => acc + number, 0) / item.rating.length
    return item
}

export const deleteCourseAction = async (id: string) => {
    const data = await coursesDb.findByIdAndDelete(id)
    return data
}

export const updateCourseAction = async (id: string, item: typeof courseSchema) => {
    const data = await coursesDb.findByIdAndUpdate(id, item, { new: true })
    return data
}

export const updateCourseRatingAction = async (id: string, item: number) => {
    const data = await coursesDb.findByIdAndUpdate(id, { $push: { 'rating': item } }, { new: true })
    return data
}

export const updateCourseCommentsAction = async (id: string, item: typeof commentSchema) => {
    const data = await coursesDb.findByIdAndUpdate(id, { $push: { 'comments': item } }, { new: true })
    return data
}

