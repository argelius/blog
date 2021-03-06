const Metalsmith   = require('metalsmith'),
      markdown     = require('metalsmith-markdown'),
      collections  = require('metalsmith-collections'),
      layouts      = require('metalsmith-layouts'),
      permalinks   = require('metalsmith-permalinks'),
      stylus       = require('metalsmith-stylus'),
      cleanCSS     = require('metalsmith-clean-css'),
      htmlMinifier = require('metalsmith-html-minifier'),
      sitemap      = require('metalsmith-sitemap'),
      pagination   = require('metalsmith-pagination');

const rollup      = require('./rollup'),
      nodeResolve = require('rollup-plugin-node-resolve'),
      commonjs    = require('rollup-plugin-commonjs'),
      babel       = require('rollup-plugin-babel'),
      uglify      = require('rollup-plugin-uglify');

Metalsmith(__dirname)
    .metadata({
      title: 'argeli.us',
      description: "Everything under the  sun. Mostly code."
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
    .use(pagination({
      articles: {
        layout: 'layout.html',
        perPage: 5,
        first: 'index.html',
        path: ':num/index.html'
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
    .use(function(files, metalsmith, done) {
      files['index.html'].isIndex = true;
      done();
    })
    .use(layouts({
      engine: 'handlebars',
    }))
    .use(rollup({
      entry: 'index.js',
      sourceMap: true,
      plugins: [
        nodeResolve(),
        commonjs(),
        babel(),
        uglify()
      ]
    }))
    .use(htmlMinifier())
    .use(sitemap({
      hostname: 'http://argeli.us'
    }))
    .build(function(err, files) {
        if (err) { throw err; }
    });
