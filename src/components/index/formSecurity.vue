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
                                    :label="item.enterpriseCname"
                                    :value="item.enterpriseCode">
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
                        <span>清算时间</span>
                        <el-date-picker
                                class="input-box"
                                v-model="base.productEndTime"
                                placeholder="选择日期"
                                :picker-options="pickerPre">
                        </el-date-picker>
                    </section>
                    <section class="baseInput">
                        <span>发行金额(万)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01" v-model="base.productQuotation"></el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>承销机构</span>
                        <el-select class="input-box"
                                   v-model="base.productSalesOrg"
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
                    <section class="baseInput">
                        <span>评估机构</span>
                        <el-select class="input-box"
                                   v-model="base.productEvaluationOrg"
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
                        <span>评级机构</span>
                        <el-select class="input-box"
                                   v-model="base.productRatingOrg"
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
                    <section class="baseInput">
                        <span>现金流预测机构</span>
                        <el-select class="input-box"
                                   v-model="base.productCashflowConsultingOrg"
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
                        <span>证券代码</span>
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
                        <span>证券图片</span>
                        <div class="input-box">
                            <upload :path="base.productLogo"
                                    :no-del="true"
                                    :bg-path="true"
                                    :id-name="'productLogo'"
                                    @changeImg="changeImg"></upload>
                        </div>
                    </section>
                    <section class="baseInput bigB">
                        <span>证券结构图</span>
                        <div class="input-box">
                            <upload :path="base.productArcUrl"
                                    :no-del="true"
                                    :bg-path="true"
                                    :id-name="'productArcUrl'"
                                    @changeImg="changeArcImg"></upload>
                        </div>
                    </section>

                    <section class="baseInput bigB">
                        <span>证券说明</span>
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
            <!-- <el-collapse-item class="formStyle" title="资产现金流" name="2">
                <el-table
                :data="payAndProfit"
                style="width: 100%">
                    <el-table-column type="expand">
                      <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="交易备注：">
                            <span>{{ props.row.tenantDesc }}</span>
                          </el-form-item>
                          <el-form-item label="评估机构：">
                            <span>{{ props.row.evalCodes }}</span>
                          </el-form-item>
                          <el-form-item label="咨询机构：">
                            <span>{{ props.row.tenantFinanceTool }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                            prop="dateString"
                            label="交易日期">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template scope="scope">
                            <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
                            <el-button @click="showModel(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item> -->
            <el-collapse-item class="formStyle" title="产品构成" name="3">
                <el-button class="add-btn" type="primary" size="small" @click="addHouseRate">新增</el-button>

                <el-table
                    :data="base.productHouseRate"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="houseCname"
                      label="楼盘">
                    </el-table-column>
                    <el-table-column
                      prop="productHouseRate"
                      label="占比(%)">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="80">
                      <template scope="scope">
                        <el-button @click="deleteRow(scope.row, scope.$index)"
                                    type="danger" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>

        <el-dialog title="添加产品构成" :visible.sync="addHouse">
            <el-form :label-position="'left'">
                <el-form-item label="物业" :label-width="'80px'">
                  <search-filter :row-data="nowHouseData"></search-filter>
                </el-form-item>
                <el-form-item label="占比(%)" :label-width="'80px'">
                  <el-input class="table-input-box" type="number" size="small" 
                                        :min="0" :step="0.01"
                                        v-model="nowHouseData.productHouseRate"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addHouse = false">取 消</el-button>
                <el-button type="primary" @click="saveRow(nowHouseData)">确 定</el-button>
            </div>
        </el-dialog>
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
                    productHouseRate: [],
                    productEndTime: '',
                    productQuotation: '',
                    productSalesOrg: '',
                    productEvaluationOrg: '',
                    productRatingOrg: '',
                    productCashflowConsultingOrg: '',
                    productArcUrl: ''
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
                investList: [],
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
                timer: null,
                addHouse: false,
                nowHouseData: {},
                payAndProfit: []
            }
        },
        mounted () {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            document.title = '证券产品'
            this.getTypes()
            this.getInvests()
        },
        methods: {
            getAllData () {
                this.isBase = false
                this.getBase()

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
                    houseCname: '',
                    financeProductCode: localStorage.getItem('id'),
                    houseId: '',
                    productHouseRate: ''
                }

                this.nowHouseData = obj
                this.addHouse = true
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
                if (!row.houseCname) {
                    this.$message({
                        message: '楼盘不能为空！',
                        type: 'warning'
                    })
                    return false
                }

                if (!row.productHouseRate) {
                    this.$message({
                        message: '占比不能为空！',
                        type: 'warning'
                    })
                    return false
                }

                util.request({
                    method: 'post',
                    interface: 'financeProductHouseSave',
                    data: row
                }).then(res => {
                    this.$parent.$refs.listBox.loadList('reload')
                    this.base.productHouseRate.push(Object.assign(this.nowHouseData))
                    this.addHouse = false
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
            changeArcImg (data) {
                this.base.productArcUrl = data.url
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

                if (this.base.productEndTime) {
                    this.base.productEndTime = this.formDataDate(this.base.productEndTime)
                }

                util.request({
                    method: 'post',
                    interface: 'saveOrUpdate',
                    data: this.base
                }).then(res => {
                    if (res.result.success == '1') {
                        this.$parent.$refs.listBox.loadList('reload')
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            saveAll () {
                // this.saveBase()
            },
            getInvests () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'propertys_investmen_type_1,propertys_investmen_type_2'
                    }
                }).then(res => {
                    this.investList = res.result.result
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

    .el-dialog--small {
        width: 400px;
    }

    .upload-list-box {
        width: 110%;
    }

    .formStyle {
        position: relative;
        width: 640px;
        margin: 0 auto;

        .el-table, .el-table .cell, .el-table__footer-wrapper {
            overflow: visible;
        }

        .el-table__body-wrapper, .el-table__header-wrapper {
            overflow: visible;
        }

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
            width: 100px;
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
            width: 205px;

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
            width: 540px;

            .el-select {
                width: 540px;
            }
        }

        .el-textarea {
          width: 540px;
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