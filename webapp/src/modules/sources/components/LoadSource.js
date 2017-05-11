import React, { Component, PropTypes } from 'react'

import Form                            from '../containers/SourceFormContainer'


export default class EditSource extends Component {
    static propTypes = {
        source:     PropTypes.object.isRequired,
        update:     PropTypes.func.isRequired,
        error:      PropTypes.object,
        isUpdating: PropTypes.bool.isRequired,
        history:    PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
    }

    handleCancel = () => {
        const { history, source } = this.props
        history.push(`/sources/${source.id}`)
    }

    render() {
        const {
            source,
            update,
            isUpdating,
        } = this.props

        return (
            <div>
                <Form
                    source={source}
                    initialValues={source}
                    onSubmit={update}
                    onCancel={this.handleCancel}
                    isSubmitting={isUpdating}
                />
            </div>
        )
    }
}
