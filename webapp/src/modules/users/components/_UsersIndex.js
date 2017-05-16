import React, { Component, PropTypes }       from 'react'
import range                                 from 'lodash/range'
import { Link }                              from 'react-router-dom'
import styled                                from 'styled-components'
import { FormattedMessage }                  from 'react-intl'

import { Name as SkeletonName, Description } from '../../../core/components/skeleton'
import Helmet                                from '../../../core/components/HelmetIntl'
import Pager                                 from '../../../core/components/pager/Pager'
import { TopBar }                            from '../../../core/components/page'
import { Cell }                              from '../../../core/components/Grid'
import { Name }                              from '../../../core/components/card'
import RelatedGroups                         from '../../groups/components/RelatedGroups'


const List = styled.div`
    margin:     96px 60px 60px;
    background: white;
    boxShadow:  0 1px 2px rgba(0,0,0,0.07);
    padding:    12px 24px;
`

const ListItem = styled.div`
    display:     flex;
    height:      84px;
    padding:     12px 0;
    align-items: flex-start;
    border-top:  1px solid #f3f4f8;
    
    &:first-child {
        border-width: 0;
    }
`

const Avatar = styled.div`
    width:               60px;
    height:              60px;
    margin-right:        12px;
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

const UserItem = ({ url, user }) => (
    <ListItem>
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

const UserItemSkeleton = () => (
    <Cell
        style={{
            padding:         24,
            height:          200,
            backgroundColor: 'white',
            boxShadow:       '0 1px 2px rgba(0,0,0,0.07)',
            cursor:          'pointer',
        }}
    >
        <SkeletonName/>
        <Description lineCount={1}/>
    </Cell>
)

export default class UsersIndex extends Component {
    static propTypes = {
        hasBeenFetched:   PropTypes.bool.isRequired,
        fetch:            PropTypes.func.isRequired,
        perPage:          PropTypes.number.isRequired,
        page:             PropTypes.number.isRequired,
        hasNextPage:      PropTypes.bool.isRequired,
        filters:          PropTypes.object.isRequired,
        hasActiveFilters: PropTypes.bool.isRequired,
        users:            PropTypes.array.isRequired,
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
            hasNextPage,
            users,
            match,
        } = this.props

        return (
            <div>
                <Helmet title="users"/>
                <TopBar>
                    <Pager
                        page={page}
                        perPage={perPage}
                        hasNext={hasNextPage}
                        onChange={this.handlePagerUpdate}
                    />
                </TopBar>
                <List>
                    {isFetching && range(perPage).map(i => (
                        <UserItemSkeleton key={i}/>
                    ))}
                    {!isFetching && users.map(user => (
                        <UserItem
                            key={user.id}
                            url={match.url}
                            user={user}
                        />
                    ))}
                </List>
            </div>
        )
    }
}
