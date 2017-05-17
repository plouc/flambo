import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'

const options = {
    scaleRatio: 1.8,
    headerFontFamily: ['Rajdhani', 'sans-serif'],
    headerWeight: '600',
    bodyFontFamily: ['Fira Mono', 'monospace'],
    googleFonts: [
        {
            name:   'Fira Mono',
            styles: ['400', '500', '700'],
        },
        {
            name:   'Rajdhani',
            styles: ['300', '400', '500', '600', '700'],
        },
    ],
    plugins: [
        new CodePlugin(),
    ],
}

const typography = new Typography(options)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
    typography.injectStyles()
}

export default typography
