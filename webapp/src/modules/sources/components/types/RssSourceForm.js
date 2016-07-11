import React, { Component, PropTypes } from 'react'


class RssSourceForm extends Component {
    constructor(props) {
        super(props)

        this.handleUrlChange = this.handleUrlChange.bind(this)
    }

    handleUrlChange(e) {
        const { onChange } = this.props
        onChange({ url: e.target.value })
    }

    render() {
        const { data } = this.props

        return (
            <div>
                <label htmlFor="rssUrl">url</label><br/>
                <input
                    id="rssUrl"
                    type="text"
                    className="form-control form-control--full"
                    value={data.url || ''}
                    onChange={this.handleUrlChange}
                />
            </div>
        )
    }
}

RssSourceForm.propTypes = {
    data:     PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default RssSourceForm
