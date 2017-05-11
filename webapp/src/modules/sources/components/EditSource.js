import React, { Component, PropTypes } from 'react'
import { Prompt }                      from 'react-router-dom'

import ErrorChecker                    from '../../../../core/components/errors/ErrorChecker'
import { edit }                        from '../dto'
import AgencyForm                      from '../containers/AgencyFormContainer'


export default class EditAgency extends Component {
    static propTypes = {
        error:      PropTypes.object,
        agency:     PropTypes.object.isRequired,
        update:     PropTypes.func.isRequired,
        isUpdating: PropTypes.bool.isRequired,
        isDirty:    PropTypes.bool.isRequired,
        history:    PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
        intl:       PropTypes.shape({ formatMessage: PropTypes.func.isRequired }).isRequired,
    }

    handleCancel = () => {
        const { history, agency } = this.props
        history.push(`/entities/agencies/${agency.id}`)
    }

    render() {
        const {
            agency,
            update,
            isUpdating,
            isDirty,
            agencies,
            error,
            intl: { formatMessage },
        } = this.props

        return (
            <div
                style={{
                    position: 'absolute',
                    top:      168,
                    right:    0,
                    bottom:   0,
                    left:     0,
                }}
            >
                <ErrorChecker error={error} />
                <AgencyForm
                    agency={agency}
                    agencies={agencies}
                    initialValues={edit(agency)}
                    onSubmit={update}
                    onCancel={this.handleCancel}
                    isSubmitting={isUpdating}
                />
                <Prompt
                    when={isDirty}
                    message={formatMessage({ id: 'form_cancel_message' })}
                />
            </div>
        )
    }
}
