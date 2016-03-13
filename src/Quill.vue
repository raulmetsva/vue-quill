<template>
    <div>
        <slot name="toolbar">
            <div v-el:toolbar>
                <button class="ql-bold">B</button>
                <button class="ql-underline">U</button>
                <button class="ql-italic">I</button>
            </div>
        </slot>
        <div v-el:quill></div>
    </div>
</template>

<script>
    export default {
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
        }
    }
</script>
