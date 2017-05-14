exports.feedItem = item => {
    if (!item) return item

    return item
}

exports.feed = feed => {
    return {
        items: feed.docs.map(exports.feedItem)
    }
}
