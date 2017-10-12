<template>
    <section class="edit-box">
        <section class="select-template"
                v-if="!hasTemplate"
                @click="showTemplate">
            +请选择模版
        </section>
        <section v-if="hasTemplate" v-html="templateBg"></section>
        <ul v-if="hasTemplate" id="articleArea" name="content" class="list-group">
            <li class="list-group-item"
                    v-for="(item, index) in articleList"
                    :data-id="index"> 
                <div class="show-box" v-if="item.type === 'upload'">
                    <div v-if="disabled">
                        <upload 
                            :path="item.imgUrl"
                            :num="index" 
                            :idx="item.id"
                            :is-btn.sync="disabled"
                            @delImg="delImg"
                            @changeImg="changeImg" 
                            @saveImg="saveData('upload', index)"></upload>
                    </div>
                    <img @click.prevent="preHandl"
                            v-if="!disabled && item.imgUrl"
                            :src="item.imgUrl"
                            :style="imgStyle">
                    <img @click.prevent="preHandl"
                            v-if="!disabled && !item.imgUrl"
                            src="../../assets/images/img-default.jpg"
                            :style="imgStyle">
                </div>

                <div class="show-box btn-show" v-if="item.type === 'text'">
                    <ueditor v-if="disabled"
                            :editor-id="'editor' + index"
                            :index="index"
                            :content="item.content"
                            @setContent="setContent"
                            vef="editorForm"></ueditor>
                    <div v-show="!disabled && item.content"
                            v-html="item.content"></div>
                    <div v-show="!disabled && !item.content">编辑中的文本样式</div>
                    <div class="btn-hover" v-if="disabled">
                        <el-button class="delete-btn" type="primary"
                                :plain="true" size="small" icon="document"
                                @click="saveData('text', index)">保存</el-button>
                        <el-button class="delete-btn" type="danger"
                                :plain="true" size="small" icon="delete"
                                @click="deleteArticleArea(item.id, index)">删除</el-button>
                    </div>
                </div>

                <div class="show-box btn-show" v-if="item.type === 'title'">
                    <input v-if="disabled && item.style"
                            type="text"
                            v-model="item.title"
                            @blur="titleBlur(item, index)"
                            :style="item.style"
                            placeholder="编辑中的内标题样式">
                    <div v-if="!disabled && item.title"
                            :style="item.style">{{item.title}}</div>
                    <div v-if="!disabled && !item.title"
                            :style="item.style">编辑中的内标题样式</div>
                    <img v-if="!item.style && disabled"
                            class="img-default"
                            @click.prevent="setStyle(index, item.style)"
                            src="../../assets/images/title-default.jpg">
                    <div class="btns" v-if="disabled">
                        <i class="del-btn el-icon-close" @click="resetTitle(index)"></i>
                        <i class="del-btn el-icon-document" @click="saveData('title', index)"></i>
                        <i class="del-btn el-icon-delete2" @click="deleteArticleArea(item.id, index)"></i>
                        <i class="del-btn el-icon-setting" @click="setStyle(index, item.style)"></i>
                    </div>
                </div>
            </li> 
        </ul>
        <div v-if="hasTemplate" class="edit-btn">
            <div v-for="item in templateAdd">
                <img v-if="item.type === 'upload'"
                        src="../../assets/images/img-btn.png"
                        @click="addTem(item.type)">
                <img v-if="item.type === 'text'"
                        src="../../assets/images/text-btn.png"
                        @click="addTem(item.type)">
                <img v-if="item.type === 'title'"
                        src="../../assets/images/title-btn.png"
                        @click="addTem(item.type)">
                <img :class="disabled ? '' : 'active'"
                        v-if="item.type === 'change'"
                        src="../../assets/images/change-btn.png"
                        @click="addTem(item.type)">
              </div>
        </div>
        <el-dialog class="style-b" title="选择内标题样式" :visible.sync="isStyle">
            <div class="style-box"
                    v-for="(item, index) in titleLists"
                    @click="selectStyle(index)"
                    :class="index === curIndex ? 'active' : ''">
                <img :src="item.imgUrl">
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeSelect">取 消</el-button>
                <el-button type="primary" @click="confirmSelect">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog class="template-b" title="选择模版"
                :visible.sync="isTemplate"
                v-if="$route.params.type !== 'edit'">
            <div class="template-outer">
                <div class="templateList-box"
                        v-for="(item, index) in templateList"
                        @click="curTemIndex = index"
                        :class="index === curTemIndex ? 'active' : ''">
                    <img :src="item.microimg">
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeTemplate">取 消</el-button>
                <el-button type="primary" @click="confirmTemplate">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import draggable from 'vuedraggable'
import util from '../../assets/common/util'
import upload from '../../components/common/upload'
import ueditor from '../../components/common/ueditor'
import $ from 'Jquery'
import sortable from 'sortablejs'

export default {
    props: ['articleIn', 'pageTitle'],
    data () {
        return {
            articleList: [],
            disabled: true,
            templateBg: '',
            templateAdd: [],
            imgStyle: 'display: block; max-width: 100%; margin: 10px 0;',
            isStyle: false,
            isTemplate: false,
            hasTemplate: false,
            curTemIndex: '',
            curIndex: '',
            curStyle: '',
            titleIndex: '',
            titleLists: [],
            templateAdd: [
                {
                    type: "upload"
                },
                {
                    type: "text"
                },
                {
                    type: "title"
                },
                {
                    type: "change"
                }
            ],
            config: {
                initialFrameWidth: null,
                initialFrameHeight: null,
                zIndex: 0,
                toolbars: [[
                    'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'fontfamily', 'fontsize', '|',
                    'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'emotion', 'map', 'pagebreak', '|',
                    'horizontal', 'date', 'time', 'spechars', '|',
                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts'

                ]]
            },
            templateList: [],
            selectTemplate: {}
        }
    },
    mounted () {
        if (this.$route.params.type === 'edit') {
            this.hasTemplate = true
            this.setSortable()
        } else {
            this.getTemplateList()
            this.articleId = '' 
        }
    },
    watch: {
        articleIn () {
            var templateStr = ''
            var arrData = []
            this.articleIn.forEach((item) => {
                if (item.sequence >= 20) {
                    switch (item.areaType) {
                        case 'upload':
                            var data = {
                                type: 'upload',
                                imgUrl: $(item.areaTxt).attr('src'),
                                content: item.areaTxt,
                                fileCode: item.fileCode,
                                id: item.id
                            }
                            console.log($(item.areaTxt), '$')
                            arrData.push(data)
                            break
                        case 'text':
                            var data = {
                                type: 'text',
                                content: item.areaTxt,
                                fileCode: item.fileCode,
                                id: item.id
                            }
                            arrData.push(data)
                            break
                        case 'title':
                            var data = {
                                type: 'title',
                                title: $(item.areaTxt).text(),
                                style: $(item.areaTxt).attr('style'),
                                content: item.areaTxt,
                                fileCode: item.fileCode,
                                id: item.id
                            }
                            arrData.push(data)
                            break
                    }
                } else {
                    templateStr += item.areaTxt
                }
            })
            this.articleList = arrData
            this.templateBg = templateStr
            setTimeout(() => {
                $('.bodyMain').html($('#articleArea'))
                this.setSortable()
            }, 0)
            this.disabled = true
            if (this.sortable) {
                this.sortable.option('disabled', true)
            }
        }
    },
    methods:{
        // // 获取添加模版
        // getTemplate () {
        //     util.request({
        //         method: 'get',
        //         interface: 'getTemplate',
        //         data: {
        //             tplCode: localStorage.getItem("tplCode")
        //         }
        //     }).then(res => {
        //         this.templateBg = res.result.datas.bgTem
        //         this.titleLists = res.result.datas.titles
        //         setTimeout(() => {
        //             $('.bodyMain').html($('#articleArea'))
        //         }, 0)
        //     })
        // },
        // 获取模版列表
        getTemplateList () {
            util.request({
                method: 'get',
                interface: 'templateList',
                data: {
                    unitcode: '0001'
                }
            }).then(res => {
                this.templateList = res.result.result
                console.log(this.templateList, 'templateList')
            })
        },
        saveArticle (code) {
            var formData = {
                id: this.articleId,
                type: this.$route.name,
                areaTxt: '',
                html5TemplateCode: code,
                html5CatalogCode: this.$route.params.type
            }

            if (this.pageTitle) {
                formData.html5PageTitle = this.pageTitle
            }
            
            util.request({
                method: 'post',
                interface: 'draftArticle',
                data: formData
            }).then(res => {
                this.html5TemplateCode = res.result.result.html5TemplateCode
                this.html5PageCode = res.result.result.html5PageCode
                this.articleId = res.result.result.id
            })
        },
        getTemplateBytplCode (code) {
            util.request({
                method: 'get',
                interface: 'getTemplateBytplCode',
                data: {
                    tplCode: code
                }
            }).then(res => {
                var templateStr = ''
                res.result.result.areaList.forEach((item) => {
                    templateStr += item.areaTxt
                })
                this.templateBg = templateStr
                this.hasTemplate = true
                this.isTemplate = false
                setTimeout(() => {
                    $('.bodyMain').html($('#articleArea'))
                    this.setSortable()
                }, 0)
            })
        },
        showTemplate () {
            if (!this.pageTitle) {
                this.$message.error('请先填写报告标题！')
                return false
            }
            this.saveTemBg = this.templateBg
            this.isTemplate = true
        },
        closeTemplate () {
            this.templateBg = this.saveTemBg
            this.isTemplate = false
        },
        confirmTemplate () {
            var temData = this.templateList[this.curTemIndex]
            this.saveArticle(temData.tplCode)
            this.getTemplateBytplCode(temData.tplCode)
            
        },
        saveData (type, index) {
            util.request({
                method: 'post',
                interface: 'saveArticleArea',
                data: {
                    areaType: type,
                    html5TemplateCode: this.html5TemplateCode,
                    areaTxt: this.articleList[index].content,
                    fileCode: this.html5PageCode ? this.html5PageCode : localStorage.getItem("id"),
                    id: this.articleList[index].id ? this.articleList[index].id : '',
                    sequence: index + 20
                }
            }).then(res => {
                this.articleList[index].id = res.result.result
            })
        },
        setSortable () {
            var _this = this

            var articleArea = document.getElementById('articleArea')
            this.sortable = sortable.create(articleArea, {
                handle: ".list-group-item",
                animation: 100,
                group: {name: "articleArea", pull: false, put: false},
                filter: '.filter',
                sort: true,
                disabled: true,
                onUpdate ({oldIndex, newIndex}) {
                    let preData = _this.articleList[newIndex]
                    _this.articleList[newIndex] = _this.articleList[oldIndex]
                    _this.articleList[oldIndex] = preData
                    console.log(_this.articleList, 'ls')
                }
            })
        },
        addTem (type) {
            switch (type) {
                case 'upload':
                    this.disabled = true
                    this.sortable.option('disabled', true)
                    var data = {
                        type: 'upload',
                        imgUrl: '',
                        content: ''
                    }
                    this.articleList.push(data)
                    break
                case 'text':
                    this.disabled = true
                    this.sortable.option('disabled', true)
                    var data = {
                        type: 'text',
                        content: ''
                    }
                    this.articleList.push(data)
                    break
                case 'title':
                    this.disabled = true
                    this.sortable.option('disabled', true)
                    var data = {
                        type: 'title',
                        title: '',
                        content: '',
                        style: ''
                    }
                    this.articleList.push(data)
                    break
                case 'change':
                    this.sortable.option('disabled', !this.sortable.option('disabled'))
                    this.disabled = !this.disabled
                    
                    if (this.sortable.option('disabled')) {
                        this.articleSave = this.articleList.concat([])
                        this.articleList = []
                        setTimeout(() => {
                            this.articleList = this.articleSave
                        }, 0)
                    }
                    break
            }
        },
        delImg (data) {
            this.deleteArticleArea(this.articleList[data.index].id, data.index)
        },
        changeImg (data) {
            var imgData = {
                id: data.id,
                type: 'upload',
                imgUrl: data.url,
                content: '<img src="' + data.url + '" style="' + this.imgStyle +'">'
            }
            this.articleList.splice(data.index, 1, imgData)
        },
        setContent (data) {
            this.articleList[data.index].content = data.content
        },
        setStyle (index, style) {
            this.isStyle = true
            this.titleIndex = index
            // 初始选中style
            if (style) {
                for (var i = 0, length = this.titleLists.length; i < length; i++) {
                    if (this.titleLists[i].style === style) {
                        this.curIndex = i
                        this.curStyle = style
                        break
                    }
                }
            } else {
                this.curIndex = ''
                this.curStyle = ''
            }
        },
        selectStyle (index) {
            this.curIndex = index
            this.curStyle = this.titleLists[index].style
        },
        confirmSelect () {
            this.articleList[this.titleIndex].style = this.curStyle
            this.isStyle = false
        },
        closeSelect () {
            this.isStyle = false
        },
        deleteArticleArea (id, index) {
            if (id) {
                util.request({
                    method: 'post',
                    interface: 'deleteArticleArea',
                    data: {
                        id: id
                    }
                }).then(res => {
                    this.articleList.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
            } else {
                this.articleList.splice(index, 1)
            }
        },
        resetTitle (index) {
            var data = {
                type: 'title',
                title: '',
                content: '',
                style: ''
            }
            this.articleList.splice(index, 1, data)
        },
        titleBlur (item, index) {
            this.articleList[index].content = '<div style="' + item.style + '">' + item.title + '</div>'
            this.articleList[index].style = item.style            
        },
        preHandl () {}
    },
    components: {
        draggable,
        upload,
        ueditor
    }
}
</script>
<style lang="scss">
.edit-box {
    position: relative;
    min-height: 300px;

    .template-b {

        .el-dialog--small {
            width: 640px;
        }

        .template-outer {
            max-height: 400px;
            overflow: auto;
        }

        .templateList-box {
            width: 500px;
            margin: 0 auto 15px;

            img {
                display: block;
                width: 100%;
            }
            &.active {
                border: 1px solid #FF4949;
                border-radius: 3px;
            }
        }
    }

    .select-template {
        background: #f0f0f0;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        line-height: 350px;
        color: #999999;
        cursor: pointer;
    }

    #articleArea {
        min-height: 300px;
    }

    .show-box {
        cursor: pointer;
        margin-bottom: 30px;

        .img-default {
            display: block;
            width: 640px;
            margin: auto;
        }
    }

    .btn-show {
        .btn-hover {
            background: #EFF2F7;
            display: block;
            overflow: hidden;
            padding: 12px;
        }

        .btns {
            background: #EFF2F7;
            display: block;
            padding: 12px;
            overflow: hidden;

            .del-btn {
              float: right;
              width: 16px;
              height: 16px;
              cursor: pointer;
              margin-left: 9px;

              &:hover {
                opacity: 0.8;
              }
            }
        }


        .delete-btn {
            float: right;
            margin-left: 10px;
        }
    }

    .edit-btn {
        position: absolute;
        width: 100px;
        right: -110px;
        bottom: 0;

        div {
            width: 100px;
            height: 60px;
            overflow: hidden;
            margin-top: 10px;
            border-radius: 5px;
            cursor: pointer;

            img {
                display: block;
                width: 100px;
                height: 60px;
                box-sizing: border-box;
                border: 1px solid #ffffff;

                &.active {
                    border: 1px solid #FF4949;
                }
            }
        }
    }
}

.style-b {
    min-height: 360px;
}

.style-box {
    margin-bottom: 15px;
    padding: 3px;

    img {
        display: block;
        width: 100%;
    }

    &.active {
        border: 1px solid #FF4949;
        border-radius: 3px;
    }
}
</style>