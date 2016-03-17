# vue-quill
Quill component for vue

## Usage
Install the vue plugin
```
Vue.use(require('vue-quill'))
```

Then you can use the quill component and custom filter for converting delta object to raw html 
```
<quill :content.sync="content"></quill>
{{{ content | quill }}}
```

## Custom Formats
To add custom formats to the editor, you can pass an array of formats as a prop. The array should be in the following format
```
formats: [
    {
      name: 'custom',
      options: {
        attribute: 'custom',
      },
    },
],
```

## Events
This quill component dispatches an event when the selection changes on the quill editor, you can listen for this on the parent component by declaring an event similar to this
```
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
