import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'

import Helmet               from '../../../core/components/HelmetIntl'
import Form                 from '../containers/GroupFormContainer'
import {
    Header,
    Title,
    Bar,
    Content,
} from '../../../core/components/info-page'


const CreateGroup = ({ create, isCreating, cancel }) => (
    <div>
        <Helmet title="group_create"/>
        <Header>
            <span/>
            <Title>
                <FormattedMessage id="group_create"/>
            </Title>
        </Header>
        <Bar/>
        <Content>
            <span/>
            <Form
                onSubmit={create}
                onCancel={cancel}
                isSubmitting={isCreating}
            />
        </Content>
    </div>
)

CreateGroup.propTypes = {
    create:     PropTypes.func.isRequired,
    isCreating: PropTypes.bool.isRequired,
    cancel:     PropTypes.func.isRequired,
    error:      PropTypes.object,
}

export default CreateGroup