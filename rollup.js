const rollup = require('rollup'),
      path = require('path');

module.exports = function(options) {
  return function (files, metalsmith, done) {
    const entry = options.entry;

    options.entry = path.join(metalsmith._source, options.entry);

    rollup.rollup(options)
      .then(function(bundle) {
        return bundle.generate(options);
      })
      .then(function(output) {
        files[entry].contents = output.code;

        if (options.sourceMap && output.map) {
          files[entry + '.map'] = {
            contents: output.map
          }
        }

        return done();
      })
      .catch(function(err) {
        return done(err);
      });
  };
}
