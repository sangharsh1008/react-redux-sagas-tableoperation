const featureGenerator = require('./feature');

module.exports = function(plop) {
  plop.setGenerator('feature', featureGenerator);
};
