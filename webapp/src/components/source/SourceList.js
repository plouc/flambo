import React, { Component, PropTypes } from 'react';
import SourceListItem                  from './SourceListItem';


class SourceList extends Component {
    render() {
        const { sources } = this.props;

        return (
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>topics</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {sources.map(source => (
                        <SourceListItem key={source.id} source={source}/>
                    ))}
                </tbody>
            </table>
        );
    }
}


export default SourceList;
