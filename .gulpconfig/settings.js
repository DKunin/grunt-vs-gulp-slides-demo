module.exports = {
    paths: {
      srcBase: "src",
      distBase: "tmp",
      src: {
        views:"src/jade/",
        styles:"src/jade/"
      },
      dist: {
        views:"tmp"
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
