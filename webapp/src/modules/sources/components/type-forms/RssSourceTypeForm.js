import React                 from 'react'
import { FormattedMessage }  from 'react-intl'
import { Field }             from 'redux-form'

import { Grid, Cell, Label } from '../../../../core/components/Grid'


export default () => (
    <Grid xTemplate="1fr 1fr" style={{ padding: 24 }}>
        <Cell xSpan="2">
            <Label htmlFor="data_url">
                <FormattedMessage id="url"/>
            </Label>
            <Field id="data_url" name="data.url" component="input" type="text"/>
        </Cell>
    </Grid>
)
