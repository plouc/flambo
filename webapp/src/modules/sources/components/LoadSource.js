import React, { Component, PropTypes } from 'react'

import { TopBar }                              from '../../../core/components/page'
import { Button }                              from '../../../core/components/buttons'


export default class LoadSource extends Component {
    static propTypes = {
        source: PropTypes.object.isRequired,
        load:   PropTypes.func.isRequired,
    }

    render() {
        const {
            source,
            load,
        } = this.props

        return (
            <div>
                <TopBar>
                    <Button
                        label="load"
                        onClick={load}
                        primary
                        raised
                    />
                    <Button
                        label="cancel"
                        to={`/sources/${source.id}`}
                        raised
                    />
                </TopBar>
                LOAD SOURCE
            </div>
        )
    }
}
