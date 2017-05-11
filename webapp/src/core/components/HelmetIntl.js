import React, { PropTypes }      from 'react'
import { injectIntl, intlShape } from 'react-intl'
import Helmet                    from 'react-helmet'

export const HelmetIntl = ({
    intl: { formatMessage },
    title,
    titleValues,
    children,
    ...props
}) => (
    <Helmet
        title={formatMessage({ id: title }, titleValues)}
        {...props}
    />
)

HelmetIntl.displayName = 'HelmetIntl'

HelmetIntl.propTypes = {
    intl:        intlShape.isRequired,
    title:       PropTypes.string.isRequired,
    titleValues: PropTypes.object,
}

export default injectIntl(HelmetIntl)
