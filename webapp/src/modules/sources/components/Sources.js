import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import SourceList                      from './SourceList'
import Loader                          from '../../core/components/Loader'
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
            <div>
                <div className="content-header">
                    <h1>
                        <FormattedMessage id="sources" />
                    </h1>
                    <Link to="/sources/new" className="button button--action">
                        <FormattedMessage id="source.create" />
                    </Link>
                    <Loader loading={isFetching} />
                </div>
                <div className="content-wrapper">
                    <SourceList sources={sources} />
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
