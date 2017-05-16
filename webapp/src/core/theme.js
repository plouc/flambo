import _     from 'lodash'
import Color from 'color'


export const themes = _.mapValues({
    groups: {
        primaryColor:      '#17385d',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#92c691',
    },
    users: {
        primaryColor:      '#2a4735',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#d4b472',
    },
    sources: {
        primaryColor:      '#413455',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#d6d27e',
    },
    collections: {
        primaryColor:      '#254e55',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#b7dbab',
    },
    default: {
        primaryColor:      '#2e3954',
        disabledColor:     '#eff0f4',
        logoTertiaryColor: '#dbba91',
    },
}, theme => {
    if (!theme.primaryTextColor) {
        theme.primaryTextColor = Color(theme.primaryColor).darken(.15).string()
    }
    if (!theme.disabledTextColor) {
        theme.disabledTextColor = Color(theme.disabledColor).darken(.25).string()
    }
    if (!theme.secondaryColor) {
        theme.secondaryColor = Color(theme.primaryColor).lighten(.5).string()
    }
    if (!theme.accentColor) {
        theme.accentColor = Color(theme.primaryColor).rotate(180).desaturate(.2).lighten(1.1).string()
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