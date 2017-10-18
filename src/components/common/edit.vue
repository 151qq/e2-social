<template>
    <section class="edit-box">
        <section class='bodyMain'>
            <ul id="articleArea" name="content" class="list-group">
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
                        <div class="btn-hover" v-if="disabled">
                            <el-button class="delete-btn" type="primary"
                                    :plain="true" size="small" icon="document"
                                    @click="saveData('title', index)">保存</el-button>
                            <el-button class="delete-btn" type="danger"
                                    :plain="true" size="small" icon="delete"
                                    @click="deleteArticleArea(item.id, index)">删除</el-button>
                            <el-button class="delete-btn" type="danger"
                                    :plain="true" size="small" icon="setting"
                                    @click="setStyle(index, item.style)">配置</el-button>
                        </div>
                    </div>
                </li> 
            </ul>
        </section>
        <div class="edit-btn">
            <div @click="addTem('upload')">
                <img class="gray-box" src="../../assets/images/add-img-icon.png">
                <img class="now-box" src="../../assets/images/img-now.png">
            </div>
            <div @click="addTem('text')">
                <img class="gray-box" src="../../assets/images/add-text-icon.png">
                <img class="now-box" src="../../assets/images/text-now.png">
            </div>
            <div class="title-box" @click="addTem('title')">
                <img class="gray-box" src="../../assets/images/add-title-icon.png">
                <img class="now-box" src="../../assets/images/title-now.png">
            </div>
            <div @click="addTem('change')">
                <img v-if="disabled" class="gray-box" src="../../assets/images/change-model-icon.png">
                <img v-if="disabled" class="now-box" src="../../assets/images/change-now.png">
                <img v-if="!disabled" src="../../assets/images/change-now.png">
            </div>
            <div class="save-box" @click="saveAll">
                <img class="gray-box" src="../../assets/images/save-all-data.png">
                <img class="now-box" src="../../assets/images/save-now.png">
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
    props: ['isSave'],
    data () {
        return {
            articleList: [],
            disabled: true,
            backgroundImg: '#f0f0f0;',
            templateAdd: [],
            imgStyle: 'display: block; max-width: 100%; margin: 10px 0;',
            isStyle: false,
            curTemIndex: '',
            curIndex: '',
            curStyle: '',
            titleIndex: '',
            titleLists: [
                {
                    imgUrl: "/static/images/title-default.jpg",
                    style: "display: block; width: 100%; padding: 3px 0; border: none; font-size: 16px; color: #000000; line-height: 30px; border-bottom: 1px solid #46A8E0;"
                },
                {
                    imgUrl: "/static/images/title-default.jpg",
                    style: "display: block; width: 100%; padding: 3px 0; border: none; text-align: center; font-size: 16px; color: #000000; line-height: 30px; border-bottom: 1px solid #46A8E0;"
                },
                {
                    imgUrl: "/static/images/title-default.jpg",
                    style: "display: block; width: 100%; padding: 3px 0; border: none; text-align: right; font-size: 16px; color: #000000; line-height: 30px; border-bottom: 1px solid #46A8E0;"
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
            selectTemplate: {},
            articleId: '',
            html5PageCode: ''
        }
    },
    methods:{
        editInte (data) {
            var templateStr = ''
            var arrData = []
            data.article.forEach((item) => {
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
                }
            })
            this.articleList = arrData
            this.backgroundImg = data.bgImg ? 'url(' + data.bgImg + ') center top no-repeat' : '#f0f0f0'
            setTimeout(() => {
                this.setSortable()
                $('.bodyMain').css('background', this.backgroundImg)
            }, 0)
            this.disabled = true
            if (this.sortable) {
                this.sortable.option('disabled', true)
            }
        },
        saveArticle (data) {
            var formData = {
                type: this.$route.name,
                areaTxt: '',
                html5TemplateCode: 'tpl_0003'
            }

            if (data) {
                if (data.title) {
                    formData.html5PageTitle = data.title
                }
                if (data.investor) {
                    formData.editorCode = data.investor
                }
                if (data.pageImg) {
                    formData.html5PageindexImg = data.pageImg
                }
                if (data.html5PageCode) {
                    formData.html5PageCode = data.html5PageCode
                }
                formData.id = data.id
                formData.html5CatalogCode = data.html5CatalogCode
            }


            
            util.request({
                method: 'post',
                interface: 'draftArticle',
                data: formData
            }).then(res => {
                var resData = res.result.result

                if (resData.backgroundImg && !this.articleId) {
                    this.backgroundImg = 'url(' + resData.backgroundImg + ') center top no-repeat'
                    $('.bodyMain').css('background', this.backgroundImg)
                }

                this.html5TemplateCode = resData.html5TemplateCode
                this.html5PageCode = resData.html5PageCode
                this.articleId = resData.id

                if (data.state) {
                    this.$parent.$parent.$parent.$parent.$refs.listBox.reloadList(this.html5PageCode)
                }
            })
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
        saveAll () {
            this.articleList.forEach((item, index) => {
                this.saveData(item.type, index)
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
                        style: this.titleLists[0].style
                    }
                    this.articleList.push(data)
                    this.selectStyle(0)
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

    .bodyMain {
        padding: 30px 20px 20px;
        background-size: 100% auto;
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
        margin-bottom: 10px;
        overflow: hidden;

        .img-default {
            display: block;
            width: 640px;
            margin: auto;
        }
    }

    .btn-show {
        .btn-hover {
            display: block;
            overflow: hidden;
            margin-top: 10px;
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
            width: 48px;
            height: 48px;
            overflow: hidden;
            margin-top: 10px;
            border-radius: 5px;
            cursor: pointer;

            img {
                display: block;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid #ffffff;
            }

            .now-box {
                display: none;
            }

            &:hover {
                .gray-box {
                    display: none;
                }

                .now-box {
                    display: block;
                }
            }
        }

        .title-box {
            width: 54px;
            height: 54px;
            margin-left: -3px;
        }

        .save-box {
            width: 42px;
            height: 42px;
            margin-left: 3px;
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