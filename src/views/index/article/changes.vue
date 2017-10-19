<template>
    <section class="mid-box">
        <el-table
                :data="changes"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="交易日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格(万)"
                    width="180">
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
                            v-model="curentData.date"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerPre">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="价格(万)">
                    <el-input-number class="input-box" :min="0" v-model="curentData.price"></el-input-number>
                </el-form-item>
                <el-form-item label="交易甲方">
                    <el-input class="input-box" v-model="curentData.changeA"></el-input>
                </el-form-item>
                <el-form-item label="交易乙方">
                    <el-input class="input-box" v-model="curentData.changeB"></el-input>
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
                date: '',
                price: '',
                changeA: '',
                changeB: ''
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
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
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

            if (this.curentData.date == '') {
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

    .el-dialog--small {
        width: 460px;

        .input-box {
            width: 340px;
        }
    }

    .page-box {
        margin-top: 15px;
    }
}
</style>