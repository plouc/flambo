'use strict'

import React, { Component, PropTypes } from 'react'
import { Link }                        from 'react-router'
import { FormattedMessage }            from 'react-intl'
import DynamicSourceFormContainer      from '../containers/DynamicSourceFormContainer'


const defaultFields = ['id', 'name', 'type']


class SourceForm extends Component {
    constructor(props) {
        super(props)

        this.handleTypeChange = this.handleTypeChange.bind(this)

        this.state = { fields: defaultFields }
    }

    componentWillMount() {
        const { initialValues } = this.props
        if (initialValues && initialValues.type) {
            this.handleTypeChange(initialValues.type)
        }
    }

    handleTypeChange(type) {
        switch (type) {
            case 'rss':
                this.setState({ fields: defaultFields.concat(['data.url']) })
                break

            case 'twitter':
                this.setState({ fields: defaultFields.concat(['data.user']) })
                break
        }
    }

    render() {
        const { onSubmit, initialValues } = this.props
        const { fields }                  = this.state

        return (
            <DynamicSourceFormContainer
                onTypeChange={this.handleTypeChange}
                onSubmit={onSubmit}
                initialValues={initialValues}
                fields={fields}
            />
        )
    }
}

SourceForm.propTypes = {
    onSubmit:      PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}


export default SourceForm
