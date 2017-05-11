import { connect }            from 'react-redux'
import { withRouter }         from 'react-router-dom'
import { compose, lifecycle } from 'recompose'

import UserFeed               from '../components/UserFeed'
import { fetchUserFeed }      from '../actions'


const mapStateToProps = ({ usersFeed: { byId } }, { user }) => {
    const userFeed = byId[user.id]

    let items = []
    if (userFeed) {
        items = userFeed.currentIds.map(id => {
            return userFeed.byId[id].data
        })
    }

    return {
        items,
    }
}

const mapDispatchToProps = (dispatch, { user }) => ({
    fetch: () => {
        console.log('fetching user feed')
        dispatch(fetchUserFeed(user.id))
    },
})

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidMount() {
            this.props.fetch()
        },
    })
)(UserFeed)
