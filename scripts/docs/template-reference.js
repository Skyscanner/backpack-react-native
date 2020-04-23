const Handlebars = require('handlebars');

module.exports = Handlebars.compile(`
# Reference

{{#if props}}\
## Props

{{{props}}}\
{{/if}}\

{{#if api}}\
## Api

{{{api}}}\
{{/if}}\
`);
