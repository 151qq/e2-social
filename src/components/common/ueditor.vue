<template>
    <div>
        <div :id="editorId" type="text/plain"></div>
    </div>
</template>
<script>
    export default {
        name: 'ueditor',
        props: {
            content: {type: String},
            editorId: {type: String},
            index: {type: Number}
        },
        data () {
            return {
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: null,
                    zIndex: 0,
                    toolbars: [[
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
                        'lineheight', '|',
                        'fontfamily', 'fontsize', '|',
                        'emotion', 'map', 'pagebreak',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 
                        'horizontal', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                        'undo', 'redo'

                    ]]
                },
                editor: null
            }
        },
        mounted() {
            const _this = this;
            this.editor = UE.getEditor(this.editorId, this.config)
            this.editor.addListener("ready", function () {
                _this.editor.setContent(_this.content!=null?_this.content:"")
            })
            this.editor.addListener("blur", function () {
                var data = {
                    content: _this.editor.getContent(),
                    index: _this.index
                }
                _this.$emit('setContent', data!=null?data:"")
            })
        },
        watch: {
            content () {
                if (this.editor) {
                    this.editor.setContent(this.content)
                }
            }
        },
        destroyed() {
            this.editor.destroy();
        }
    }
</script>
<style lang="scss">
.edui-default {
    .edui-editor-bottomContainer {
        display: none;
    }
}
</style>