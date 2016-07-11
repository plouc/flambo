import React, { Component, PropTypes }         from 'react'
import { Link }                                from 'react-router'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import TopicList                               from './TopicList'
import Loader                                  from '../../core/components/Loader'
import InternalError                           from '../../core/components/InternalError'


class Topics extends Component {
    componentWillMount() {
        const { fetchTopicsIfNeeded } = this.props
        fetchTopicsIfNeeded()
    }

    render() {
        const { topics, isFetching, status } = this.props

        if (status !== 0) {
            return <InternalError />
        }

        return (
            <div>
                <div className="content-header">
                    <h1>
                        <FormattedMessage id="topics" />
                    </h1>
                    <Loader loading={isFetching} />
                </div>
                <div className="content-wrapper">
                    <TopicList topics={topics} />
                </div>
            </div>
        )
    }
}

Topics.propTypes = {
    fetchTopicsIfNeeded: PropTypes.func.isRequired,
    topics:              PropTypes.array.isRequired,
    isFetching:          PropTypes.bool.isRequired,
    status:              PropTypes.number.isRequired,
}


export default Topics
