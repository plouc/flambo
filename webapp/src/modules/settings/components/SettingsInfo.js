import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'

import { Grid, Cell, Label, Value }    from '../../../core/components/Grid'


export default class SettingsInfo extends Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
    }

    render() {
        const { settings } = this.props

        return (
            <Grid
                xTemplate="1fr 1fr"
                style={{
                    padding:   24,
                    boxShadow: '0 1px 2px rgba(0, 0, 0, .07)',
                }}
            >
                <Cell>
                    <Label>
                        <FormattedMessage id="language"/>
                    </Label>
                    <Value>
                        <FormattedMessage id={`lang_${settings.locale}`}/>
                    </Value>
                </Cell>
            </Grid>
        )
    }
}
