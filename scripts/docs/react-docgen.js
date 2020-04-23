const _ = require('lodash');
const reactDocs = require('react-docgen');

const propsTemplate = require('./template-props');

const sortObjectByKey = obj =>
  _(obj)
    .keys()
    .sort()
    .reduce((memo, key) => {
      // eslint-disable-next-line
      memo[key] = obj[key];
      return memo;
    }, {});

const reactDocgenMarkdown = (componentSrc, filename) => {
  try {
    const docs = reactDocs.parse(componentSrc, null, null, {
      filename,
    });
    return propsTemplate({
      description: docs.description,
      props: sortObjectByKey(docs.props),
    });
  } catch (error) {
    // Fallback for components using multiple exports in the same file
    const docsList = reactDocs.parse(
      componentSrc,
      reactDocs.resolver.findAllExportedComponentDefinitions,
      null,
      {
        filename,
      },
    );
    // TODO: this needs to correctly add one entry per component
    return docsList.reduce(
      (acc, docs) =>
        `${acc}
        ${propsTemplate({
          description: docs.description,
          props: sortObjectByKey(docs.props),
        })}\n`,
      '',
    );
  }
};

module.exports = reactDocgenMarkdown;
