import React, { Component, PropTypes } from 'react'


class MeetupSourceForm extends Component {
    constructor(props) {
        super(props)

        this.handleGroupChange = this.handleGroupChange.bind(this)
    }

    handleGroupChange(e) {
        const { onChange } = this.props
        onChange({ group: e.target.value })
    }

    render() {
        const { data } = this.props

        return (
            <div>
                <label htmlFor="meetupGroup">group</label><br/>
                <input
                    id="meetupGroup"
                    type="text"
                    className="form-control form-control--full"
                    value={data.group || ''}
                    onChange={this.handleGroupChange}
                />
            </div>
        )
    }
}

MeetupSourceForm.propTypes = {
    data:     PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default MeetupSourceForm
