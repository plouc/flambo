const BASE_URL = 'http://localhost:3000/api/v1';


const Api = {
    getTopics() {
        return fetch(`${BASE_URL}/topics`, {
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.error(err);
            })
        ;
    },

    getTopic(id) {
        return Promise.all([
            fetch(`${BASE_URL}/topics/${id}`)
                .then(res => res.json())
            ,
            fetch(`${BASE_URL}/topics/${id}/news_items`)
                .then(res => res.json())
        ])
            .then(([topic, newsItems]) => {
                return { topic, newsItems };
            })
            .catch(err => {
                console.error(err);
            })
        ;
    },

    createTopic(topic) {
        const result = {
            hasError: false,
            errors:   [],
            topic:    null,
        };

        return fetch(`${BASE_URL}/topics`, {
            method:  'POST',
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(topic),
        })
            .then(res => {
                result.hasError = res.status === 400;
                return res.json();
            })
            .then(topic => {
                if (topic.errors) {
                    result.errors = topic.errors;
                } else {
                    result.topic = topic;
                }

                return result;
            })
            .catch(err => {
                console.error(err);
            })
        ;

    },

    getSources() {
        return fetch(`${BASE_URL}/sources`, {
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.error(err);
            })
        ;
    },

    getSource(id) {
        return fetch(`${BASE_URL}/sources/${id}`)
            .then(res => res.json())
            .catch(err => {
                console.error(err);
            })
        ;
    },

    getSourceWithNewsItems(id) {
        return Promise.all([
            fetch(`${BASE_URL}/sources/${id}`)
                .then(res => res.json())
            ,
            fetch(`${BASE_URL}/sources/${id}/news_items`)
                .then(res => res.json())
        ])
            .then(([source, newsItems]) => {
                return { source, newsItems };
            })
            .catch(err => {
                console.error(err);
            })
        ;
    },

    updateSource(id, source) {
        const result = {
            hasError: false,
            errors:   [],
            source:   null,
        };

        return fetch(`${BASE_URL}/sources/${source.id}`, {
            method:  'PUT',
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(source)
        })
            .then(res => {
                result.hasError = res.status === 400;
                return res.json();
            })
            .then(source => {
                if (source.errors) {
                    result.errors = source.errors;
                } else {
                    result.source = source;
                }

                return result;
            })
            .catch(err => {
                console.error(err);
            })
        ;

    }
};

export default Api;