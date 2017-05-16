import React, { PropTypes } from 'react'
import { Link }             from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import GroupMembership      from '../containers/GroupMembershipContainer'
import Placeholder          from '../../../core/components/Placeholder'
import {
    ItemContainer,
    Picture,
    Info,
    Title,
    Footer,
    Meta,
} from '../../../core/components/IndexGrid'


export const GroupsIndexLoadingItem = () => (
    <ItemContainer>
        <Placeholder
            width="136px" height="136px"
            style={{ margin: 12 }}
        />
        <Info>
            <div>
                <Placeholder
                    width="120px" height="20px"
                    style={{ marginBottom: '9px' }}
                />
                <Placeholder width="180px" height="14px"/>
            </div>
            <Footer>
                <Placeholder width="80px" height="28px"/>
            </Footer>
        </Info>
    </ItemContainer>
)

const GroupsIndexItem = ({ url, group }) => {
    return (
        <ItemContainer>
            <Link to={`${url}/${group.id}`}>
                <Picture url={group.picture_url}>
                    {!group.picture_url && <span>{group.name.charAt(0)}</span>}
                </Picture>
            </Link>
            <Info>
                <div>
                    <Link to={`${url}/${group.id}`}>
                        <Title>{group.name}</Title>
                    </Link>
                    <Meta>
                        <FormattedMessage
                            id="group_members_count"
                            values={{ count: group.members_count }}
                        />
                    </Meta>
                </div>
                <Footer>
                    <GroupMembership group={group} size="small"/>
                </Footer>
            </Info>
        </ItemContainer>
    )
}

GroupsIndexItem.propTypes = {
    group: PropTypes.object.isRequired,
    url:   PropTypes.string.isRequired,
}

export default GroupsIndexItem
