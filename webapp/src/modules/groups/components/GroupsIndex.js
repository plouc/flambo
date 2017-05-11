import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Link }                        from 'react-router-dom'
import { Paper }                       from 'material-ui'
import EditIcon                        from 'material-ui/svg-icons/editor/mode-edit'
import ViewIcon                        from 'material-ui/svg-icons/image/remove-red-eye'

import Helmet                          from '../../../../core/components/HelmetIntl'
import Emptiness                       from '../../../../core/components/Emptiness'
import DataTable                       from '../../../../core/components/data-table/DataTable'
import CreateButton                    from '../../../../core/components/buttons/CreateButton'
import Button                          from '../../../../core/components/buttons/Button'
import { Header, TopBar, Breadcrumbs } from '../../../../core/components/page'
import RelatedUser                     from '../../users/components/RelatedUser'
import AgenciesFilters                 from './AgenciesFilters'
import Icon                            from './AgenciesIcon'


const wrapperStyle = {
    margin:   '-72px 60px 0 60px',
    position: 'relative',
    zIndex:   2,
}

export default class AgenciesIndex extends Component {
    static propTypes = {
        hasBeenFetched:   PropTypes.bool.isRequired,
        fetch:            PropTypes.func.isRequired,
        perPage:          PropTypes.number.isRequired,
        page:             PropTypes.number.isRequired,
        hasNextPage:      PropTypes.bool.isRequired,
        filters:          PropTypes.object.isRequired,
        hasActiveFilters: PropTypes.bool.isRequired,
        agencies:         PropTypes.array.isRequired,
        isFetching:       PropTypes.bool.isRequired,
        error:            PropTypes.object,
    }

    componentDidMount() {
        this.props.fetch()
    }

    handleSort = (field, dir) => {
        this.props.fetch({ sort: { [field]: dir } })
    }

    handleFilter = filters => {
        this.props.fetch({ filters })
    }

    render() {
        const {
            hasBeenFetched,
            isFetching,
            perPage,
            page,
            sort,
            hasNextPage,
            filters,
            hasActiveFilters,
            agencies,
            fetch,
        } = this.props

        return (
            <div>
                <Helmet title="agencies"/>
                <Header>
                    <TopBar>
                        <Breadcrumbs breadcrumbs={[
                            <FormattedMessage key="org"      id="organization"/>,
                            <FormattedMessage key="agencies" id="agencies"/>,
                        ]}/>
                        <CreateButton
                            primary
                            path="/entities/agencies/create"
                            style={{ marginLeft: 24 }}
                        />
                    </TopBar>
                </Header>
                {hasBeenFetched && !hasActiveFilters && agencies.length === 0 && (
                    <Emptiness
                        title={<FormattedMessage id="agencies_no_result"/>}
                        icon={Icon}
                    />
                )}
                {hasBeenFetched && (hasActiveFilters || agencies.length > 0) && (
                    <Paper style={wrapperStyle}>
                        <DataTable
                            data={agencies}
                            isFetching={isFetching}
                            filters={
                                <AgenciesFilters
                                    filters={filters}
                                    onFilter={this.handleFilter}
                                />
                            }
                            fields={[
                                {
                                    key:      'name',
                                    sortable: true,
                                    primary:  true,
                                    render:   agency => <Link to={`/entities/agencies/${agency.id}`}>{agency.name}</Link>,
                                },
                                {
                                    key:      'businessName',
                                    render:   agency => agency.businessName,
                                },
                                {
                                    key:      'formattedAddress',
                                    sortable: false,
                                    render: agency => <span title={agency.formattedAddress}>{agency.formattedAddress}</span>
                                },
                                {
                                    key:      'phone',
                                    sortable: false,
                                },
                                {
                                    key:      'director',
                                    render:   agency => <RelatedUser user={agency.director}/>,
                                    sortable: true,
                                },
                                {
                                    key:      'actions',
                                    sortable: false,
                                    render:   agency => (
                                        <div>
                                            <Button
                                                flat
                                                path={`/entities/agencies/${agency.id}`}
                                                icon={<ViewIcon />}
                                                style={{ minWidth: '50px' }}
                                            />
                                            <Button
                                                flat
                                                path={`/entities/agencies/${agency.id}/edit`}
                                                icon={<EditIcon />}
                                                style={{ minWidth: '50px' }}
                                            />
                                        </div>
                                    ),
                                },
                            ]}
                            sort={sort}
                            onSortChange={this.handleSort}
                            paginate={true}
                            page={page}
                            hasNext={hasNextPage}
                            perPage={perPage}
                            onPageChange={(page, perPage) => { fetch({ page, perPage }) }}
                        />
                    </Paper>
                )}
            </div>
        )
    }
}
