import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Field }                       from 'redux-form'
import styled                          from 'styled-components'

import { Grid, Cell, Label }           from '../../../core/components/Grid'
import FormActions                     from '../../../core/components/form/FormActions'
import { Picto, Typo }                 from '../../../core/components/Logo'

const Wrapper = styled.div`
    position:        fixed;
    top:             0;
    right:           0;
    bottom:          0;
    left:            0;
    display:         flex;
    flex-direction:  column;
    justify-content: space-between;
    align-items:     center;
    padding-top:     120px;
    width:           100%;
    height:          100%;
    background:      ${props => props.theme.primaryColor};
`

const Container = styled.div`
    max-width:     440px;
    box-shadow:    0 2px 3px rgba(0, 0, 0, .75);
    border-radius: 2px;
    overflow:      hidden;
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
            <Wrapper>
                <Container>
                    <form onSubmit={handleSubmit} name="login">
                        <Grid
                            xTemplate="1fr"
                            style={{ padding: 36 }}
                        >
                            <Cell
                                style={{
                                    flexDirection:  'row',
                                    justifyContent: 'flex-start',
                                    alignItems:     'center',
                                }}
                            >
                                <Picto/>
                                <Typo/>
                            </Cell>
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
            </Wrapper>
        )
    }
}
