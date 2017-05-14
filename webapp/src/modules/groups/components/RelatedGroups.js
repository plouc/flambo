import React    from 'react'
import styled   from 'styled-components'
import { Link } from 'react-router-dom'


const joinElements = (elements, sep) => {
    if (elements.length === 0) return []

    const isElement = React.isValidElement(sep)

    return elements.slice(1).reduce((agg, item, key) => {
        return agg.concat([isElement ? React.cloneElement(sep, { key }) : sep, item])
    }, [elements[0]])
}

const Item = styled.span`
    &:hover {
        text-decoration: underline;
    }
`

export default ({ groups }) => (
    <span>
        {joinElements(groups.map(group => (
            <Link to={`/groups/${group.id}`} key={group.id}>
                <Item>{group.name}</Item>
            </Link>
        )), <span>,&nbsp;</span>)}
    </span>
)