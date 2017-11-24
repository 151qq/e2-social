<template>
    <section class="mid-box">
        <el-table
                :data="changes"
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
                    prop="price"
                    label="价格(万)">
            </el-table-column>
            <el-table-column
                    prop="changeA"
                    width="240"
                    label="交易甲方">
            </el-table-column>
            <el-table-column
                    prop="changeB"
                    width="240"
                    label="交易乙方">
            </el-table-column>
            <el-table-column
                    prop="recordCreater"
                    label="填报人">
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
        <el-pagination
            v-if="total"
            class="page-box"
            layout="prev, pager, next"
            @current-change="pageChange"
            :page-sizes="pageSize"
            :total="total">
        </el-pagination>

        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :label-position="'left'" label-width="80px" :model="curentData">
                <el-form-item label="交易日期">
                    <el-date-picker
                            class="input-box"
                            v-model="curentData.dateString"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerPre">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="价格(万)">
                    <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01" v-model="curentData.price"></el-input>
                </el-form-item>
                <el-form-item label="交易甲方">
                    <el-select class="input-box"
                               v-model="curentData.changeA"
                               name="changeA"
                               placeholder="请选择">
                        <el-option
                                v-if="item.enterpriseCode != curentData.changeB"
                                v-for="(item, index) in investList"
                                :key="index"
                                :label="item.enterpriseCname"
                                :value="item.enterpriseCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易乙方">
                    <el-select class="input-box"
                               v-model="curentData.changeB"
                               name="changeB"
                               placeholder="请选择">
                        <el-option
                                v-if="item.enterpriseCode != curentData.changeA"
                                v-for="(item, index) in investList"
                                :key="index"
                                :label="item.enterpriseCname"
                                :value="item.enterpriseCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评估机构">
                    <el-select class="input-box"
                               v-model="curentData.evalCodes"
                               name="evalCodes"
                               multiple
                               placeholder="请选择">
                        <el-option
                                v-for="(item, index) in agentAList"
                                :key="index"
                                :label="item.enterpriseCname"
                                :value="item.enterpriseCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="咨询机构">
                    <el-select class="input-box"
                               v-model="curentData.tenantFinanceTool"
                               name="tenantFinanceTool"
                               multiple
                               placeholder="请选择">
                        <el-option
                                v-for="(item, index) in agentBList"
                                :key="index"
                                :label="item.enterpriseCname"
                                :value="item.enterpriseCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易备注">
                    <el-input
                          type="textarea"
                          class="input-box"
                          :rows="4"
                          :maxlength="1000"
                          placeholder="请输入内容"
                          v-model="curentData.tenantDesc">
                        </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../../assets/common/util'

export default {
    data () {
        return {
            changes: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            dialogFormVisible: false,
            curentData: {
                id: '',
                dateString: '',
                price: '',
                changeA: '',
                changeB: '',
                tenantDesc: '',
                tenantFinanceTool: [],
                evalCodes: []
            },
            pickerPre: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            },
            investList: [],
            agentAList: [],
            agentBList: []
        }
    },
    mounted () {
        this.getChanges()
        this.getInvests()
        this.getAgentA()
        this.getAgentB()
        document.title = '交易历史明细'
    },
    methods: {
        getChanges () {
            util.request({
                method: 'get',
                interface: 'changes',
                data: {
                    id: localStorage.getItem("id"),
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(res => {
                res.result.result.changes.forEach((item) => {
                    item.dateString = item.date.split(' ')[0]
                })
                this.changes = res.result.result.changes
                this.total = this.total ? Number(this.total) : 0
            })
        },
        getInvests () {
            util.request({
                method: 'get',
                interface: 'findEntByEntType',
                data: {
                    enterpriseTypes: 'finance_org_type_1'
                }
            }).then(res => {
                this.investList = res.result.result
            })
        },
        getAgentA () {
            util.request({
                method: 'get',
                interface: 'findEntByEntType',
                data: {
                    enterpriseTypes: 'propertys_agent_type_3'
                }
            }).then(res => {
                this.agentAList = res.result.result
            })
        },
        getAgentB () {
            util.request({
                method: 'get',
                interface: 'findEntByEntType',
                data: {
                    enterpriseTypes: 'propertys_agent_type_1'
                }
            }).then(res => {
                this.agentBList = res.result.result
            })
        },
        pageChange (page) {
            this.pageNumber++
            this.getChanges()
        },
        deleteRow (row) {
            this.$alert('您考虑好了吗？确定要删除记录!', '删除', {
                confirmButtonText: '确定',
                callback: action => {
                    util.request({
                        method: 'post',
                        interface: 'deleteTradeHistory',
                        data: {
                            id: row.id
                        }
                    }).then(res => {
                        this.getChanges()
                        this.$message({
                            type: 'info',
                            message: '删除成功'
                        })
                    })
                }
            })
        },
        showModel (row) {
            util.request({
                method: 'get',
                interface: 'getTradeHistoryById',
                data: {
                    id: row.id
                }
            }).then(res => {
                if (res.result.success == "1") {
                    var result = res.result.result
                    result.dateString = result.date.split(' ')[0]

                    if (result.tenantFinanceTool) {
                        result.tenantFinanceTool = result.tenantFinanceTool.split(',')
                    } else {
                        result.tenantFinanceTool = []
                    }

                    if (result.evalCodes) {
                        result.evalCodes = result.evalCodes.split(',')
                    } else {
                        result.evalCodes = []
                    }

                    this.curentData = result
                    this.dialogFormVisible = true

                } else {
                    this.$message.error(res.result.message)
                }
            })
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
        confirmEdit () {
            var formData = {
                id: localStorage.getItem("id"),
                type: 'changes',
                data: this.curentData
            }

            formData.data.recordCreater = this.curentData.recordCreater

            if (this.curentData.dateString == '') {
                this.$message({
                    message: '请务填写交易日期！',
                    type: 'warning'
                })
                return false
            }

            formData.data.date = this.formDataDate(formData.data.dateString)

            if (this.curentData.price == '') {
                this.$message({
                    message: '请务填写交易价格！',
                    type: 'warning'
                })
                return false
            }

            if (this.curentData.changeA == '' && this.curentData.changeB == '') {
                this.$message({
                    message: '请务填写交易方！',
                    type: 'warning'
                })
                return false
            }

            this.curentData.evalCodes = this.curentData.evalCodes.join(',')

            this.curentData.tenantFinanceTool = this.curentData.tenantFinanceTool.join(',')

            util.request({
                method: 'post',
                interface: 'houseInfo',
                data: formData
            }).then(res => {
                if (res.result.success == "1") {
                    this.getChanges()
                    this.dialogFormVisible = false
                    this.$message({
                        message: '恭喜，修改成功',
                        type: 'success'
                    })
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>
<style lang="scss">
.mid-box {
    width: 1000px;
    margin: 30px auto;

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        float: left;
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item__content {
        width: 340px;
        float: left;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .el-dialog--small {
        top: 60px !important;
        width: 600px;

        .input-box {
            width: 480px;
        }
    }

    .page-box {
        margin-top: 15px;
    }
}
</style>