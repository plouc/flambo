import Color from 'color'


export const themes = {
    groups: {
        primaryColor:  '#8c7d73',
        disabledColor: '#eff0f4',
    },
    users: {
        primaryColor:  '#516752',
        disabledColor: '#eff0f4',
    },
    sources: {
        primaryColor:  '#666e7d',
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

    return theme
}