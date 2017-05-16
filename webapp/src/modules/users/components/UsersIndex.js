import React, { Component, PropTypes }     from 'react'
import styled                              from 'styled-components'
import { InfiniteLoader, AutoSizer, List } from 'react-virtualized'
import { FormattedMessage }                from 'react-intl'

import Helmet                              from '../../../core/components/HelmetIntl'
import { TopBar }                          from '../../../core/components/page'
import UsersIndexItem, {
    UsersIndexLoadingItem,
} from './UsersIndexItem'



const Wrapper = styled.div`
    display:        flex;
    flex-direction: column;
    overflow:       hidden;
    position:       fixed;
    top:            120px;
    right:          0;
    bottom:         0;
    left:           240px;
    background:     ${props => props.theme.primaryColor};
`

export default class UsersIndex extends Component {
    static propTypes = {
        hasBeenFetched:   PropTypes.bool.isRequired,
        fetch:            PropTypes.func.isRequired,
        hasNextPage:      PropTypes.bool.isRequired,
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

    renderRow = ({ index, key, style }) => {
        const { users, match } = this.props

        if (!this.isRowLoaded({ index })) {
            return (
                <UsersIndexLoadingItem
                    key={key}
                    style={style}
                />
            )
        }

        const user = users[index]

        return (
            <UsersIndexItem
                style={style}
                key={key}
                user={user}
                url={match.url}
            />
        )
    }

    isRowLoaded = ({ index }) => {
        const { users } = this.props

        return index < users.length
    }

    loadMore = () => {
        const { isFetching, hasBeenFetched } = this.props
        if (isFetching || !hasBeenFetched) return
        return this.props.fetch()
    }

    render() {
        const { hasBeenFetched, isFetching, hasNextPage, users } = this.props

        let rowCount = users.length
        if (hasBeenFetched === false || isFetching || hasNextPage) {
            rowCount += 10
        }

        return (
            <div>
                <Helmet title="users"/>
                <TopBar>
                    <FormattedMessage id="users"/>
                </TopBar>
                <Wrapper>
                    <InfiniteLoader
                        isRowLoaded={this.isRowLoaded}
                        loadMoreRows={this.loadMore}
                        rowCount={rowCount}
                        threshold={5}
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
            </div>
        )
    }
}
