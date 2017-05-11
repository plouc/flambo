import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'

import { Grid, Cell, Label, Value }    from '../../../../core/components/Grid'


export default class RssSourceTypeInfo extends Component {
    static propTypes = {
        source: PropTypes.object.isRequired,
    }

    render() {
        const { source } = this.props

        return (
            <Grid>
                <Cell xSpan="2">
                    <Label>
                        <FormattedMessage id="url"/>
                    </Label>
                    <Value>{source.data.url}</Value>
                </Cell>
            </Grid>
        )
    }
}
