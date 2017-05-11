import React, { Component, PropTypes } from 'react'

import Helmet                          from '../../../core/components/HelmetIntl'
import Form                            from '../containers/GroupFormContainer'


export default class CreateGroup extends Component {
    static propTypes = {
        reset:      PropTypes.func.isRequired,
        create:     PropTypes.func.isRequired,
        isCreating: PropTypes.bool.isRequired,
        error:      PropTypes.object,
        history:    PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
    }

    componentDidMount() {
        this.props.reset()
    }

    handleCancel = () => {
        this.props.history.push('/groups')
    }

    render() {
        const {
            create,
            isCreating,
        } = this.props

        return (
            <div>
                <Helmet title="group_create"/>
                <Form
                    onSubmit={create}
                    onCancel={this.handleCancel}
                    isSubmitting={isCreating}
                    initialValues={{
                        type: 'rss',
                    }}
                />
            </div>
        )
    }
}
