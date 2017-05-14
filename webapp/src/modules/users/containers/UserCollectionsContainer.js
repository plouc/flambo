import { withRouter }  from 'react-router-dom'
import { compose }     from 'recompose'

import UserCollections from '../components/UserCollections'


export default compose(
    withRouter
)(UserCollections)
