import React, { Component, PropTypes }     from 'react'
import { Link }                            from 'react-router-dom'
import styled                              from 'styled-components'
import { FormattedMessage }                from 'react-intl'
import { InfiniteLoader, AutoSizer, List } from 'react-virtualized'

import Helmet                              from '../../../core/components/HelmetIntl'
import { Name }                            from '../../../core/components/card'
import RelatedGroups                       from '../../groups/components/RelatedGroups'
import Placeholder                         from '../../../core/components/Placeholder'


const ListItem = styled.div`
    display:     flex;
    padding:     12px 24px;
    align-items: flex-start;
    border-top:  1px solid #f3f4f8;
    background-color: #FFF;
    
    &:first-child {
        border-width: 0;
    }
`

const Avatar = styled.div`
    width:               60px;
    height:              60px;
    margin-right:        24px;
    background-color:    #f3f4f8;
    background-repeat:   no-repeat;
    background-size:     cover;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              1px solid rgba(0, 0, 0, .1);
`

const Info = styled.div`
    display:        flex;
    flex-direction: column;
`

const Groups = styled.div`
    font-size: 13px;
    color:     #999;
`

const GroupsLabel = styled.span`
    font-weight: 500;
`

const UserItem = ({ url, user, ...props }) => (
    <ListItem {...props}>
        <Link to={`${url}/${user.id}`}>
            <Avatar url={user.avatar_url}/>
        </Link>
        <Info>
            <Link to={`${url}/${user.id}`}>
                <Name>{user.last_name}&nbsp;{user.first_name}</Name>
            </Link>
            {user.groups.length > 0 && (
                <Groups>
                    <GroupsLabel>
                        <FormattedMessage id="user_groups"/>
                    </GroupsLabel>
                    &nbsp;
                    <RelatedGroups groups={user.groups}/>
                </Groups>
            )}
        </Info>
    </ListItem>
)

const UserItemSkeleton = props => (
    <ListItem {...props}>
        <Placeholder
            width="60px" height="60px"
            style={{ marginRight: '24px' }}
        />
        <Info>
            <Placeholder
                width="120px" height="20px"
                style={{ marginBottom: '9px' }}
            />
            <Placeholder width="180px" height="14px"/>
        </Info>
    </ListItem>
)



const Wrapper = styled.div`
    display:        flex;
    flex-direction: column;
    overflow:       hidden;
    position:       fixed;
    top:            0;
    right:          0;
    bottom:         0;
    left:           220px;
    background:     ${props => props.theme.primaryColor};
`

export default class UsersIndex extends Component {
    static propTypes = {
        hasBeenFetched:   PropTypes.bool.isRequired,
        fetch:            PropTypes.func.isRequired,
        hasMore:          PropTypes.bool.isRequired,
        filters:          PropTypes.object.isRequired,
        hasActiveFilters: PropTypes.bool.isRequired,
        users:            PropTypes.array.isRequired,
        isFetching:       PropTypes.bool.isRequired,
        error:            PropTypes.object,
        match:            PropTypes.shape({
            url: PropTypes.string.isRequired,
        }).isRequired,
    }

    componentDidMount() {
        this.props.fetch()
    }

    handlePagerUpdate = (page, perPage) => {
        this.props.fetch({ page, perPage })
    }

    renderRow = ({ index, key, style }) => {
        const { users, match } = this.props

        const user = users[index]

        if (!this.isRowLoaded({ index })) {
            return (
                <UserItemSkeleton
                    key={key}
                    style={style}
                />
            )
        }

        return (
            <UserItem
                style={style}
                key={key}
                user={user}
                url={match.url}
            />
        )
    }

    isRowLoaded = ({ index }) => {
        const { hasMore, users } = this.props

        return !!users[index]// &&!hasMore || index < users.length
    }

    loadMore = ({ startIndex, stopIndex }) => {
        console.log(`loadMore, start: ${startIndex}, stop: ${stopIndex}`)
        return this.props.fetch({
            offset: startIndex,
            limit:  stopIndex - startIndex + 1,
        })
    }

    render() {
        const {
            isFetching,
            hasBeenFetched,
            hasMore,
            users,
        } = this.props

        const userCount = users.length
        const rowCount  = hasMore ? userCount + 10 : userCount

        const loadMoreRows = (isFetching || !hasBeenFetched) ? () => {} : this.loadMore

        return (
            <Wrapper>
                <Helmet title="users"/>
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    rowCount={rowCount}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    style={{ padding: '36px 60px' }}
                                    ref={registerChild}
                                    width={width}
                                    height={height}
                                    onRowsRendered={onRowsRendered}
                                    rowCount={rowCount}
                                    rowHeight={84}
                                    rowRenderer={this.renderRow}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </Wrapper>
        )
    }
}
