import React, { Component, PropTypes } from 'react'
import { matchPath }                   from 'react-router-dom'
import { FormattedMessage }            from 'react-intl'

import Helmet                          from '../../../core/components/HelmetIntl'
import Info                            from './SettingsInfo'
import Edit                            from '../containers/EditSettingsContainer'
import { Button }                      from '../../../core/components/buttons'
import {
    Header,
    Title,
    Bar,
    Content,
} from '../../../core/components/info-page'


export default class Settings extends Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        error:    PropTypes.object,
    }

    render() {
        const { settings, match, location } = this.props

        const isEditing = !!matchPath(location.pathname, {
            path: `${match.url}/edit`,
        })

        return (
            <div>
                <Helmet title="settings"/>
                <Header>
                    <span/>
                    <Title>
                        <FormattedMessage id="settings"/>
                    </Title>
                </Header>
                <Bar>
                    <span/>
                    <span/>
                    <div>
                        <Button
                            to={`${match.url}/edit`}
                            label="edit"
                            primary
                        />
                    </div>
                </Bar>
                <Content>
                    <span/>
                    {!isEditing && <Info settings={settings}/>}
                    {isEditing  && <Edit settings={settings}/>}
                </Content>
            </div>
        )
    }
}
