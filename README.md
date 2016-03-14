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
