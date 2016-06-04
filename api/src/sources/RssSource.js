const FeedParser = require('feedparser');
const request    = require('request');
const moment     = require('moment');


module.exports = container => {
    return {
        load(config) {
            console.log('loading from rss source', config);
            return new Promise((resolve, reject) => {
                const req        = request(config.url);
                const feedparser = new FeedParser();

                req.on('error', err => {
                    reject(err);
                });

                req.on('response', function (res) {
                    if (res.statusCode != 200) {
                        return this.emit('error', new Error('Bad status code'));
                    }

                    this.pipe(feedparser);
                });

                const items = [];

                feedparser.on('error', err => {
                    reject(err);
                });

                feedparser.on('readable', function () {
                    // This is where the action is!
                    const stream = this;
                    const meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
                    let item;

                    while (item = stream.read()) {
                        //console.log(item);
                        const publishedAt = new Date(item.pubDate);

                        console.log(publishedAt);

                        console.log(`[RSS] collected item ${item.title} [${item.guid}]`);

                        items.push({
                            content:    item.title,
                            externalId: item.guid,
                            createdAt:  moment(publishedAt).toISOString(),
                        });
                    }
                });

                feedparser.on('end', () => {
                    resolve(items);
                });
            });
        }
    }
};
