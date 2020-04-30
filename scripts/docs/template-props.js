const _ = require('lodash');
const Handlebars = require('handlebars');

Handlebars.registerPartial('catchAll', '{{name}}');

// Basic prop types
Handlebars.registerPartial('func', 'Function');
Handlebars.registerPartial('array', 'Array');
Handlebars.registerPartial('object', 'Object');
Handlebars.registerPartial('string', 'String');
Handlebars.registerPartial('number', 'Number');
Handlebars.registerPartial('bool', 'Boolean');
Handlebars.registerPartial('node', 'ReactNode');
Handlebars.registerPartial('element', 'ReactElement');
// TODO: need to print a defailed version of shapes after the table
Handlebars.registerPartial('shape', 'shape');
Handlebars.registerPartial('any', '*');
Handlebars.registerPartial(
  'custom',
  `{{#if (isStyleObject raw)}}\
style object\
{{else if (isThemeObject raw)}}\
theme object\
{{else}}\
{{raw}} (custom validator)\
{{/if}}`,
);

// composed prop types
Handlebars.registerPartial(
  'arrayOf',
  '[{{> (whichPartial value) value level=level}}, ...]',
);

Handlebars.registerPartial(
  'enum',
  `enum({{#each value}}\
{{this.value}}{{#unless @last}},{{/unless}}\
{{/each}})`,
);

Handlebars.registerPartial(
  'union',
  `
(
  {{#each value}}
    {{> (whichPartial this) this level=../level}}{{#unless @last}}|{{/unless}}
  {{/each}}
)`,
);

Handlebars.registerHelper(
  'isStyleObject',
  value => value === 'ViewPropTypes.style',
);

Handlebars.registerHelper('isThemeObject', value => value === 'themePropType');

// Partial helper. Tells us which partial to use based on the "propType" name
Handlebars.registerHelper('whichPartial', type => {
  const partials = [
    'any',
    'array',
    'arrayOf',
    'bool',
    'custom',
    'element',
    'enum',
    'func',
    'node',
    'number',
    'object',
    'shape',
    'string',
    'union',
    'ViewPropTypes.style',
  ];
  return type && _.includes(partials, type.name) ? type.name : 'catchAll';
});

// math helper
Handlebars.registerHelper('addLevel', level => level + 1);

// loop helper
Handlebars.registerHelper('indent', (indentLevel, options) => {
  const content = options.fn(this);
  let lines = content.split('\n');
  let indentString = '';

  // build the indent string we need for this indent level
  for (let i = 0; i < indentLevel; i += 1) {
    indentString += '    ';
  }

  // add then indents to each line
  lines = lines.map(line => indentString + line);
  return lines.join('\n');
});

module.exports = Handlebars.compile(`\
{{#each props}}\

### \`{{@key}}\`\

{{#if this.description}}

{{{this.description}}}
{{/if}}

| Type | Required | {{#if this.defaultValue}}Default |{{/if}}
| ---- | -------- | {{#if this.defaultValue}}------- |{{/if}}
| {{> (whichPartial this.type) this.type level=0}} | {{ this.required }} | \`{{#if this.defaultValue}}{{{this.defaultValue.value}}}{{/if}}\` |

{{/each}}
`);
