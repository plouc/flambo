import React, { PropTypes } from 'react'

import Form                 from '../containers/GroupFormContainer'


const EditGroup = ({
    group, update, cancel, isUpdating,
}) => (
    <div>
        <Form
            group={group}
            initialValues={group}
            onSubmit={update}
            onCancel={cancel}
            isSubmitting={isUpdating}
        />
    </div>
)

EditGroup.propTypes = {
    group:      PropTypes.object.isRequired,
    update:     PropTypes.func.isRequired,
    cancel:     PropTypes.func.isRequired,
    error:      PropTypes.object,
    isUpdating: PropTypes.bool.isRequired,
}

export default EditGroup
