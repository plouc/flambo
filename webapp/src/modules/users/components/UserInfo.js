import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'

import { Grid, Cell, Label, Value }    from '../../../core/components/Grid'


export default class GroupInfo extends Component {
    static propTypes = {
        group: PropTypes.object,
    }

    render() {
        const { group } = this.props

        return (
            <Grid style={{ paddingTop: 72 }}>
                <Cell>
                    <Label>
                        <FormattedMessage id="name"/>
                    </Label>
                    <Value>{group.name}</Value>
                </Cell>
                <Cell x="1" xSpan="2">
                    <Label>
                        <FormattedMessage id="description"/>
                    </Label>
                    <Value>{group.description || '—'}</Value>
                </Cell>
            </Grid>
        )
    }
}
