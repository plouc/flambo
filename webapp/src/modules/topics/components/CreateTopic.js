'use strict'

import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import TopicForm                       from '../containers/TopicFormContainer'
import { createTopic }                 from '../actions/topicsActions'
import UserBadge                       from '../../users/containers/UserBadgeContainer'


class CreateTopic extends Component {
    render() {
        return (
            <div className="content">
                <div className="fixed-header content-header">
                    <h1>
                        <FormattedMessage id="topic.create" />
                    </h1>
                    <UserBadge />
                </div>
                <div className="content-with-fixed-header">
                    <TopicForm
                        onSubmit={createTopic}
                        withFileUpload={false}
                        initialValues={{
                            sources: [],
                        }}
                    />
                </div>
            </div>
        )
    }
}

CreateTopic.propTypes = {
}


export default CreateTopic
