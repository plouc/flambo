import React, { Component } from 'react';
import SourceForm           from '../components/source/SourceForm';


const defaultSource = {
    type: 'twitter',
    data: '{}'
};


class CreateSource extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            source: defaultSource,
            errors: [],
        };
    }

    handleChange(source) {
        this.setState({ source });
    }

    handleSubmit() {
        const { source } = this.state;

        source.data = JSON.parse(source.data);

        fetch('http://localhost:3000/api/v1/sources', {
            method:  'POST',
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(source)
        })
            .then(response => {
                return response.json();
            })
            .then(result => {
                console.log(result);
                this.setState({ source: defaultSource });
            })
        ;
    }

    render() {
        const { source } = this.state;

        return (
            <div>
                <h1>New source</h1>
                <SourceForm
                    source={source}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}


export default CreateSource;
