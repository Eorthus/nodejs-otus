import { ObjectId } from "mongoose"
import { userSchema, usersDb } from "../schemas"

export const getUsersAction = async () => {
    const data = await usersDb.find()
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

export const getUserByIdAction = async (id: String) => {
    const data = await usersDb.findById(id)

    const item = JSON.parse(JSON.stringify(data))

    if (!item.rating.length) {
        item.rating = 0
        return item
    }

    item.rating = item.rating.reduce((acc: number, number: number) => acc + number, 0) / item.rating.length
    return item
}

export const updateUserAction = async (id: String, item: typeof userSchema) => {
    const data = await usersDb.findByIdAndUpdate(id, item, { new: true })
    return data
}

export const updateUserRatingAction = async (id: string, item: number) => {
    const data = await usersDb.findByIdAndUpdate(id, { $push: { 'rating': item } }, { new: true })
    return data
}

export const updateUserOwnCoursesAction = async (id: string, item: ObjectId) => {
    const user = await usersDb.findById(id)

    //@ts-ignore
    if (user?.ownCourses?.indexOf(item) !== -1) {
        const data = await usersDb.findByIdAndUpdate(id, { $pull: { 'ownCourses': item } }, { new: true })
        return data
    }
    const data = await usersDb.findByIdAndUpdate(id, { $push: { 'ownCourses': item } }, { new: true })
    return data
}

export const updateUserAvailableCoursesAction = async (id: string, item: ObjectId) => {
    const user = await usersDb.findById(id)

    //@ts-ignore

    if (user?.availableCourses?.indexOf(item) !== -1) {
        const data = await usersDb.findByIdAndUpdate(id, { $pull: { 'availableCourses': item } }, { new: true })
        return data
    }

    const data = await usersDb.findByIdAndUpdate(id, { $push: { 'availableCourses': item } }, { new: true })
    return data
}


export const addUserAction = async (item: typeof userSchema) => {
    const data = await usersDb.create(item)
    return data
}
