import React, { PropTypes }                         from 'react'
import range                                        from 'lodash/range'

import Helmet                                       from '../../../core/components/HelmetIntl'
import Pager                                        from '../../../core/components/pager/Pager'
import { TopBar }                                   from '../../../core/components/page'
import { Button }                                   from '../../../core/components/buttons'
import { Grid }                                     from '../../../core/components/Grid'
import GroupsIndexItem, { GroupsIndexItemSkeleton } from './GroupsIndexItem'


const GroupsIndex = ({
    isFetching,
    groups,
    page, perPage, hasNextPage, paginate,
    match, history,
}) => (
    <div>
        <Helmet title="groups"/>
        <TopBar>
            <Pager
                page={page}
                perPage={perPage}
                hasNext={hasNextPage}
                onChange={paginate}
            />
            <Button
                label="create"
                to={`${match.url}/create`}
                primary
                raised
            />
        </TopBar>
        <Grid
            style={{
                background: 'transparent',
                paddingTop: 96,
            }}
        >
            {isFetching && range(perPage).map(i => (
                <GroupsIndexItemSkeleton key={i}/>
            ))}
            {!isFetching && groups.map(group => (
                <GroupsIndexItem
                    key={group.id}
                    url={match.url}
                    history={history}
                    group={group}
                />
            ))}
        </Grid>
    </div>
)

GroupsIndex.propTypes = {
    hasBeenFetched:   PropTypes.bool.isRequired,
    fetch:            PropTypes.func.isRequired,
    perPage:          PropTypes.number.isRequired,
    page:             PropTypes.number.isRequired,
    paginate:         PropTypes.func.isRequired,
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

export default GroupsIndex
