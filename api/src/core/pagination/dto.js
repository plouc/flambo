module.exports = ({ page, limit }, _items) => {
    let items    = _items
    let nextPage = null

    if (items.length > limit) {
        items    = _items.slice(0, limit)
        nextPage = page + 1
    }

    return {
        items,
        previous_page: page > 1 ? page - 1 : null,
        page,
        next_page:     nextPage,
    }
}