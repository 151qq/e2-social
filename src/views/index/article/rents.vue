<template>
    <section class="mid-box">
        <el-table
                :data="rents"
                border
                style="width: 100%">
            <el-table-column
                    prop="dateString"
                    label="交易日期"
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="priceT"
                    label="高区租金">
            </el-table-column>
            <el-table-column
                    prop="priceM"
                    label="中区租金">
            </el-table-column>
            <el-table-column
                    prop="priceB"
                    label="低区租金">
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
                            type="daterange"
                            placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="高区租金">
                    <el-input-number class="input-box" :min="0" v-model="curentData.priceT"></el-input-number>
                </el-form-item>
                <el-form-item label="中区租金">
                    <el-input-number class="input-box" :min="0" v-model="curentData.priceM"></el-input-number>
                </el-form-item>
                <el-form-item label="低区租金">
                    <el-input-number class="input-box" :min="0" v-model="curentData.priceB"></el-input-number>
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
            rents: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            dialogFormVisible: false,
            curentData: {
                id: '',
                date: '',
                priceT: '',
                priceB: '',
                priceM: ''
            }
        }
    },
    mounted () {
        this.getRents()
        document.title = '租金历史明细'
    },
    methods: {
        getRents () {
            util.request({
                method: 'get',
                interface: 'rent',
                data: {
                    id: localStorage.getItem("id"),
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(res => {
                res.result.result.rents.forEach((item) => {
                    item.date = [item.tenantStartDate, item.tenantOverDate]
                    item.dateString = item.tenantStartDate.split(' ')[0] + ' - ' + item.tenantOverDate.split(' ')[0]
                })
                this.rents = res.result.result.rents
                console.log(this.rents)
                this.total = this.total ? Number(this.total) : 0
            })
        },
        pageChange (page) {
            this.pageNumber++
            this.getRents()
        },
        deleteRow (row) {
            this.$alert('您考虑好了吗？确定要删除记录!', '删除', {
                confirmButtonText: '确定',
                callback: action => {
                    util.request({
                        method: 'post',
                        interface: 'deleteRentHistory',
                        data: {
                            id: row.id
                        }
                    }).then(res => {
                        this.getRents()
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
            if (this.curentData.date == '') {
                this.$message({
                    message: '请务填写交易日期！',
                    type: 'warning'
                })
                return false
            }
            if (this.curentData.priceT == '') {
                this.$message({
                    message: '请务填写高区租金！',
                    type: 'warning'
                })
                return false
            }
            if (this.curentData.priceM == '') {
                this.$message({
                    message: '请务填写中区租金！',
                    type: 'warning'
                })
                return false
            }
            if (this.curentData.priceB == '') {
                this.$message({
                    message: '请务填写低区租金！',
                    type: 'warning'
                })
                return false
            }

            var formData = {
                id: localStorage.getItem("id"),
                type: 'rents',
                data: {
                    id: this.curentData.id,
                    tenantStartDate: this.curentData.date[0],
                    tenantOverDate: this.curentData.date[1],
                    priceT: this.curentData.priceT,
                    priceM: this.curentData.priceM,
                    priceB: this.curentData.priceB
                }
            }

            util.request({
                method: 'post',
                interface: 'houseInfo',
                data: formData
            }).then(res => {
                if (res.result.success) {
                    this.getRents()
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