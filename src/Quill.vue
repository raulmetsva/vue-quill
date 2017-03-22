<template>
    <div>
        <div class="ui attached segment" v-el:quill @click.prevent="focusEditor"></div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import Quill from 'quill'
    import GrammarlyInline from './formats/GrammarlyInline'

    export default {
        props: {
            content: {},

            formats: {
                type: Array,
                default() {
                    return []
                },
            },

            keyBindings: {
                type: Array,
                default() {
                    return []
                },
            },

            output: {
                default : 'delta'
            },

            config: {
                default() {
                    return {}
                },
            },
        },

        data() {
            return {
                editor: {},
                defaultConfig: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline'],
                            [
                               { 'list': 'ordered' }, { 'list': 'bullet' }
                            ],
                            [{ 'align': [] }],
                        ],
                    },
                    theme: 'snow',
                },
            }
        },

        ready() {
            if (this.keyBindings.length) {
                this.defaultConfig.modules.keyboard = {
                    bindings: this.keyBindings.map((binding) => {
                        if (binding.remove) return false
                        return {
                            key: binding.key,
                            metaKey: true,
                            handler: binding.method.bind(this),
                        }
                    })
                }
            }

            Quill.register(GrammarlyInline)

            this.editor = new Quill(this.$els.quill, _.defaultsDeep(this.config, this.defaultConfig))

            if (this.content && this.content !== '') {
	            if (this.output != 'delta') {
	                this.editor.pasteHTML(this.content)
	            } else {
	                this.editor.setContents(this.content)
	            }
            }

            this.editor.on('text-change', (delta, source) => {
                this.$dispatch('text-change', this.editor, delta, source)
                this.content = this.output != 'delta' ? this.editor.root.innerHTML : this.editor.getContents()
            })

            this.editor.on('selection-change', (range) => {
                this.$dispatch('selection-change', this.editor, range)
            })
        },

        events: {
            'set-content': function (content) {
                this.editor.setContents(content)
            },

            'set-html': function (html) {
            	if (!html || html === '') return;
                	this.editor.setHTML(html)
            },

            'focus-editor': function () {
                this.focusEditor()
            }
        },

        methods: {
            focusEditor(e) {
                if (e && e.srcElement) {
                    let classList = e.srcElement.classList, isSegment = false;

                    classList.forEach((className) => {
                        if (className === 'segment') {
                            isSegment = true
                            return
                        }
                    })

                    if (!isSegment) return;
                }

                this.editor.focus()
                this.editor.setSelection(this.editor.getLength()-1, this.editor.getLength())
            },
        },
    }
</script>
