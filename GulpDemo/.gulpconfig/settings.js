module.exports = {
    paths: {
      srcBase: "../DemoSrc",
      distBase: "tmp",
      src: {
        views:"../DemoSrc/jade/",
        scripts:"../DemoSrc/js/",
        styles:"../DemoSrc/css/"
      },
      dist: {
        views:"tmp",
        scripts:"tmp/js/",
        styles:"tmp/css/"
      }
    },
    banner: ['/**',
  ' * <%= pkg.name %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.author %>',
  ' * @timestamp ' + new Date().toLocaleString(),
  ' */',
  ''].join('\n')
  }
