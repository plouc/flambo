import React, { Component, PropTypes }         from 'react'
import { Link }                                from 'react-router'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import TopicList                               from './TopicList'
import UserBadge                               from '../../users/containers/UserBadgeContainer'
import Loader                                  from '../../core/components/Loader'
import InternalError                           from '../../core/components/InternalError'


class Topics extends Component {
    componentWillMount() {
        const { fetchTopicsIfNeeded } = this.props
        fetchTopicsIfNeeded()
    }

    render() {
        const { topics, loading, error } = this.props

        if (error) {
            return <InternalError />
        }

        return (
            <div className="content">
                <div className="fixed-header content-header">
                    <h1>
                        <FormattedMessage id="topics" />
                    </h1>
                    <div>
                        <UserBadge />
                    </div>
                    <Loader loading={loading} />
                </div>
                <div className="content-with-fixed-header">
                    <TopicList topics={topics} />
                </div>
            </div>
        )
    }
}

Topics.propTypes = {
    fetchTopicsIfNeeded: PropTypes.func.isRequired,
    topics:              PropTypes.array.isRequired,
    loading:             PropTypes.bool.isRequired,
}


export default Topics
