import React, { Component } from 'react';
import TopicSources         from '../components/topic/TopicSources';
import Api                  from '../Api';


class Topic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topic:     null,
            newsItems: [],
            loading:   true
        };
    }

    componentWillMount() {
        const { id } = this.props.params;

        Api.getTopic(id)
            .then(({ topic, newsItems }) => {
                this.setState({
                    topic,
                    newsItems: newsItems.docs,
                    loading:   false,
                });
            })
        ;
    }

    render() {
        const { topic, newsItems, loading } = this.state;

        if (loading) {
            return (
                <p>loading…</p>
            );
        }

        return (
            <div>
                <h1>{topic.name}</h1>
                <TopicSources sources={topic.sources}/>
                {newsItems.map(newsItem => (
                    <div key={newsItem.id} style={{ borderTop: '1px dotted #000' }}>
                        <p>{newsItem.content}</p>
                    </div>
                ))}
            </div>
        );
    }
}


export default Topic;
