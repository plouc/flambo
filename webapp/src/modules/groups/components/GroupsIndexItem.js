import React, { PropTypes } from 'react'
import styled               from 'styled-components'
import { Link }             from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Cell }             from '../../../core/components/Grid'
import { Name }             from '../../../core/components/card'
import GroupMembership      from '../containers/GroupMembershipContainer'
import {
    Name as SkeletonName,
    Description as SkeletonDescription,
} from '../../../core/components/skeleton'


const Picture = styled.div`
    background-size:     contain;
    background-color:    #fff;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    width:               160px;
    height:              160px;
    border:              12px solid white;
`

const Info = styled.div`
    display:         flex;
    flex-direction:  column;
    flex:            1;
    padding:         18px 24px;
    justify-content: space-between;
`


const Members = styled.div`
    font-size: 13px;
    color:     #999;
`

const Join = styled.div`
    display:         flex;
    justify-content: flex-end;
`

const cellStyle = {
    height:          160,
    backgroundColor: 'white',
    boxShadow:       '0 1px 2px rgba(0, 0, 0, .35)',
    flexDirection:   'row',
    borderRadius:    '2px',
    overflow:        'hidden',
}

export const GroupsIndexItemSkeleton = () => (
    <Cell style={cellStyle}>
        <Picture style={{ backgroundColor: '#eee' }}/>
        <Info>
            <SkeletonName/>
            <SkeletonDescription lineCount={1}/>
        </Info>
    </Cell>
)

const GroupsIndexItem = ({ url, group }) => {
    return (
        <Cell style={cellStyle}>
            <Link to={`${url}/${group.id}`}>
                <Picture url={group.picture_url}/>
            </Link>
            <Info>
                <div>
                    <Link to={`${url}/${group.id}`}>
                        <Name>{group.name}</Name>
                    </Link>
                    <Members>
                        <FormattedMessage
                            id="group_members_count"
                            values={{ count: group.members_count }}
                        />
                    </Members>
                </div>
                <Join>
                    <GroupMembership group={group} size="small"/>
                </Join>
            </Info>
        </Cell>
    )
}

GroupsIndexItem.propTypes = {
    group: PropTypes.object.isRequired,
    url:   PropTypes.string.isRequired,
}

export default GroupsIndexItem
