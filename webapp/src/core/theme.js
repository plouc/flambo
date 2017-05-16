import _     from 'lodash'
import Color from 'color'


export const themes = _.mapValues({
    groups: {
        primaryColor:      '#70615a',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#b7c69d',
    },
    users: {
        primaryColor:      '#516752',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#bc9e96',
    },
    sources: {
        primaryColor:      '#5a5262',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#d6d399',
    },
    collections: {
        primaryColor:      '#825d52',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#b7dbab',
    },
    default: {
        primaryColor:      '#383f54',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#dbbc9e',
    },
}, theme => {
    if (!theme.primaryTextColor) {
        theme.primaryTextColor = Color(theme.primaryColor).darken(.15).string()
    }
    if (!theme.disabledTextColor) {
        theme.disabledTextColor = Color(theme.disabledColor).darken(.25).string()
    }

    if (!theme.logoPrimaryColor) {
        theme.logoPrimaryColor = theme.primaryColor
    }
    if (!theme.logoSecondaryColor) {
        theme.logoSecondaryColor = Color(theme.primaryColor).lighten(.5).string()
    }
    if (!theme.logoTertiaryColor) {
        theme.logoTertiaryColor = Color(theme.primaryColor).rotate(180).desaturate(.2).lighten(1.1).string()
    }

    return theme
})

export const themeFromPath = path => {
    let theme = themes.default
    if (path.startsWith('/groups')) {
        theme = themes.groups
    } else if (path.startsWith('/users')) {
        theme = themes.users
    } else if (path.startsWith('/sources')) {
        theme = themes.sources
    } else if (path.startsWith('/collections')) {
        theme = themes.collections
    }

    return theme
}