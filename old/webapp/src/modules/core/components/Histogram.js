import React, { PropTypes } from 'react'
import _                    from 'lodash'


const Histogram = ({ buckets }) => {
    let maxDocCount = 0
    if (buckets.length) {
        maxDocCount = _.maxBy(buckets, 'doc_count').doc_count
    }

    return (
        <div className="histogram">
            {buckets.map(bucket => (
                <span
                    key={bucket.key}
                    style={{ height: `${Math.round(bucket.doc_count / maxDocCount * 100)}%` }}
                />
            ))}
        </div>
    )
}

Histogram.propTypes = {
    buckets: PropTypes.array.isRequired,
}


export default Histogram
