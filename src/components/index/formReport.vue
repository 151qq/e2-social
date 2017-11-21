<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="formStyleR" title="基础信息" name="0">
            <section class="baseInput bigB">
                <span>报告标题</span>
                <el-input
                        :maxlength="25"
                        class="input-box"
                        placeholder="请输入内容"
                        v-model="title">
                </el-input>
                <div class="abstract-num">剩余<span>{{titleNum}}</span>个字</div>
            </section>
            <section class="baseInput">
                <span>投资顾问</span>
                <el-select class="input-box" v-model="investor" placeholder="请选择">
                    <el-option
                    v-for="item in investors"
                    :key="item.id"
                    :label="item.userLoginName"
                    :value="item.userCode">
                  </el-option>
                </el-select>
            </section>
            <section class="baseInput rightF">
                <span>创作时间</span>
                <el-input
                        class="input-box"
                        placeholder="请输入内容"
                        v-model="createTime"
                        :disabled="true">
                </el-input>
            </section>

            <section class="baseInput bigB">
                <span>报告摘要</span>
                <el-input
                  type="textarea"
                  :rows="4"
                  :maxlength="70"
                  placeholder="请输入内容"
                  v-model="abstract">
                </el-input>
                <div class="abstract-num">剩余<span>{{abstractNum}}</span>个字</div>
            </section>

            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                @click="saveForm">保存</el-button>
            <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyleR" title="报告封面" name="1">
            <upload :path="coverImg"
                :no-del="true"
                :bg-path="true"
                :is-btn="true"
                :id-name="'report-big-img'"
                @changeImg="changeImg"
                @saveImg="saveForm"></upload>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyleR" title="报告详情" name="2">
            <edit-box :article-in="articleinfo" ref="articleForm"></edit-box>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyleR" title="推荐文章" name="3">
            <el-button class="add-b" type="primary" size="small" icon="plus" @click="addReport">增加</el-button>
            <div v-for="(item, index) in reportSelect"
                v-if="reportSelect.length"
                :key="index"
                class="report-box">
                <img class="report-i" :src="item.html5PageindexImg">
                <div class="content-b">
                  <p class="title">{{item.html5PageTitle}}</p>
                </div>
                <el-button class="delete-b"
                            type="danger"
                            :plain="true"
                            size="small"
                            icon="delete"
                            @click="deleteReport(index)">删除</el-button>
            </div>
            <div v-if="!reportSelect.length"
                  class="null-box">
              还没有推荐文章，请点击增加按钮添加！
            </div>
            <div class="clear"></div>
            <el-button class="save-btn"
                        v-if="reportSelect.length"
                        type="info"
                        :plain="true"
                        size="small"
                        icon="document"
                        @click="setArticles">保存</el-button>
            <div class="clear"></div>
          </el-collapse-item>
        </el-collapse>

        <el-dialog class="report-m" title="选择文章" :visible.sync="dialogVisible">
          <div class="articles-box" v-for="(item, index) in reportList"
              @click="changeReport(index)"
              :class="item.isSelected ? 'active' : ''">
            <img class="report-i" :src="item.html5PageindexImg">
            <div class="content-b">
              <div class="title">{{item.html5PageTitle}}</div>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            @current-change="changePage"
            :total="total">
          </el-pagination>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeSelect">取 消</el-button>
            <el-button type="primary" @click="confirmSelect">确 定</el-button>
          </div>
        </el-dialog>

        <add-report :is-add="isAdd"
                @addReports="addNewReport"
                ref="addReports"></add-report>
    </div>
</template>
<script>
import util from '../../assets/common/util'
import editBox from '../../components/common/edit'
import upload from '../../components/common/upload'
import addReport from './addReport'
import $ from 'Jquery'

export default {
    props: ['listInfo', 'articleInfo'],
    data () {
        return {
            title: '',
            investor: '',
            abstract: '',
            createTime: '',
            articles: [],
            pageSize: 2,
            pageNumber: 1,
            total: 0,
            reportSelect: [],
            reportList: [],
            investors: [],
            activeNames: ['1'],
            dialogVisible: false,
            articleinfo: [],
            coverImg: '',
            articleId: '',
            isAdd: {
              value: false
            },
            abstractNum: 70,
            titleNum: 25,
            reportAllList: []
        }
    },
    mounted () {
        this.type = this.$route.params.type
        if (this.type === 'edit') {
            var reportColl = localStorage.getItem("reportColl")
            if (reportColl) {
                this.activeNames = reportColl.split(',')
            }
        }

        document.title = '报告维护'
    },
    watch: {
      abstract () {
        this.abstractNum = 70 - this.abstract.length
      },
      title () {
        this.titleNum = 25 - this.title.length
      }
    },
    methods: {
        getAllData () {
          this.getArticle()
          this.getInvestors()

          this.pageNumber = 1

          if (this.timer) {
              clearInterval(this.timer)
          }

          // this.timer = setInterval(() => {
          //     this.saveAll()
          // }, 180000)
        },
        getArticle () {
          util.request({
              method: 'get',
              interface: 'findArticleByFileCode',
              data: {
                fileCode: localStorage.getItem("id")
              }
          }).then(res => {
              var resData = res.result.result
              this.articleinfo = resData.fileAreaList ? resData.fileAreaList : []
              this.title = resData.html5PageTitle
              this.articleId = resData.id
              this.investor = resData.editorCode
              this.coverImg = resData.html5PageindexImg
              this.createTime = res.result.responsetime.split(' ')[0]
              this.abstract = resData.html5Summary

              this.getSelectList()
              this.getReportList()

              var data = {
                article: this.articleinfo,
                bgImg: resData.backgroundImg
              }

              this.$refs.articleForm.editInte(data)
          })
        },
        changeImg (data) {
          this.coverImg = data.url
        },
        checkTitle () {
          if (this.title.length > 25) {
            this.$message({
              message: '最多只能输入25个字符',
              type: 'warning'
            })
            this.title = this.title.substring(0, 25)
          }
        },
        collChange () {
            localStorage.setItem("reportColl", this.activeNames)
        },
        // saveData (type, index) {
        //     var formData = {
        //       id: localStorage.getItem("id"),
        //       type: type,
        //       data: this[type],
        //     }

        //     if (index !== undefined) {
        //       formData.index = index
        //     }

        //     util.request({
        //         method: 'post',
        //         interface: 'savereport',
        //         data: formData
        //     }).then(res => {
        //         console.log(res)
        //     })
        // },
        setArticles () {
          var formData = {
            articleCode: localStorage.getItem("id"),
            recommend: this.articles.join(',')
          }

          util.request({
              method: 'post',
              interface: 'setArticles',
              data: formData
          }).then(res => {
              console.log(res)
          })
        },
        saveForm () {
          var obj = {
            title: this.title,
            investor: this.investor,
            abstract: this.abstract,
            pageImg: this.coverImg,
            id: this.articleId,
            html5CatalogCode: localStorage.getItem('dirCode'),
            html5PageCode: localStorage.getItem('id')
          }

          this.$refs.articleForm.saveArticle(obj)
        },
        saveAll () {
          this.saveForm()
          this.$refs.articleForm.saveAll()
          this.setArticles()
        }, 
        showAdd () {
          this.$refs.addReports.initData()
          this.isAdd.value = true
        },
        addNewReport (data) {
          this.title = data.title
          this.coverImg = data.coverImg
          var obj = {
            title: this.title,
            pageImg: data.coverImg,
            id: '',
            html5CatalogCode: localStorage.getItem('houseMall')
          }
          this.$refs.articleForm.saveArticle(obj)
          this.isAdd.value = false
        },
        getInvestors () {
            util.request({
                method: 'get',
                interface: 'getInvestors',
                data: {
                    roleCode: 'entadconsultant'
                }
            }).then(res => {
                this.investors = res.result.result
            })
        },
        getSelectList () {
          var formD = {
            fileCode: localStorage.getItem("id")
          }

          util.request({
              method: 'get',
              interface: 'findRecommendArticleByCode',
              data: formD
          }).then(res => {
              this.reportSelect = res.result.result

              this.reportSelect.forEach((item) => {
                this.articles.push(item.html5PageCode)
              })
          })
        },
        getReportList () {
            util.request({
                method: 'get',
                interface: 'findRecommendArticleByCode',
                data: {
                  self: this.articleId
                }
            }).then(res => {
                this.reportAllList = res.result.result
                this.total = this.reportAllList.length
                this.resetReport()
                this.getPageReport()
            })
        },
        getPageReport () {
          var startL = this.pageSize * (this.pageNumber - 1)
          var stopL = this.pageSize * this.pageNumber
          this.reportList = this.reportAllList.slice(startL, stopL)
        },
        deleteReport (index) {
          if (!this.articles.length) {
            return false
          }
          this.articles.splice(index, 1)
          this.reportSelect.splice(index, 1)
          this.resetReport()
        },
        resetReport () {
          // 存储选择状态
          this.selListInit = []

          this.reportAllList.forEach((item) => {
            var index = this.articles.indexOf(String(item.html5PageCode))
            // 存储选择状态
            this.selListInit.push(index > -1)

            if (index > -1) {
              item.isSelected = true
            } else {
              item.isSelected = false
            }
          })
          this.reportAllList = this.reportAllList.concat([])
        },
        changeReport (index) {
          let item = this.reportList[index]
          item.isSelected = !item.isSelected
          this.reportList = this.reportList.concat([])
        },
        addReport () {
          this.dialogVisible = true
        },
        closeSelect () {
          this.reportAllList.forEach((item, index) => {
            item.isSelected = this.selListInit[index]
          })
          this.dialogVisible = false
          this.reportAllList = this.reportAllList.concat([])
        },
        confirmSelect () {
          // 存储选择状态
          this.selListInit = []
          var selects = this.articles.concat([])
          this.reportAllList.forEach((item, num) => {
            var index = selects.indexOf(item.html5PageCode)
            // 存储选择状态
            this.selListInit.push(item.isSelected)

            if (index > -1 && !item.isSelected) {
              // 删除
              selects.splice(index, 1)
              this.reportSelect.splice(index, 1)
            } if (index < 0 && item.isSelected) {
              // 添加
              selects.push(item.html5PageCode)
              this.reportSelect.push(item)
            }
          })
          this.articles = selects.concat([])
          this.dialogVisible = false
        },
        changePage (size) {
          this.pageNumber = size
          this.getPageReport()
        }
    },
    destroyed() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    },
    components: {
      editBox,
      upload,
      addReport
    }
}
</script>
<style lang="scss">
.report-m {
  .el-dialog--small {
    width: 490px;
    padding-left: 5px;
  }
}

.form-b {
    margin-top: 30px;
}

.formStyleR {
    position: relative;
    width: 640px;
    margin: 0 auto;

    .edui-default .edui-editor {
        border-color: #bfcbd9;
    }

    .edui-editor-iframeholder {
        min-height: 150px;
    }

    .null-box {
      font-size: 20px;
      color: #333333;
      line-height: 200px;
      text-align: center;
    }

    .baseInput {
        float: left;
        margin-bottom: 20px;

        &>span {
            float: left;
            width: 70px;
            font-size: 14px;
            color: #1F2D3D;
            line-height: 30px;
        }

        .input-box {
            float: left;
            width: 235px;

            input {
                height: 30px;
            }
        }
    }

    .abstract-num {
      float: right;
      span {
        color: red;
      }
    }

    .bigB {
        .input-box {
            width: 570px;

            .el-select {
                width: 570px;
            }
        }

        .el-textarea {
          width: 570px;
        }
    }

    .rightF {
        float: right;
    }

    .save-btn {
      float: right;
      margin-top: 10px;
    }

    .title-input {
      margin: 30px 0;

      input {
        width: 100%;
        display: block;
        font-size: 20px;
        color: #000000;
        text-align: center;
        border: none;
      }
    }

    .abInput {
      position: absolute;
      right: 0;
      top: 4px;
      height: 30px;
    }

    .add-b {
        position: absolute;
        right: 0;
        top: 8px;
    }

    .el-collapse-item__wrap {
      padding-top: 0;
      overflow: visible;
    }

    &:last-child {
        margin-bottom: 30px;
    }
}

.clear {
    clear: both;
}

.line-bold {
    height: 9px;
    border-top: 1px solid #99A9BF;
    background: #F9F9F9;
    margin: 30px 0;
}

.el-collapse, .el-collapse-item__header, .el-collapse-item__wrap {
    background: #ffffff;
    border: none;
}

.el-collapse-item__content {
    padding: 0;
}

.el-collapse-item__header {
    padding: 0;
}

.report-box {
    width: 670px;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    margin-left: -15px;

    &:nth-of-type(2n) {
        background: #F9F9F9;
    }

    .report-i {
      float: left;
      width: 160px;
      height: 120px;
    }

    .content-b {
      float: right;
      width: 460px;

      .title {
        font-size: 16px;
        color: #000000;
        margin-bottom: 6px;
      }

      .des {
        font-size: 14px;
        color: #475669;
        line-height: 26px;
        height: 52px;
        overflow: hidden;
      }
    }

    .delete-b {
        float: right;
        display: block;
        margin-top: 4px;
        cursor: pointer;
    }

    .save-sub-btn {
      float: right;
      margin-top: 4px;
      margin-left: 12px;
    }
}

.articles-box {
    width: 438px;
    heigth: 96px;
    padding: 8px 10px;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 14px;
    background: url(../../assets/images/check-icon.png) 398px center no-repeat;
    background-color: #EFF2F7;
    cursor: pointer;

    &.active {
      background: url(../../assets/images/check-now.png) 398px center no-repeat;
      background-color: #EFF2F7;
    }

    .report-i {
      float: left;
      width: 107px;
      height: 80px;
      border-radius: 4px;
    }

    .content-b {
      float: left;
      width: 260px;
      margin-left: 13px; 

      .title {
        font-size: 16px;
        color: #000000;
        margin-bottom: 6px;
      }

      .des {
        font-size: 14px;
        color: #475669;
        line-height: 26px;
        height: 52px;
        overflow: hidden;
      }
    }
}
</style>