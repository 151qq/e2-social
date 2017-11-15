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
                    label="交易甲方">
            </el-table-column>
            <el-table-column
                    prop="changeB"
                    label="交易乙方">
            </el-table-column>
            <el-table-column
                    prop="tenantFinanceTool"
                    label="金融工具">
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
                    <el-input class="input-box" v-model="curentData.changeA"></el-input>
                </el-form-item>
                <el-form-item label="交易乙方">
                    <el-input class="input-box" v-model="curentData.changeB"></el-input>
                </el-form-item>
                <el-form-item label="评估机构">
                    <el-input class="input-box" v-model="curentData.evalCodes"></el-input>
                </el-form-item>
                <el-form-item label="金融工具">
                    <el-input class="input-box" v-model="curentData.tenantFinanceTool"></el-input>
                </el-form-item>
                <el-form-item label="交易备注">
                    <el-input
                          type="textarea"
                          class="input-box"
                          :rows="4"
                          :maxlength="140"
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
                tenantFinanceTool: '',
                evalCodes: ''
            },
            pickerPre: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    mounted () {
        this.getChanges()
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
            this.dialogFormVisible = true
            this.curentData = Object.assign({}, row)
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
            if (this.curentData.price == '') {
                this.$message({
                    message: '请务填写交易价格！',
                    type: 'warning'
                })
                return false
            }
            if (this.curentData.changeA == '') {
                this.$message({
                    message: '请务填写交易甲方！',
                    type: 'warning'
                })
                return false
            }
            if (this.curentData.changeB == '') {
                this.$message({
                    message: '请务填写交易乙方！',
                    type: 'warning'
                })
                return false
            }

            util.request({
                method: 'post',
                interface: 'houseInfo',
                data: formData
            }).then(res => {
                if (res.result.success) {
                    this.getChanges()
                    this.dialogFormVisible = false
                    this.$message({
                        message: '恭喜，修改成功',
                        type: 'success'
                    })
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