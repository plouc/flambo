'use strict'

import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import SourceForm                      from './SourceForm'
import Loader                          from '../../core/components/Loader'
import { updateSource }                from '../actions/sourcesActions'


class EditSource extends Component {
    componentWillMount() {
        const { fetchSourceIfNeeded } = this.props
        const { id }                  = this.props.params

        fetchSourceIfNeeded(id)
    }

    render() {
        const { loading, source } = this.props

        return (
            <div className="content">
                <div className="fixed-header content-header">
                    <h1>
                        <FormattedMessage id="source.edit" />
                    </h1>
                </div>
                <div className="content-with-fixed-header">
                    <Loader loading={loading} />
                    {!loading && (
                        <SourceForm
                            initialValues={source}
                            onSubmit={updateSource}
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
    source:              PropTypes.object,
    loading:             PropTypes.bool.isRequired,
}


export default EditSource
