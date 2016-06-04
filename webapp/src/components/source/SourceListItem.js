import React, { Component, PropTypes } from 'react';
import { Link }                        from 'react-router';
import SourceTopics                    from './SourceTopics';
import sourceTitle                     from '../../lib/sourceTitle';


class SourceListItem extends Component {
    render() {
        const { source } = this.props;

        return (
            <tr>
                <td>
                    <Link to={`/sources/${source.id}`}>{sourceTitle(source)}</Link>
                </td>
                <td>
                    <SourceTopics source={source} topics={source.themes || []}/>
                </td>
                <td>
                    <Link to={`/sources/${source.id}/edit`}>edit</Link>
                </td>
            </tr>
        );
    }
}


export default SourceListItem;
