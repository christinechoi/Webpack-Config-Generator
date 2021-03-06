const {
  buildExports,
  buildScript,
  listPackageImports
} = require('./functions');

function generateConfiguration(req, res, next) {
  if (req.body && req.body.answers) {
    const { answers } = req.body;

    // Build the object
    const configuration = {};
    configuration.moduleExports = buildExports(answers);
    configuration.installScript = buildScript(answers);
    configuration.listPackageImports = listPackageImports(answers);

    // Check for errors
    if (
      !configuration.moduleExports ||
      !configuration.installScript ||
      !configuration.listPackageImports
    ) {
      return res.status(500).send('Failed to build the configuration object.');
    }

    // Pass on the result
    res.locals.configuration = configuration;
    next();
  } else {
    // If we received an improper body, return an error
    return res.status(400).end('No data received');
  }
}

module.exports = {
  generateConfiguration
};
