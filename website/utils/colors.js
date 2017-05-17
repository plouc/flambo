import colorPairsPicker from 'color-pairs-picker'
import chroma           from 'chroma-js'

import { config }       from 'config'

export const colors = colorPairsPicker(config.baseColor, {
  contrast: 5.5,
})

const darker = chroma(config.baseColor).darken(10).saturate(4).hex()
export const activeColors = colorPairsPicker(darker, {
  contrast: 7,
})

const brighter = chroma(config.baseColor).brighten(20).saturate(4).hex()
export const inactiveColors = colorPairsPicker(brighter, {
    contrast: 7,
})
