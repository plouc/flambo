import React, { Component, PropTypes } from 'react'

import Form                            from '../containers/SettingsFormContainer'


export default class EditSettings extends Component {
    static propTypes = {
        settings:   PropTypes.object.isRequired,
        update:     PropTypes.func.isRequired,
        error:      PropTypes.object,
        history:    PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
    }

    handleCancel = () => {
        this.history.push('/settings')
    }

    render() {
        const { settings, update, isUpdating } = this.props

        return (
            <div>
                <Form
                    initialValues={settings}
                    onSubmit={update}
                    onCancel={this.handleCancel}
                    isSubmitting={isUpdating}
                />
            </div>
        )
    }
}
