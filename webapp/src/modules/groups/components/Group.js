import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Link, matchPath }             from 'react-router-dom'
import EditIcon                        from 'material-ui/svg-icons/editor/mode-edit'
import CancelIcon                      from 'material-ui/svg-icons/navigation/close'

import Helmet                          from '../../../../core/components/HelmetIntl'
import ErrorChecker                    from '../../../../core/components/errors/ErrorChecker'
import EntityDates                     from '../../../../core/components/dates/EntityDates'
import Icon                            from './AgenciesIcon'
import AgencyInfo                      from './AgencyInfo'
import EditAgency                      from '../containers/EditAgencyContainer'
import {
    Header,
    TopBar,
    Breadcrumbs,
    Title,
    Meta,
    MainAction,
    Picture,
    ViewEditTransition,
} from '../../../../core/components/page'


export default class Agency extends Component {
    static propTypes = {
        id:          PropTypes.number.isRequired,
        fetch:       PropTypes.func.isRequired,
        error:       PropTypes.object,
        agency:      PropTypes.object,
        isFetching:  PropTypes.bool.isRequired,
        update:      PropTypes.func.isRequired,
        isUpdating:  PropTypes.bool.isRequired,
        isDirty:     PropTypes.bool.isRequired,
        updateError: PropTypes.object,
    }

    componentDidMount() {
        this.props.fetch()
    }

    componentDidUpdate({ id }) {
        const { id: prevId, fetch } = this.props
        if (prevId !== id) fetch()
    }

    render() {
        const {
            error, agency, match, location,
            update, isUpdating, isDirty, updateError,
        } = this.props

        const isEditing = !!matchPath(location.pathname, {
            path: `${match.url}/edit`,
        })

        return (
            <div>
                <Helmet
                    title={agency ? 'agency_with_name' : 'agency'}
                    titleValues={agency ? { agency: agency.name } : {}}
                />
                <Header>
                    <TopBar>
                        <Breadcrumbs breadcrumbs={[
                            <FormattedMessage key="org" id="organization"/>,
                            <Link to="/entities/agencies" key="agencies">
                                <FormattedMessage id="agencies"/>
                            </Link>,
                        ]}/>
                    </TopBar>
                    <Picture icon={Icon}/>
                    <Title hasPicture={true}>
                        {agency ? (
                            <FormattedMessage
                                id="agency_with_name"
                                values={{ agency: agency.name }}
                            />
                        ) : ''}
                    </Title>
                    <Meta hasPicture={true}>
                        {agency && <EntityDates entity={agency} gender="female"/>}
                    </Meta>
                    <MainAction
                        icon={isEditing ? CancelIcon : EditIcon}
                        path={isEditing ? match.url : `${match.url}/edit`}
                    />
                </Header>
                <ErrorChecker error={error}>
                    {agency && (
                        <ViewEditTransition>
                            {!isEditing && <AgencyInfo agency={agency}/>}
                            {isEditing && (
                                <EditAgency
                                    agency={agency}
                                    update={update}
                                    error={updateError}
                                    isUpdating={isUpdating}
                                    isDirty={isDirty}
                                />
                            )}
                        </ViewEditTransition>
                    )}
                </ErrorChecker>
            </div>
        )
    }
}
