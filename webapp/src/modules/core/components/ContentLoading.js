'use strict'

import React, { Component, PropTypes } from 'react'
import Measure                         from 'react-measure'
import { spring, Motion }              from 'react-motion'
import Loader                          from './Loader'


const defaultStyles = {
    height:  100,
    opacity: 0,
}

class ContentLoading extends Component {
    constructor(props) {
        super(props)

        this.handleMeasureUpdate = this.handleMeasureUpdate.bind(this)

        this.state = { height: 0 }
    }

    handleMeasureUpdate({ height }) {
        this.setState({ height })
    }

    render() {
        const { loading, hasItem, children } = this.props

        const finalHeight = !hasItem ? 100 : this.state.height
        const style = {
            height:  spring(finalHeight),
            opacity: spring(loading ? 0 : 1),
        }

        return (
            <div className="section _responsive f-card">
                <Loader loading={loading} />
                <Motion defaultStyle={defaultStyles} style={style}>
                    {({ height, opacity }) => (
                        <div
                            style={{
                                height,
                                opacity,
                                overflow: 'hidden',
                            }}
                        >
                            <Measure
                                onMeasure={this.handleMeasureUpdate}
                                shouldMeasure={!loading && hasItem}
                                accurate={true}
                                blacklist={['width', 'top', 'right', 'bottom', 'left']}
                            >
                                {children}
                            </Measure>
                        </div>
                    )}
                </Motion>
            </div>
        )
    }
}

ContentLoading.propTypes = {
    loading: PropTypes.bool.isRequired,
    hasItem: PropTypes.bool.isRequired,
}


export default ContentLoading
