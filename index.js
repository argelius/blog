const Metalsmith   = require('metalsmith'),
      markdown     = require('metalsmith-markdown'),
      collections  = require('metalsmith-collections'),
      layouts      = require('metalsmith-layouts'),
      permalinks   = require('metalsmith-permalinks'),
      stylus       = require('metalsmith-stylus'),
      cleanCSS     = require('metalsmith-clean-css'),
      htmlMinifier = require('metalsmith-html-minifier');

Metalsmith(__dirname)
    .metadata({
      title: 'argeli.us',
      description: "Articles about everything under the  sun. Mostly about code."
    })
    .source('./src')
    .destination('./build')
    .clean(true)
    .use(collections({
      articles: {
        pattern: 'posts/*.md',
        sortBy: 'date'
      }
    }))
    .use(markdown())
    .use(stylus({
      'include css': true
    }))
    .use(cleanCSS({
      rebase: true
    }))
    .use(permalinks({
      relative: false
    }))
    .use(layouts({
      engine: 'handlebars',
    }))
    .use(htmlMinifier())
    .build(function(err, files) {
        if (err) { throw err; }
    });
