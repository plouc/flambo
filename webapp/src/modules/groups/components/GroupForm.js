import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Prompt }                      from 'react-router-dom'
import { Field }                       from 'redux-form'

import { Grid, Cell, Label }           from '../../../core/components/Grid'
import { FORM_NAME }                   from '../constants'


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
            <form onSubmit={handleSubmit} name={FORM_NAME}>
                <Prompt
                    when={dirty && !submitSucceeded}
                    message={formatMessage({ id: 'form_cancel_message' })}
                />
                <Grid>
                    <Cell>
                        <Label htmlFor="name">
                            <FormattedMessage id="name"/>
                        </Label>
                        <Field id="name" name="name" component="input" type="text"/>
                    </Cell>
                    <Cell>
                        <Label htmlFor="data_url">
                            <FormattedMessage id="url"/>
                        </Label>
                        <Field id="data_url" name="data.url" component="input" type="text"/>
                    </Cell>
                    <Cell x="1">
                        <span onClick={handleSubmit}>
                            submit
                        </span>
                    </Cell>
                </Grid>
                {/*
                <Grid>
                    <Cell>
                        <Label htmlFor="name">
                            <FormattedMessage id="name"/>*
                        </Label>
                        <TextField id="name" name="name"/>
                    </Cell>
                    <Cell>
                        <Label htmlFor="family">
                            <FormattedMessage id="family"/>*
                        </Label>
                        <SelectField
                            id="family"
                            name="family"
                            options={positionFamilies.map(family => ({
                                value: family,
                                label: <FormattedMessage id={`position_family.${family}`} defaultMessage={family}/>,
                            }))}
                            clearable={false}
                            inputProps={{ id: 'family' }}
                        />
                    </Cell>
                    <Cell x="1" xSpan="2">
                        <Label htmlFor="description">
                            <FormattedMessage id="description"/>*
                        </Label>
                        <TextField id="description" name="description"/>
                    </Cell>
                </Grid>
                <FormActions
                    onSubmit={handleSubmit}
                    onCancel={onCancel}
                    submitDisabled={!valid}
                />
                */}
            </form>
        )
    }
}
