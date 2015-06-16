var autoprefix = require('..')
var assert = require('assert')

describe('autoprefix', function(){

  describe('.prefix', function() {

    it('should populate style with prefix', function() {
      var style = {
        userSelect: 'none'
      }

      autoprefix.prefix(style, 'userSelect', autoprefix.prefixes.webkit)

      assert.equal(style['WebkitUserSelect'], 'none')
    })

    it('should populate style with prefixes', function() {
      var style = {
        marginLeft: '10 px',
        userSelect: 'none'
      }

      autoprefix.prefix(style, 'userSelect', [
        autoprefix.prefixes.webkit,
        autoprefix.prefixes.mozilla
      ])

      assert.equal(style['WebkitUserSelect'], 'none')
      assert.equal(style['MozUserSelect'], 'none')
    })
  })

  describe('()', function() {
    describe('should add webkit', function() {
      var properties = ['userSelect', 'transition', 'boxShadow', 'fontSmoothing', 'flexDirection', 'flexWrap', 'alignItems', 'flexGrow', 'flexShrink', 'order', 'justifyContent']

      properties.forEach(function(prop) {
        it('to ' + prop, function() {
          var style = {}
          style[prop] = 'value'
          autoprefix(style)

          var upperProp = prop[0].toUpperCase() + prop.slice(1)
          assert.equal(style['Webkit' + upperProp], 'value')
        })
      })      
    })

    describe('should add mozilla', function() {
      var properties = ['userSelect', 'transition', 'boxShadow'] 

      properties.forEach(function(prop) {
        it('to ' + prop, function() {
          var style = {}
          style[prop] = 'value'
          autoprefix(style)

          var upperProp = prop[0].toUpperCase() + prop.slice(1)
          assert.equal(style['Moz' + upperProp], 'value')
        })
      })      
    })

    describe('should add microsoft', function() {
      var properties = ['userSelect', 'transition', 'boxShadow'] 

      properties.forEach(function(prop) {
        it('to ' + prop, function() {
          var style = {}
          style[prop] = 'value'
          autoprefix(style)

          var upperProp = prop[0].toUpperCase() + prop.slice(1)
          assert.equal(style['ms' + upperProp], 'value')
        })
      })      
    })

    it('should confine font smoothing to grayscale for MozOsx', function() {
      var style = {fontSmoothing: 'antialiased'}
      autoprefix(style)
      assert.equal(style['MozOsxFontSmoothing'], 'grayscale')      
    })

    it('should add webkit and ms to display:flex', function() {
      var style = {display: 'flex'}
      autoprefix(style)
      assert.equal(style.display, 'flex;display:-webkit-flex;display:-ms-flexbox')
    })
  })
  

})