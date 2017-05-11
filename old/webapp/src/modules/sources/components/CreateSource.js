'use strict'

import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import SourceForm                      from './SourceForm'
import { createSource }                from '../actions/sourcesActions'
import UserBadge                       from '../../users/containers/UserBadgeContainer'


class CreateSource extends Component {
    render() {
        return (
            <div className="content">
                <div className="fixed-header content-header">
                    <h1>
                        <FormattedMessage id="source.create" />
                    </h1>
                    <UserBadge />
                </div>
                <div className="content-with-fixed-header">
                    <SourceForm
                        onSubmit={createSource}
                        initialValues={{}}
                    />
                </div>
            </div>
        )
    }
}

CreateSource.propTypes = {
}


export default CreateSource
