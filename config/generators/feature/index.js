const fs = require('fs');
const npmRun = require('npm-run');
const recursive = require('recursive-readdir');

const files = [];

const basePath = 'config/generators/feature/';
recursive(basePath, (err, list) => {
  // `files` is an array of absolute file paths
  files.push(...list.filter(file => file.endsWith('.hbs')));
});

const lowerFirst = string => string.charAt(0).toLowerCase() + string.slice(1);
const upperFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

const format = path => {
  // TODO: extract + use chalk
  const jsFile = /\.js$/.test(path);
  const prettierPath = jsFile ? path : `${path}/**/*.js`;
  const getHandle = job => (err, stdout, stderr) => {
    console.log(`---- ${job}: ${path} ---`);
    if (err) {
      console.log('ERROR:');
      console.error(stdout);
    } else {
      console.log('SUCCESS!');
    }
  };
  npmRun.exec(`prettier --write '${prettierPath}'`, {}, getHandle('prettier'));
  npmRun.exec(`eslint --fix ${path}`, {}, getHandle('eslint'));
};

module.exports = {
  description: 'Create a new feature',
  prompts: [
    {
      type: 'list',
      message: 'What directory is this for?',
      name: 'featureDir',
      choices: ['entities', 'features', 'sandbox'],
      default: 'features',
    },
    {
      type: 'input',
      name: 'feature',
      message: 'What should it be called?',
      default: '',
      validate(value) {
        if (value && /^[a-zA-Z0-9]*$/.test(value)) {
          return true;
        }
        return 'Feature is required, and must contain only alphanumeric characters';
      },
    },
    {
      type: 'input',
      name: 'action',
      message: 'What would you like to call the "entry" action (use camel case)?',
      default: 'load',
      validate(value) {
        if (value && /^[a-zA-Z0-9]*$/.test(value)) {
          return true;
        }
        return 'Feature is required, and must contain only alphanumeric characters';
      },
    },
    {
      type: 'confirm',
      name: 'updateRoots',
      message:
        'Do you want to update the parent reducer and saga (choose "No" if the feature already exists)?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'stripHints',
      message: 'Do you want to strip the // HINTS (choose "No" if this is your first feature)?',
      default: true,
    },
  ],
  actions(data) {
    const { updateRoots, featureDir } = data;
    const entityFeature = featureDir === 'entities';
    const actions = [
      answers => {
        const { feature } = answers;
        answers.featureName = lowerFirst(feature);
        answers.FeatureName = upperFirst(feature);
        return 'Added derived variables';
      },
    ];
    files.forEach(file => {
      const filePath = file.replace(basePath, '').replace('.hbs', '');
      const action = {
        type: 'add',
        path: `../../src/${featureDir}/{{lowerCase feature}}/${filePath}`,
        templateFile: `../../${file}`,
        abortOnFail: false,
      };
      // FIXME: create Entity integration test
      const exclude =
        entityFeature && (/Container\./.test(filePath) || /integration\./.test(filePath));
      if (!exclude) {
        actions.push(action);
      }
    });
    if (updateRoots) {
      actions.push({
        type: 'modify',
        path: `../../src/${featureDir}/${featureDir}Reducer.js`,
        pattern: /(\/\/ -- IMPORT REDUCER \+ PATH HERE -- \/\/)/gi,
        template: `$1
        import {{featureName}}Reducer from '${featureDir}/{{lowerCase feature}}/{{featureName}}Reducer';
        import { path as {{featureName}}Path } from '${featureDir}/{{lowerCase feature}}/{{featureName}}Selector';`,
      });
      actions.push({
        type: 'modify',
        path: `../../src/${featureDir}/${featureDir}Reducer.js`,
        pattern: /(\/\/ -- ADD REDUCER HERE -- \/\/)/gi,
        template: `$1
        [localize({{featureName}}Path)]: {{featureName}}Reducer,`,
      });
      actions.push({
        type: 'modify',
        path: `../../src/${featureDir}/${featureDir}Saga.js`,
        pattern: /(\/\/ -- IMPORT SAGAS HERE -- \/\/)/gi,
        template: `$1
        import {{featureName}}Sagas from '{{featureDir}}/{{lowerCase feature}}/{{featureName}}Sagas';`,
      });
      actions.push({
        type: 'modify',
        path: `../../src/${featureDir}/${featureDir}Saga.js`,
        pattern: /(\/\/ -- ADD SAGAS HERE -- \/\/)/gi,
        template: '$1\r\n{{featureName}}Sagas,',
      });
    }
    const formatNewFiles = answers => {
      const path = `src/${featureDir}/${answers.feature.toLowerCase()}`;
      format(path);
      if (updateRoots) {
        format(`src/${featureDir}/${featureDir}Reducer.js`);
        format(`src/${featureDir}/${featureDir}Saga.js`);
      }
      return '';
    };
    actions.push(answers => {
      let msg;
      if (answers.stripHints) {
        const path = `src/${featureDir}/${answers.feature.toLowerCase()}`;
        recursive(path, (err, list) => {
          if (err) {
            console.log('ERROR:', err);
          } else {
            list.forEach(file => {
              if (file.endsWith('.js')) {
                const contents = fs.readFileSync(file, 'utf-8');
                const lines = contents.split('\n');
                const strippedLines = lines.filter(line => !line.match(/\/\/ HINT:/));
                fs.writeFileSync(file, strippedLines.join('\n'), 'utf-8');
              }
            });
          }
          formatNewFiles(answers);
        });
        msg = 'Removing hints and running eslint and prettier async.';
      } else {
        formatNewFiles(answers);
        msg = 'Not removing hints and running eslint and prettier async.';
      }
      return msg;
    });
    return actions;
  },
};
