import React, { Component } from 'react'
import { hashHistory }      from 'react-router'
import { FormattedMessage } from 'react-intl'
import SourceForm           from '../components/SourceForm'


const defaultSource = {
    name: '',
    type: 'twitter',
    data: {},
}


class CreateSource extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            source: defaultSource,
            errors: [],
        }
    }

    handleChange(source) {
        this.setState({ source })
    }

    handleSubmit() {
        const { source } = this.state

        fetch('http://localhost:3000/api/v1/sources', {
            method:  'POST',
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(source)
        })
            .then(response => response.json())
            .then(result => {
                if (result.hasError) {
                    this.setState({ errors: result.errors })
                } else {
                    this.setState({
                        errors: [],
                        topic:  defaultSource,
                    })
                    hashHistory.push('/sources')
                }
            })
    }

    render() {
        const { source } = this.state

        return (
            <div>
                <div className="content-header">
                    <h1>
                        <FormattedMessage id="source.create" />
                    </h1>
                </div>
                <div className="content-wrapper">
                    <SourceForm
                        source={source}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        cancelPath="/sources"
                    />
                </div>
            </div>
        )
    }
}


export default CreateSource
