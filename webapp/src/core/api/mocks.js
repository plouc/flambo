import _ from 'lodash'

export const autoIncrement = collection => collection.map((item, i) => ({ id: i, ...item }))

export const paginate = (collection, perPage = 10, page = 1) => {
    const start = (page - 1) * perPage

    const items       = collection.slice(start, start + perPage)
    const hasNextPage = !items.map(({ id }) => id).includes(_.last(collection).id)

    return { items, hasNextPage }
}
