const Metalsmith = require('metalsmith'),
      markdown   = require('metalsmith-markdown'),
      layouts    = require('metalsmith-layouts'),
      permalinks = require('metalsmith-permalinks'),
      stylus     = require('metalsmith-stylus'),
      cleanCSS   = require('metalsmith-clean-css');

Metalsmith(__dirname)
    .metadata({
      title: "My Static Site & Blog",
      description: "It's about saying »Hello« to the World.",
      generator: "Metalsmith",
      url: "http://www.metalsmith.io/"
    })
    .source('./src')
    .destination('./build')
    .clean(false)
    .use(stylus({
      'include css': true
    }))
    .use(cleanCSS({
      rebase: true
    }))
    .use(markdown())
    .use(permalinks())
    .use(layouts({
      engine: 'handlebars',
    }))
    .build(function(err, files) {
        if (err) { throw err; }
    });
