import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import SourceForm                      from './SourceForm'
import Loader                          from '../../core/components/Loader'


class EditSource extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = { source: props.source }
    }

    componentWillMount() {
        const { fetchSourceIfNeeded, fetchTopicsIfNeeded } = this.props
        const { id } = this.props.params

        fetchSourceIfNeeded(id)
        fetchTopicsIfNeeded()
    }

    componentWillReceiveProps({ source }) {
        this.setState({ source })
    }

    handleChange(source) {
        this.setState({ source })
    }

    handleSubmit() {
        const { updateSource } = this.props
        const { source }       = this.state

        updateSource(source.id, {
            ...source,
            topics: source.topics.map(topic => topic.id),
        })
    }

    render() {
        const { isFetching, topics } = this.props
        const { source }             = this.state

        return (
            <div>
                <div className="content-header">
                    {!isFetching && (
                        <h1>
                            <FormattedMessage id="source.edit" />
                        </h1>
                    )}
                </div>
                <div className="content-wrapper">
                    <Loader loading={isFetching} />
                    {!isFetching && (
                        <SourceForm
                            source={source}
                            topics={topics}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            cancelPath={`/sources/${source.id}`}
                        />
                    )}
                </div>
            </div>
        )
    }
}

EditSource.propTypes = {
    fetchSourceIfNeeded: PropTypes.func.isRequired,
    fetchTopicsIfNeeded: PropTypes.func.isRequired,
    updateSource:        PropTypes.func.isRequired,
    source:              PropTypes.object,
    isFetching:          PropTypes.bool.isRequired,
}

EditSource.defaultProps = {
    isFetching: true,
}


export default EditSource
