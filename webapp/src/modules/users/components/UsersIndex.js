import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import { Link }                        from 'react-router-dom'

import Helmet                          from '../../../core/components/HelmetIntl'
import { Grid, Cell }                  from '../../../core/components/Grid'
/*
import Emptiness                       from '../../../../core/components/Emptiness'
import DataTable                       from '../../../../core/components/data-table/DataTable'
import CreateButton                    from '../../../../core/components/buttons/CreateButton'
import Button                          from '../../../../core/components/buttons/Button'
import { Header, TopBar, Breadcrumbs } from '../../../../core/components/page'
import RelatedUser                     from '../../users/components/RelatedUser'
import AgenciesFilters                 from './AgenciesFilters'
import Icon                            from './AgenciesIcon'
*/

const wrapperStyle = {
    margin:   '-72px 60px 0 60px',
    position: 'relative',
    zIndex:   2,
}

export default class GroupsIndex extends Component {
    static propTypes = {
        hasBeenFetched:   PropTypes.bool.isRequired,
        fetch:            PropTypes.func.isRequired,
        perPage:          PropTypes.number.isRequired,
        page:             PropTypes.number.isRequired,
        hasNextPage:      PropTypes.bool.isRequired,
        filters:          PropTypes.object.isRequired,
        hasActiveFilters: PropTypes.bool.isRequired,
        groups:           PropTypes.array.isRequired,
        isFetching:       PropTypes.bool.isRequired,
        error:            PropTypes.object,
    }

    componentDidMount() {
        console.log('componentDidMount()')
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
            groups,
            fetch,
        } = this.props

        return (
            <Grid>
                {groups.map(group => (
                    <Cell
                        key={group.id}
                        style={{
                            height:          200,
                            backgroundColor: 'white',
                            boxShadow:       '0 1px 2px rgba(0,0,0,0.07)',
                        }}
                    >
                        {group.name}
                    </Cell>
                ))}
            </Grid>
        )
    }
}
