'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import SourceList                      from './SourceList'
import UserBadge                       from '../../users/containers/UserBadgeContainer'
import InternalError                   from '../../core/components/InternalError'


class Sources extends Component {
    componentWillMount() {
        const { fetchSourcesIfNeeded } = this.props
        fetchSourcesIfNeeded()
    }

    render() {
        const { sources, isFetching, status } = this.props

        if (status !== 0) {
            return <InternalError />
        }

        return (
            <div className="content">
                <div className="fixed-header content-header">
                    <h1>
                        <FormattedMessage id="sources" />
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/sources/new" className="button button--action">
                            <FormattedMessage id="source.create" />
                        </Link>
                        <UserBadge />
                    </div>
                </div>
                <div className="content-with-fixed-header">
                    <SourceList loading={isFetching} sources={sources} />
                </div>
            </div>
        )
    }
}

Sources.propTypes = {
    sources:              PropTypes.array.isRequired,
    isFetching:           PropTypes.bool.isRequired,
    status:               PropTypes.number.isRequired,
    fetchSourcesIfNeeded: PropTypes.func.isRequired,
}


export default Sources
