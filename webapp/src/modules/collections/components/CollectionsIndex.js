import React, { Component, PropTypes } from 'react'
import range                           from 'lodash/range'

import Helmet                          from '../../../core/components/HelmetIntl'
import Pager                           from '../../../core/components/pager/Pager'
import { TopBar }                      from '../../../core/components/page'
import { Grid }                        from '../../../core/components/Grid'
import { Button }                      from '../../../core/components/buttons'
import CollectionsIndexItem, {
    CollectionsIndexItemSkeleton,
} from './CollectionsIndexItem'

export default class CollectionsIndex extends Component {
    static propTypes = {
        hasBeenFetched:   PropTypes.bool.isRequired,
        fetch:            PropTypes.func.isRequired,
        perPage:          PropTypes.number.isRequired,
        page:             PropTypes.number.isRequired,
        hasNextPage:      PropTypes.bool.isRequired,
        filters:          PropTypes.object.isRequired,
        hasActiveFilters: PropTypes.bool.isRequired,
        collections:      PropTypes.array.isRequired,
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
            collections,
            match,
            history,
        } = this.props

        return (
            <div>
                <Helmet title="collections"/>
                <TopBar>
                    <Pager
                        page={page}
                        perPage={perPage}
                        hasNext={hasNextPage}
                        onChange={this.handlePagerUpdate}
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
                        <CollectionsIndexItemSkeleton key={i}/>
                    ))}
                    {!isFetching && collections.map(collection => (
                        <CollectionsIndexItem
                            key={collection.id}
                            url={match.url}
                            history={history}
                            collection={collection}
                        />
                    ))}
                </Grid>
            </div>
        )
    }
}
