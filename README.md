# vue-quill
A vue component wrapping the quill editor

## Installation
```
npm install --save vue-quill
```

You will also need to include the following css file in your project 
```html
<link href="http://cdn.quilljs.com/latest/quill.snow.css" rel="stylesheet">
```

## Usage
Install the vue plugin
```js
Vue.use(require('vue-quill'))
```
### Component
```html
<quill :content.sync="content"></quill>
```
You may want to initialize the synced variable as a valid delta object too

```js
data() {
    return {
        content: {
            ops: [],
        },
    }
}
```

### Custom Filter
The plugin also installs a custom filter for converting a delta object to raw html

```html
{{{ content | quill }}}
```

## Options
By default, the component outputs the content as a delta object, you can pass in a prop to return raw html 
```html
<quill :content.sync="content" output="html"></quill>
```

## Custom Formats
To add custom formats to the editor, you can pass an array of formats as a prop. The array should be in the following format
```js
formats: [
    {
        name: 'custom',
        options: {
            attribute: 'custom',
        },
    },
],
```

## Custom Keybindings
You can add custom keybindings by passing through an array in the props, the array should be in the following format
```js
keyBindings: [
    {
        key: 's',
        method: function(range) {
            this.$dispatch('save', this.editor, range)
            return false        
        },
    },
]
```

## Events
This quill component dispatches events when the text or selection changes on the quill editor, you can listen for these on the parent component by declaring an event similar to this
```js
events: {
    'selection-change'(editor, range) {
        if (range) {
            if (range.start !== range.end) {
                this.selectedText = editor.getText(range.start, range.end)
                editor.formatText(range, 'custom', 'hello world')
            }
        }
    }
},
```
