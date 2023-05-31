import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}

export const generatedUserId = async () => {
  const currentUserId =
    (await findLastUserId()) || (0).toString().padStart(5, '0')

    //increment id by 1
    const newIncrementId=(parseInt(currentUserId)+1).toString().padStart(5,"0")

  return newIncrementId
}
