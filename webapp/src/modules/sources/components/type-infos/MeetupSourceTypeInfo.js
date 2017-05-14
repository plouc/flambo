import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import styled                          from 'styled-components'

import { Label }                       from '../../../../core/components/Grid'


const Container = styled.div`
    background: white;
    padding:    12px;
    font-size:  14px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .07);
`

const Item = styled.div`
    margin-bottom: 12px;
`

export default class MeetupSourceTypeInfo extends Component {
    static propTypes = {
        source: PropTypes.object.isRequired,
    }

    render() {
        const { source } = this.props

        return (
            <Container>
                <Item>
                    <Label>
                        <FormattedMessage id="meetup_group_name"/>
                    </Label>
                    <div>{source.data.name}</div>
                </Item>
                <Item>
                    <Label>
                        <FormattedMessage id="meetup_group_url"/>
                    </Label>
                    <div>
                        <a href={source.data.url} target="_blank">
                            {source.data.url}
                        </a>
                    </div>
                </Item>
                <Item>
                    <Label>
                        <FormattedMessage id="country"/>
                    </Label>
                    <div>{source.data.country}</div>
                </Item>
                <Item>
                    <Label>
                        <FormattedMessage id="city"/>
                    </Label>
                    <div>{source.data.city}</div>
                </Item>
            </Container>
        )
    }
}
