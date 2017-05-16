import React, { PropTypes } from 'react'
import range                from 'lodash/range'
import styled               from 'styled-components'

import Helmet               from '../../../core/components/HelmetIntl'
import { TopBar }           from '../../../core/components/page'
import { Button }           from '../../../core/components/buttons'
import { Grid }             from '../../../core/components/Grid'
import GroupsIndexItem, {
    GroupsIndexLoadingItem,
} from './GroupsIndexItem'


const Container = styled.div`
    background: ${props => props.theme.primaryColor};
`

const LoadMore = styled.div`
    cursor:           pointer;
    height:           160px;
    background-color: ${props => props.theme.logoSecondaryColor};
    box-shadow:       0 1px 2px rgba(0, 0, 0, .35);
`

const GroupsIndex = ({
    isFetching,
    groups,
    perPage, hasNextPage, fetchNext,
    match, history,
}) => (
    <Container>
        <Helmet title="groups"/>
        <TopBar>
            <span/>
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
            {groups.map(group => (
                <GroupsIndexItem
                    key={group.id}
                    url={match.url}
                    history={history}
                    group={group}
                />
            ))}
            {isFetching && range(perPage).map(i => (
                <GroupsIndexLoadingItem key={i}/>
            ))}
            {hasNextPage && (
                <LoadMore onClick={fetchNext}>
                    load next page
                </LoadMore>
            )}
        </Grid>
    </Container>
)

GroupsIndex.propTypes = {
    hasBeenFetched: PropTypes.bool.isRequired,
    fetch:          PropTypes.func.isRequired,
    fetchNext:      PropTypes.func.isRequired,
    perPage:        PropTypes.number.isRequired,
    page:           PropTypes.number.isRequired,
    hasNextPage:    PropTypes.bool.isRequired,
    groups:         PropTypes.array.isRequired,
    isFetching:     PropTypes.bool.isRequired,
    error:          PropTypes.object,
    match:          PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
}

export default GroupsIndex
