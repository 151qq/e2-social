<template>
    <section class="edit-box">
      <section v-html="templateBg"></section>
      <ul id="articleArea" name="content" class="list-group">
        <li class="list-group-item" v-for="(item, index) in articleList" :data-id="index"> 
            <div class="show-box" v-if="item.areaTxt.code === 'upload'">
                <div v-if="disabled">
                    <upload :path="item.areaTxt.imgUrl" :num="index" :idx="item.id" :is-btn.sync="disabled" @delImg="delImg" @changeImg="changeImg"></upload>
                </div>
                <img @click.prevent="preHandl" v-if="!disabled && item.areaTxt.imgUrl"
                        :src="item.areaTxt.imgUrl" :style="imgStyle">
                <img @click.prevent="preHandl" v-if="!disabled && !item.areaTxt.imgUrl"
                        src="../../assets/images/img-default.jpg" :style="imgStyle">
            </div>

            <div class="show-box btn-show" v-if="item.areaTxt.code === 'text'">
                <ueditor v-if="disabled" :editor-id="'editor' + index" :index="index" :content="item.content"
                        @setContent="setContent"></ueditor>
                <div v-show="!disabled && item.areaTxt.html" v-html="item.areaTxt.html"></div>
                <div v-show="!disabled && !item.areaTxt.html">编辑中的文本样式</div>
                <div class="btn-hover" v-if="disabled">
                    <el-button class="delete-btn" type="danger" :plain="true" size="small" icon="delete" @click="deleteText(index)">删除</el-button>
                </div>
            </div>

            <div class="show-box btn-show" v-if="item.areaTxt.code === 'title'">
                <input v-if="disabled && item.areaTxt.style" type="text" v-model="item.areaTxt.title"
                        @blur="titleBlur(item.areaTxt, index)" :style="item.areaTxt.style" placeholder="编辑中的内标题样式">
                <div v-if="!disabled && item.areaTxt.title" :style="item.areaTxt.style">{{item.areaTxt.title}}</div>
                <div v-if="!disabled && !item.areaTxt.title" :style="item.areaTxt.style">编辑中的内标题样式</div>
                <img v-if="!item.areaTxt.style && !disabled" class="img-default"
                        @click.prevent="setStyle(index, item.areaTxt.style)"
                        src="../../assets/images/title-default.jpg">
                <div class="btns" v-if="item.areaTxt.style && disabled">
                    <img class="del-btn" src="../../assets/images/del-icon.png" @click="deleteTitle(index)">
                    <img src="../../assets/images/pen-icon.png" @click="setStyle(index, item.areaTxt.style)">
                    <img class="del-btn" src="../../assets/images/del-icon.png" @click="resetTitle(index)">
                </div>
            </div>
        </li> 
      </ul>
      <div class="edit-btn">
          <div v-for="item in templateAdd">
                <img v-if="item.type === 'upload'" src="../../assets/images/img-btn.png" @click="addTem(item.type)">
                <img v-if="item.type === 'text'" src="../../assets/images/text-btn.png" @click="addTem(item.type)">
                <img v-if="item.type === 'title'" src="../../assets/images/title-btn.png" @click="addTem(item.type)">
                <img :class="disabled ? '' : 'active'" v-if="item.type === 'change'" src="../../assets/images/change-btn.png" @click="addTem(item.type)">
          </div>
      </div>
      <el-dialog class="style-b" title="选择内标题样式" :visible.sync="isStyle">
          <div class="style-box" v-for="(item, index) in titleLists"
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
    props: ['articleIn'],
    data () {
        return {
            articleList: [],
            disabled: true,
            templateBg: '',
            templateAdd: [],
            imgStyle: 'display: block; max-width: 100%; margin: 10px 0;',
            isStyle: false,
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
            }
        }
    },
    mounted () {
        this.getTemplate()
        this.setSortable()
    },
    watch: {
        articleIn () {
            this.articleList = this.articleIn
            this.getTemplate()
            this.disabled = true
            this.sortable.option('disabled', true)
        }
    },
    methods:{
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
            this.articleList.splice(data.index, 1)
        },
        changeImg (data) {
            var imgData = {
                id: data.id,
                areaTxt: {
                    code: 'upload',
                    imgUrl: data.url,
                    html: '<img src="' + data.url + '" style="' + this.imgStyle +'">'
                }
            }
            this.articleList.splice(data.index, 1, imgData)
        },
        setContent (data) {
            this.articleList[data.index].areaTxt.html = data.content
         
        },
        deleteText (index) {
            this.articleList.splice(index, 1)
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
            this.articleList[this.titleIndex].areaTxt.style = this.curStyle
            this.isStyle = false
        },
        closeSelect () {
            this.isStyle = false
        },
        deleteTitle (index) {
            this.articleList.splice(index, 1)
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
            this.articleList[index].areaTxt.content = '<div style="' + item.style + '">' + item.title + '</div>'
            this.articleList[index].areaTxt.style = item.style            
        },
        // 获取添加模版
        getTemplate () {
            util.request({
                method: 'get',
                interface: 'getTemplate',
                data: {
                    tplCode: localStorage.getItem("tplCode")
                }
            }).then(res => {
                this.templateBg = res.result.datas.bgTem
                this.titleLists = res.result.datas.titles
                setTimeout(() => {
                    $('.bodyMain').html($('#articleArea'))
                }, 0)
            })
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

            img {
              float: right;
              width: 16px;
              height: 16px;
              cursor: pointer;
              margin-left: 13px;

              &:hover {
                opacity: 0.8;
              }
            }
        }


        .delete-btn {
            float: right;
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