import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Prompt }                      from 'react-router-dom'
import { Field }                       from 'redux-form'
import styled                          from 'styled-components'

import { Grid, Cell, Label }           from '../../../core/components/Grid'
import FormActions                     from '../../../core/components/form/FormActions'
import { FORM_NAME }                   from '../constants'


const Container = styled.div`
    box-shadow: 0 1px 2px rgba(0, 0, 0, .07);
`

export default class SettingsForm extends Component {
    static propTypes = {
        onSubmit:        PropTypes.func.isRequired,
        onCancel:        PropTypes.func.isRequired,
        change:          PropTypes.func.isRequired,
        dirty:           PropTypes.bool.isRequired,
        valid:           PropTypes.bool.isRequired,
        submitSucceeded: PropTypes.bool.isRequired,
        intl:            PropTypes.shape({ formatMessage: PropTypes.func.isRequired }).isRequired,
    }

    render() {
        const {
            onCancel,
            handleSubmit,
            valid,
            dirty,
            submitSucceeded,
            intl: { formatMessage },
        } = this.props

        return (
            <Container>
                <form onSubmit={handleSubmit} name={FORM_NAME}>
                    <Prompt
                        when={dirty && !submitSucceeded}
                        message={formatMessage({ id: 'form_cancel_message' })}
                    />
                    <Grid
                        xTemplate="1fr 1fr"
                        style={{ padding: 24 }}
                    >
                        <Cell>
                            <Label htmlFor="locale">
                                <FormattedMessage id="language"/>
                            </Label>
                            <Field id="locale" name="locale" component="input" type="text"/>
                        </Cell>
                        <Cell x="2" y="2" xAlign="end">
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
