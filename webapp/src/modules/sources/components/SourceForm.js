import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Prompt }                      from 'react-router-dom'
import { Field }                       from 'redux-form'
import styled                          from 'styled-components'

import { Grid, Cell, Label, Value }    from '../../../core/components/Grid'
import FormActions                     from '../../../core/components/form/FormActions'
import { FORM_NAME }                   from '../constants'
import SourceTypeSelector              from './SourceTypeSelector'
import typeForms                       from './type-forms'


const Container = styled.div`
    box-shadow: 0 1px 2px rgba(0, 0, 0, .07);
`

export default class SourceForm extends Component {
    static propTypes = {
        source:          PropTypes.object,
        onSubmit:        PropTypes.func.isRequired,
        onCancel:        PropTypes.func.isRequired,
        change:          PropTypes.func.isRequired,
        dirty:           PropTypes.bool.isRequired,
        valid:           PropTypes.bool.isRequired,
        isSubmitting:    PropTypes.bool.isRequired,
        submitSucceeded: PropTypes.bool.isRequired,
        formValues:      PropTypes.object.isRequired,
        intl:            PropTypes.shape({
            formatMessage: PropTypes.func.isRequired,
        }).isRequired,
    }

    handleTypeUpdate = type => {
        this.props.change('type', type)
    }

    render() {
        const {
            onCancel,
            handleSubmit,
            valid,
            dirty,
            submitSucceeded,
            formValues,
            intl: { formatMessage },
        } = this.props

        if (!formValues.type) {
            return (
                <SourceTypeSelector
                    onChange={this.handleTypeUpdate}
                />
            )
        }

        return (
            <Container>
                <form onSubmit={handleSubmit} name={FORM_NAME}>
                    <Prompt
                        when={dirty && !submitSucceeded}
                        message={formatMessage({ id: 'form_cancel_message' })}
                    />
                    <Grid
                        xTemplate="1fr 1fr"
                        style={{ padding: 24, paddingBottom: 0 }}
                    >
                        <Cell>
                            <Label htmlFor="name">
                                <FormattedMessage id="name"/>
                            </Label>
                            <Field id="name" name="name" component="input" type="text"/>
                        </Cell>
                        <Cell>
                            <Label>
                                <FormattedMessage id="source_type"/>
                            </Label>
                            <Value>
                                {formValues.type}
                            </Value>
                        </Cell>
                        <Cell x="1" xSpan="2">
                            <Label htmlFor="description">
                                <FormattedMessage id="description"/>
                            </Label>
                            <Field name="description" component="textarea"/>
                        </Cell>
                    </Grid>
                    {React.createElement(typeForms[formValues.type])}
                    <Grid xTemplate="1fr 1fr" style={{ padding: 24, paddingTop: 0 }}>
                        <Cell x="2" xAlign="end">
                            <FormActions
                                onSubmit={handleSubmit}
                                onCancel={onCancel}
                                submitDisabled={!valid}
                            />
                        </Cell>
                    </Grid>
                </form>
            </Container>
        )
    }
}
