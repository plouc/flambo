import React, { Component, PropTypes } from 'react'
import classNames                      from 'classnames'


/**
 * @namespace components/LocaleSwitch
 */
const LocaleSwitch = ({ locale, setLocale }) => (
    <div className="lang-switch">
        <span
            className={classNames('button button--bold button--naked', {
                'button--active': locale === 'en',
            })}
            onClick={() => setLocale('en')}
        >
            EN
        </span>
        <span
            className={classNames('button button--bold button--naked', {
                'button--active': locale === 'fr',
            })}
            onClick={() => setLocale('fr')}
        >
            FR
        </span>
    </div>
)

LocaleSwitch.propTypes = {
    setLocale: PropTypes.func.isRequired,
    locale:    PropTypes.string.isRequired,
}


export default LocaleSwitch
