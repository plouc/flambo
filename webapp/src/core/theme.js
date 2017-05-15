import Color from 'color'


export const themes = {
    groups: {
        primaryColor:  '#70615a',
        disabledColor: '#eff0f4',
    },
    users: {
        primaryColor:  '#516752',
        disabledColor: '#eff0f4',
    },
    sources: {
        primaryColor:  '#5a5262',
        disabledColor: '#eff0f4',
    },
    collections: {
        primaryColor:  '#82655e',
        disabledColor: '#eff0f4',
    },
    default: {
        primaryColor:  '#383f54',
        disabledColor: '#eff0f4',
    },
}

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
}