<template>
    <div>
        <slot name="toolbar">
            <div v-el:toolbar class="ui top attached menu toolbar ql-toolbar ql-snow">
                <div class="ql-format-group">
                    <a class="ql-format-button ql-bold"></a>
                    <span class="ql-format-separator"></span>
                    <a class="ql-format-button ql-underline"></a>
                    <span class="ql-format-separator"></span>
                    <a class="ql-format-button ql-italic"></a>
                </div>
                <div class="ql-format-group">
                    <a class="ql-format-button ql-list"></a>
                    <span class="ql-format-separator"></span>
                    <a class="ql-format-button ql-bullet"></a>
                    <span class="ql-format-separator"></span>
                    <span title="Text Alignment" class="ql-align ql-picker">
                        <span class="ql-picker-label" data-value="left"></span>
                        <span class="ql-picker-options">
                            <span data-value="left" class="ql-picker-item ql-selected"></span>
                            <span data-value="center" class="ql-picker-item"></span>
                            <span data-value="right" class="ql-picker-item"></span>
                            <span data-value="justify" class="ql-picker-item"></span>
                        </span>
                    </span>
                </div>
            </div>
        </slot>
        <div class="ui attached segment" v-el:quill></div>
    </div>
</template>

<script>
    const Quill = require('quill')
    export default {
        props: {
            content: {},
        },

        data() {
            return {
                editor: {},
            }
        },

        ready() {
            this.editor = new Quill(this.$els.quill, {
                modules: { toolbar: this.$els.toolbar },
                theme: 'snow',
            })

            this.editor.on('text-change', (delta, source) => {
                this.content = this.editor.getContents()
            })
        },

        events: {
            setContent(content) {
                this.editor.setContents(content)
            },

            setHtml(html) {
                this.editor.setHtml(html)
            },

            focusEditor() {
                this.editor.focus()
            }
        },
    }
</script>
