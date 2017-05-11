import React, { Component, PropTypes } from 'react'

import Form                            from '../containers/GroupFormContainer'


export default class EditGroup extends Component {
    static propTypes = {
        group:      PropTypes.object.isRequired,
        update:     PropTypes.func.isRequired,
        error:      PropTypes.object,
        isUpdating: PropTypes.bool.isRequired,
        history:    PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
    }

    handleCancel = () => {
        const { history, group } = this.props
        history.push(`/groups/${group.id}`)
    }

    render() {
        const {
            group,
            update,
            isUpdating,
        } = this.props

        return (
            <div>
                <Form
                    group={group}
                    initialValues={group}
                    onSubmit={update}
                    onCancel={this.handleCancel}
                    isSubmitting={isUpdating}
                />
            </div>
        )
    }
}
