import React, { Component } from 'react';
import assign               from 'object-assign';
import { browserHistory }   from 'react-router';
import SourceForm           from '../components/source/SourceForm';
import Api                  from '../Api';


class EditSource extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            source:  null,
            loading: true
        };
    }

    componentWillMount() {
        const { id } = this.props.params;

        Api.getSource(id)
            .then(source => {
                this.setState({
                    source: assign(source, {
                        data: JSON.stringify(source.data)
                    }),
                    loading: false,
                });
            })
        ;
    }

    handleChange(source) {
        this.setState({ source });
    }

    handleSubmit() {
        const { source } = this.state;

        Api.updateSource(source.id, assign(source, { data: JSON.parse(source.data) }))
            .then(result => {
                if (result.hasError) {
                    this.setState({ errors: result.errors });
                } else {
                    this.setState({ errors: [] });
                    browserHistory.push('/sources');
                }
            })
        ;
    }

    render() {
        const { source, loading } = this.state;

        return (
            <div>
                <h1>Edit source</h1>
                {loading && (
                    <p>loading…</p>
                )}
                {!loading && (
                    <SourceForm
                        source={source}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                    />
                )}
            </div>
        );
    }
}


export default EditSource;
