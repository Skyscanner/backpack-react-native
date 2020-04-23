
# Reference

## Props

### `accessibilityLabel`

Text to be used by screen readers

| Type | Required |
| ---- | -------- |
| String | true | `` |

### `disabled`

| Type | Required | Default |
| ---- | -------- | ------- |
| Boolean | false | `false` |

### `innerChipStyle`

Style passed down to the inner chip.

| Type | Required | Default |
| ---- | -------- | ------- |
| style object | false | `null` |

### `label`

The chip label

| Type | Required |
| ---- | -------- |
| String | true | `` |

### `onPress`

| Type | Required |
| ---- | -------- |
| Function | true | `` |

### `selected`

| Type | Required | Default |
| ---- | -------- | ------- |
| Boolean | false | `false` |

### `style`

| Type | Required | Default |
| ---- | -------- | ------- |
| style object | false | `null` |

### `theme`

The chip theme, see available theme props.

Normally you should not provide this directly, and instead use
a `BpkThemeProvider`.

| Type | Required | Default |
| ---- | -------- | ------- |
| theme object | false | `null` |

### `type`

The chip type

| Type | Required | Default |
| ---- | -------- | ------- |
| enum(&quot;primary&quot;,&quot;outline&quot;) | false | `'primary'` |
