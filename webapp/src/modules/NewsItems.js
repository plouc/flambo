import React, { Component } from 'react';


class NewsItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsItems: []
        };
    }

    componentWillMount() {
        fetch('http://localhost:3000/api/v1/news_items')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    newsItems: json
                });
            })
            .catch(err => {
                console.error(err);
            })
        ;
    }

    render() {
        const { newsItems } = this.state;

        return (
            <div>
                <h1>News Items</h1>
                <ul>
                    {newsItems.map(newsItem => (
                        <li key={newsItem.id}>{newsItem.content}</li>
                    ))}
                </ul>
            </div>
        );
    }
}


export default NewsItems;
