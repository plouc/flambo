'use strict'

import React, { PropTypes } from 'react'
import TopicPicture         from './TopicPicture'
import TopicSources         from './TopicSources'


const TopicSubHeader = ({ topic, loading }) => {
    if (loading) {
        return <section className="section sub-header" />
    }

    return (
        <section className="section sub-header sub-header--topic">
            <TopicPicture className="topic-picture--large topic-picture--sub-head" topic={topic} />
            <div>{topic.description}</div>
            <TopicSources sources={topic.sources}/>
        </section>
    )
}

TopicSubHeader.propTypes = {
    loading: PropTypes.bool.isRequired,
    topic:   PropTypes.object,
}


export default TopicSubHeader
