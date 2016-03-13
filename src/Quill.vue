<template>
    <div>
        <slot name="toolbar">
            <div v-el:toolbar>
                <div class="ui icon buttons">
                    <button class="ui button active ql-bold"><i class="bold icon"></i></button>
                    <button class="ui button ql-underline"><i class="underline icon"></i></button>
                    <button class="ui button ql-italic"><i class="text width icon"></i></button>
                </div>
            </div>
        </slot>
        <div v-el:quill></div>
    </div>
</template>

<script>
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
        }
    }
</script>
