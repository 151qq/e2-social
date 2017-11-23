<template>
    <div class="form-invest">
        <el-collapse v-model="activeNames" @change="collChange">
            <el-collapse-item class="formStyle" title="基本信息" name="1">
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="baseInput bigB">
                        <span>证券名称</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.productCame">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>发行机构</span>
                        <el-select class="input-box"
                                   v-model="base.productPublishOrg"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in investList"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.nodeCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>上市地点</span>
                        <el-select class="input-box"
                               v-model="base.productIpoSite"
                               name="investor"
                               :disabled="true"
                               placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in types.finance_market"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>发行时间</span>
                        <el-date-picker
                                class="input-box"
                                v-model="base.productPublishTime"
                                placeholder="选择日期"
                                :picker-options="pickerPre">
                        </el-date-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>股票代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.productMarketCode">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>产品状态</span>
                        <el-select class="input-box"
                                   v-model="base.productState"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in productStateList"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>产品类型</span>
                        <el-select class="input-box"
                               v-model="base.productType"
                               name="investor"
                               :disabled="true"
                               placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in types.finance_product_type"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>

                    <section class="baseInput bigB">
                        <span>产品链接</span>
                        <el-input
                                class="input-box"
                                @change="checkWebSite"
                                placeholder="请输入内容"
                                v-model="base.productInfoLink">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>公司图片</span>
                        <div class="input-box">
                            <upload :path="base.productLogo"
                                    :no-del="true"
                                    :bg-path="true"
                                    @changeImg="changeImg"></upload>
                        </div>
                    </section>

                    <section class="baseInput bigB">
                        <span>公司简介</span>
                        <div class="input-box">
                            <ueditor
                                v-if="isBase"
                                :editor-id="'productDesc' + base.id"
                                :editor-type="'text'"
                                :content="base.productDesc"
                                @setContent="setContent"></ueditor>
                        </div>
                    </section>

                    
                    <div class="clear"></div>
                </div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveBase">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="产品构成" name="2">
                <el-button class="add-btn" type="primary" size="small" @click="addHouseRate">新增</el-button>

                <el-table
                    :data="base.productHouseRate"
                    border
                    style="width: 100%">
                    <el-table-column
                      label="楼盘">
                      <template scope="scope">
                        <search-filter :row-data="scope.row"></search-filter>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="占比">
                      <template scope="scope">
                        <el-input class="table-input-box" type="number" size="small" 
                                        :min="0" :step="0.01"
                                        v-model="scope.row.productHouseRate"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="140">
                      <template scope="scope">
                        <el-button @click="deleteRow(scope.row, scope.$index)"
                                    type="danger" size="small">删除</el-button>

                        <el-button @click="saveRow(scope.row)"
                                    type="success" size="small">保存</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    import util from '../../assets/common/util'
    import upload from '../../components/common/upload'
    import ewmUpload from '../../components/common/ewm-upload'
    import ueditor from '../../components/common/ueditor'
    import searchFilter from '../../components/common/search-filter'

    export default {
        props: ['listInfo', 'articleInfo'],
        data () {
            return {
                base: {
                    id: '',
                    productCame: '',
                    productPublishOrg: '',
                    productIpoSite: '',
                    productPublishTime: '',
                    productMarketCode: '',
                    productState: '',
                    productInfoLink: '',
                    productLogo: '',
                    productDesc: '',
                    productType: '',
                    productHouseRate: []
                },
                isBase: false,
                abstractNum: 140,
                activeNames: ['1'],
                pickerPre: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now()
                    }
                },
                types: {
                    finance_market: [],
                    finance_product_type: []
                },
                productStateList: [
                    {
                        code: '0',
                        label: '未上市'
                    },
                    {
                        code: '1',
                        label: '已上市'
                    }
                ],
                investList: [],
                timer: null,
            }
        },
        mounted () {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            document.title = '投资机构'
        },
        methods: {
            getAllData () {
                this.isBase = false
                this.getBase()
                this.getTypes()

                if (this.timer) {
                    clearInterval(this.timer)
                }

                // this.timer = setInterval(() => {
                //     this.saveAll()
                // }, 180000)
            },
            desChange () {
                this.abstractNum = 140 - this.base.des.length
            },
            getBase () {
                util.request({
                    method: 'get',
                    interface: 'getOrUpdate',
                    data: {
                        productCode: localStorage.getItem('id')
                    }
                }).then(res => {
                    if (res.result.success == '0') {
                        setTimeout(() => {
                            this.isBase = true
                        }, 0)
                        this.$message.error(res.result.message)
                        return
                    }

                    this.base = res.result.result

                    setTimeout(() => {
                        this.isBase = true
                    }, 0)
                })
            },
            getTypes () {
                util.request({
                    method: 'get',
                    interface: 'orDic',
                    data: {}
                }).then(res => {
                    if (res.result.success == '1') {
                        this.types = res.result.result
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            checkWebSite () {
                var webSite = this.base.productInfoLink
                this.base.productInfoLink = webSite.replace(/[\u4e00-\u9fa5]/g,'')
            },
            addHouseRate () {
                var obj = {
                    id: '',
                    houseCname: '国贸中心',
                    financeProductCode: localStorage.getItem('id'),
                    houseId: '6',
                    productHouseRate: ''
                }

                this.base.productHouseRate.push(obj)
            },
            deleteRow (row, index) {
                if (row.id) {
                    util.request({
                        method: 'post',
                        interface: 'deleteFinanceProductHouser',
                        data: {
                            id: row.id
                        }
                    }).then(res => {
                        if (res.result.success == '1') {
                            this.$message({
                                message: '删除成功！',
                                type: 'success'
                            })
                            this.base.productHouseRate.splice(index, 1)
                        } else {
                            this.$message.error(res.result.message)
                        }
                    })
                } else {
                    this.base.productHouseRate.splice(index, 1)
                }
            },
            saveRow (row) {
                util.request({
                    method: 'post',
                    interface: 'financeProductHouseSave',
                    data: row
                }).then(res => {
                    this.$parent.$refs.listBox.loadList('reload')
                })
            },
            setContent (data) {
                this.base.productDesc = data.content
            },
            collChange () {
                localStorage.setItem("houseColl", this.activeNames)
            },
            changeImg (data) {
                this.base.productLogo = data.url
            },
            formDataDate (str) {
                var dateStr = new Date(str)
                var year = dateStr.getFullYear()
                var monthStr = dateStr.getMonth() + 1
                var dayStr = dateStr.getDate()
                var month = monthStr < 10 ? '0' + monthStr : monthStr
                var day = dayStr < 10 ? '0' + dayStr : dayStr
                return year + '-' + month + '-' + day
            },
            saveBase () {
                if (!this.base.productCame) {
                    this.$message({
                        message: '证券名称不能为空！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.base.productPublishTime) {
                    this.base.productPublishTime = this.formDataDate(this.base.productPublishTime)
                }

                util.request({
                    method: 'post',
                    interface: 'saveOrUpdate',
                    data: this.base
                }).then(res => {
                    this.$parent.$refs.listBox.loadList('reload')
                })
            },
            saveAll () {
                // this.saveBase()
            },
            getMalls () {
                util.request({
                    method: 'post',
                    interface: 'malls',
                    data: {
                        city: this.base.city
                    }
                }).then(res => {
                    this.malls = res.result.result
                })
            }
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        components: {
            upload,
            ewmUpload,
            ueditor,
            searchFilter
        }
    }
</script>
<style lang="scss">
.form-invest {
    margin-top: 30px;

    .upload-list-box {
        width: 110%;
    }

    .formStyle {
        position: relative;
        width: 640px;
        margin: 0 auto;

        .table-input-box {
            width: 100%;
            height: 30px;

            .el-input__inner {
                height: 30px;
            }
        }

        .edui-default .edui-editor {
            border-color: #bfcbd9;
        }

        .edui-editor-iframeholder {
            min-height: 150px;
        }

        .link-btn {
            position: absolute;
            right: 0;
            top: 7px;
            width: 60px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            font-size: 12px;
            border-radius: 4px;
            color: #fff;
            background-color: #20a0ff;
        }

        .add-btn {
            position: absolute;
            right: 0;
            top: 7px;
        }

        .save-btn {
            float: right;
            margin-top: 10px;
        }

        .abInput {
            position: absolute;
            right: 0;
            top: 4px;
            height: 30px;
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

    .el-collapse-item__wrap {
        padding-top: 20px;
        overflow: visible;
    }

    .el-collapse-item__content {
        padding: 0;
    }

    .el-collapse-item__header {
        padding: 0;
    }

    #container {
        width: 640px;
        height: 180px;
        margin: 0 0 15px;
    }

    .switch-box {
        width: 300px;
    }

    .baseInput {
        float: left;
        margin-bottom: 20px;

        &>span {
            float: left;
            width: 90px;
            height: 30px;
            font-size: 14px;
            color: #666666;
            line-height: 30px;
        }

        .abstract-num {
          float: right;
          span {
            color: red;
          }
        }

        .input-box {
            float: left;
            width: 215px;

            input {
                height: 30px;
            }
        }

        .numBox {
            float: right;
            font-size: 12px;
            line-height: 20px;

            span {
                color: #20a0ff;
            }
        }
    }

    .bigB {
        .input-box {
            width: 550px;

            .el-select {
                width: 550px;
            }
        }

        .el-textarea {
          width: 550px;
        }
    }

    .rightF {
        float: right;
    }

    .over-box {
        width: 670px;
        padding: 15px 15px 0;
        box-sizing: border-box;
        overflow: hidden;
        margin-left: -15px;

        &:nth-of-type(2n) {
            background: #F9F9F9;
        }

        .delete-btn {
            float: right;
            margin-bottom: 20px;
            cursor: pointer;
        }

        .save-sub-btn {
            float: right;
            margin-bottom: 20px;
            margin-left: 12px;
        }
    }
}
</style>