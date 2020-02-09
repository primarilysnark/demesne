const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts')
const withSass = require('@zeit/next-sass')

module.exports = withSass(withCSS(withFonts({
  enableSvg: true
})))
