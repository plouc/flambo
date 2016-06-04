import React, { Component } from 'react';
import SourceList           from '../components/source/SourceList';
import Api                  from '../Api';


class Sources extends Component {
    constructor(props) {
        super(props);

        this.state = { sources: [] };
    }

    componentWillMount() {
        Api.getSources()
            .then(sources => {
                this.setState({ sources });
            })
        ;
    }

    render() {
        const { sources } = this.state;

        return (
            <div>
                <h1>Sources</h1>
                <SourceList sources={sources}/>
            </div>
        );
    }
}


export default Sources;
