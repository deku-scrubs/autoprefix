/**
 * Modules
 */

var assign = require('object-assign')
var is = require('@weo-edu/is')

/**
 * Vars
 */

var prefixes = {
  webkit: 'Webkit',
  mozilla: 'Moz',
  microsoft: 'ms',
  mozillaOSX: 'MozOsx'
}

/**
 * Expose autoprefix
 */

module.exports = autoprefix

// expose prefix
autoprefix.prefix = prefix
autoprefix.prefixes = prefixes

/**
 * Autoprefix style object
 *
 * Inspired by https://github.com/petehunt/jsxstyle/blob/master/lib/autoprefix.js
 *
 * @param  {Object} style
 * @return {Object}
 */

function autoprefix (style) {
  prefix(style, 'userSelect', [
    prefixes.webkit,
    prefixes.mozilla,
    prefixes.microsoft
  ])

  prefix(style, 'transition', [
    prefixes.webkit,
    prefixes.mozilla,
    prefixes.microsoft
  ])

  prefix(style, 'boxShadow', [
    prefixes.webkit,
    prefixes.mozilla,
    prefixes.microsoft
  ])

  if (style.hasOwnProperty('fontSmoothing')) {
    assign(style, {
      WebkitFontSmoothing: style.fontSmoothing,
      MozOsxFontSmoothing: style.fontSmoothing === 'antialiased' ? 'grayscale' : undefined
    })
  }

  // flexbox
  prefix(style, 'flexDirection', prefixes.webkit)
  prefix(style, 'flexWrap', prefixes.webkit)
  prefix(style, 'alignItems', prefixes.webkit)
  prefix(style, 'flexGrow', prefixes.webkit)
  prefix(style, 'flexShrink', prefixes.webkit)
  prefix(style, 'order', prefixes.webkit)
  prefix(style, 'justifyContent', prefixes.webkit)

  if (style.display === 'flex') {
    style.display = style.display + ';display:-webkit-flex;display:-ms-flexbox'
  }

  return style
}

/**
 * Add `prefixes` for `property` to `style`
 * @param  {Object} style
 * @param  {String} property
 * @param  {String|Array} prefixes
 * @return {Object}
 */

function prefix (style, property, prefixes) {
  if (!style.hasOwnProperty(property)) {
    return style
  }

  if (is.string(prefixes)) {
    prefixes = [prefixes]
  }

  var newStyle = {}

  // pseudo camel case
  var upperProperty = property[0].toUpperCase() + property.slice(1)

  prefixes.forEach(function (prefix) {
    newStyle[prefix + upperProperty] = style[property]
  })

  return assign(style, newStyle)

}
