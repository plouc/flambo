import React, { Component, PropTypes } from 'react'


class TwitterSourceForm extends Component {
    constructor(props) {
        super(props)

        this.handleUserChange = this.handleUserChange.bind(this)
    }

    handleUserChange(event) {
        const { onChange } = this.props
        onChange({ user: event.target.value })
    }

    render() {
        const { data } = this.props

        return (
            <div>
                <label htmlFor="twitterUser">user</label><br/>
                <input
                    id="twitterUser"
                    type="text"
                    className="form-control form-control--full"
                    value={data.user || ''}
                    onChange={this.handleUserChange}
                />
            </div>
        )
    }
}

TwitterSourceForm.propTypes = {
    data:     PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default TwitterSourceForm
