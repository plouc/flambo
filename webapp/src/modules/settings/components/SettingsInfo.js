import React, { Component, PropTypes }         from 'react'
import { FormattedMessage, FormattedRelative } from 'react-intl'

import { Grid, Cell, Label, Value }            from '../../../core/components/Grid'


export default class CollectionInfo extends Component {
    static propTypes = {
        collection: PropTypes.object.isRequired,
    }

    render() {
        const { collection } = this.props

        return (
            <Grid
                style={{
                    margin:    60,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
                }}
            >
                <Cell>
                    <Label>
                        <FormattedMessage id="name"/>
                    </Label>
                    <Value>{collection.name}</Value>
                </Cell>
                <Cell x="3">
                    <Label>
                        <FormattedMessage id="created_at"/>
                    </Label>
                    <Value>
                        <FormattedRelative
                            value={collection.created_at}
                            updateInterval={10000}
                        />
                    </Value>
                </Cell>
                <Cell xSpan="2">
                    <Label>
                        <FormattedMessage id="description"/>
                    </Label>
                    <Value>{collection.description || '—'}</Value>
                </Cell>
                <Cell>
                    <Label>
                        <FormattedMessage id="updated_at"/>
                    </Label>
                    <Value>
                        <FormattedRelative
                            value={collection.updated_at}
                            updateInterval={10000}
                        />
                    </Value>
                </Cell>
            </Grid>
        )
    }
}
