import React, { Component, PropTypes } from 'react'
import range                           from 'lodash/range'
import styled                          from 'styled-components'

import Helmet                          from '../../../core/components/HelmetIntl'
import { TopBar }                      from '../../../core/components/page'
import { Grid }                        from '../../../core/components/Grid'
import { Button }                      from '../../../core/components/buttons'
import { LoadMore }                    from '../../../core/components/IndexGrid'
import CollectionsIndexItem, {
    CollectionsIndexLoadingItem,
} from './CollectionsIndexItem'


const Container = styled.div`
    background: ${props => props.theme.primaryColor};
`

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

    render() {
        const {
            isFetching,
            perPage,
            collections,
            match,
            history,
        } = this.props

        return (
            <Container>
                <Helmet title="collections"/>
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
                    {collections.map(collection => (
                        <CollectionsIndexItem
                            key={collection.id}
                            url={match.url}
                            history={history}
                            collection={collection}
                        />
                    ))}
                    {isFetching && range(perPage).map(i => (
                        <CollectionsIndexLoadingItem key={i}/>
                    ))}
                    <LoadMore
                        title="collections_load_more"
                        withButton={true}
                    />
                </Grid>
            </Container>
        )
    }
}
