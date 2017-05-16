import React, { Component, PropTypes } from 'react'
import range                           from 'lodash/range'
import styled                          from 'styled-components'

import Helmet                          from '../../../core/components/HelmetIntl'
import { TopBar }                      from '../../../core/components/page'
import { Button }                      from '../../../core/components/buttons'
import { Grid }                        from '../../../core/components/Grid'
import { LoadMore }                    from '../../../core/components/IndexGrid'
import SourcesIndexItem, {
    SourcesIndexLoadingItem,
} from './SourcesIndexItem'


const Container = styled.div`
    background: ${props => props.theme.primaryColor};
`

export default class SourcesIndex extends Component {
    static propTypes = {
        hasBeenFetched:   PropTypes.bool.isRequired,
        fetch:            PropTypes.func.isRequired,
        perPage:          PropTypes.number.isRequired,
        page:             PropTypes.number.isRequired,
        hasNextPage:      PropTypes.bool.isRequired,
        filters:          PropTypes.object.isRequired,
        hasActiveFilters: PropTypes.bool.isRequired,
        sources:          PropTypes.array.isRequired,
        isFetching:       PropTypes.bool.isRequired,
        error:            PropTypes.object,
        match:            PropTypes.shape({
            url: PropTypes.string.isRequired,
        }).isRequired,
    }

    componentDidMount() {
        this.props.fetch()
    }

    render() {
        const {
            isFetching,
            perPage,
            sources,
            match,
        } = this.props

        return (
            <Container>
                <Helmet title="sources"/>
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
                    {sources.map(source => (
                        <SourcesIndexItem
                            key={source.id}
                            url={match.url}
                            source={source}
                        />
                    ))}
                    {isFetching && range(perPage).map(i => (
                        <SourcesIndexLoadingItem key={i}/>
                    ))}
                    <LoadMore
                        title="sources_load_more"
                    />
                </Grid>
            </Container>
        )
    }
}
