<template>
    <div></div>
</template>

<script>
    export default {
        data() {
            return {
                editor: {},
            }
        },

        ready() {
            this.editor = new Quill(this.$el, {
                theme: 'snow',
            })
        }
    }
</script>
