import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Link, matchPath }             from 'react-router-dom'

import Helmet                          from '../../../core/components/HelmetIntl'
import GroupInfo                       from './GroupInfo'
//import EditAgency                      from '../containers/EditAgencyContainer'


export default class Group extends Component {
    static propTypes = {
        id:          PropTypes.string.isRequired,
        fetch:       PropTypes.func.isRequired,
        error:       PropTypes.object,
        group:       PropTypes.object,
        isFetching:  PropTypes.bool.isRequired,
    }

    componentDidMount() {
        this.props.fetch()
    }

    componentDidUpdate({ id }) {
        const { id: prevId, fetch } = this.props
        if (prevId !== id) fetch()
    }

    render() {
        const { error, group, match, location } = this.props

        const isEditing = !!matchPath(location.pathname, {
            path: `${match.url}/edit`,
        })

        return (
            <div>
                <Helmet
                    title={group ? 'group_with_name' : 'group'}
                    titleValues={group ? { group: group.name } : {}}
                />
                {group && !isEditing && <GroupInfo group={group}/>}
            </div>
        )
    }
}
