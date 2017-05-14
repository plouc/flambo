import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Field }                       from 'redux-form'
import styled                          from 'styled-components'

import { Grid, Cell, Label }           from '../../../core/components/Grid'
import FormActions                     from '../../../core/components/form/FormActions'


const Container = styled.div`
    max-width:  440px;
    margin:     60px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .07);
`

export default class Login extends Component {
    static propTypes = {
        group:        PropTypes.object,
        handleSubmit: PropTypes.func.isRequired,
        change:       PropTypes.func.isRequired,
        dirty:        PropTypes.bool.isRequired,
        valid:        PropTypes.bool.isRequired,
    }

    render() {
        const {
            handleSubmit,
            valid,
        } = this.props

        return (
            <Container>
                <form onSubmit={handleSubmit} name="login">
                    <Grid xTemplate="1fr">
                        <Cell>
                            <Label htmlFor="login">
                                <FormattedMessage id="login"/>
                            </Label>
                            <Field id="login" name="login" component="input" type="text"/>
                        </Cell>
                        <Cell>
                            <Label htmlFor="password">
                                <FormattedMessage id="password"/>
                            </Label>
                            <Field id="password" name="password" component="input" type="password"/>
                        </Cell>
                        <Cell xAlign="end">
                            <FormActions
                                onSubmit={handleSubmit}
                                onCancel={() => {}}
                                submitDisabled={!valid}
                            />
                        </Cell>
                    </Grid>
                </form>
            </Container>
        )
    }
}
