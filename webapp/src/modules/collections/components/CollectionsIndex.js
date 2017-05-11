import React, { Component, PropTypes } from 'react'
import range                           from 'lodash/range'
import styled                          from 'styled-components'

import Helmet                          from '../../../core/components/HelmetIntl'
import Pager                           from '../../../core/components/pager/Pager'
import { TopBar }                      from '../../../core/components/page'
import { Grid, Cell }                  from '../../../core/components/Grid'
import {
    Name,
    Description as SkeletonDescription,
} from '../../../core/components/skeleton'


const Description = styled.div`
    font-size: 14px;
`

const GroupItem = ({ url, history, group }) => (
    <Cell
        onClick={() => history.push(`${url}/${group.id}`)}
        style={{
            padding:         24,
            height:          200,
            backgroundColor: 'white',
            boxShadow:       '0 1px 2px rgba(0,0,0,0.07)',
            cursor:          'pointer',
        }}
    >
        <span>{group.name}</span>
        <Description>
            {group.description || ''}
        </Description>
    </Cell>
)

const GroupItemSkeleton = () => (
    <Cell
        style={{
            padding:         24,
            height:          200,
            backgroundColor: 'white',
            boxShadow:       '0 1px 2px rgba(0,0,0,0.07)',
            cursor:          'pointer',
        }}
    >
        <Name/>
        <SkeletonDescription/>
    </Cell>
)

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
        match:            PropTypes.shape({
            url: PropTypes.string.isRequired,
        }).isRequired,
        history:          PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
    }

    componentDidMount() {
        this.props.fetch()
    }

    handlePagerUpdate = (page, perPage) => {
        this.props.fetch({ page, perPage })
    }

    handleSort = (field, dir) => {
        this.props.fetch({ sort: { [field]: dir } })
    }

    handleFilter = filters => {
        this.props.fetch({ filters })
    }

    render() {
        const {
            isFetching,
            perPage,
            page,
            groups,
            match,
            history,
        } = this.props

        return (
            <div>
                <Helmet title="groups"/>
                <TopBar>
                    <Pager
                        page={page}
                        perPage={perPage}
                        hasNext={true}
                        onChange={this.handlePagerUpdate}
                    />
                </TopBar>
                <Grid
                    xTemplate="1fr 1fr 1fr 1fr"
                    xGap="36" yGap="36"
                    style={{
                        background: 'transparent',
                        paddingTop: 96,
                    }}
                >
                    {isFetching && range(perPage).map(i => (
                        <GroupItemSkeleton key={i}/>
                    ))}
                    {!isFetching && groups.map(group => (
                        <GroupItem
                            key={group.id}
                            url={match.url}
                            history={history}
                            group={group}
                        />
                    ))}
                </Grid>
            </div>
        )
    }
}
