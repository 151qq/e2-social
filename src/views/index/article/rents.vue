<template>
    <section class="mid-box">
        <el-table
                :data="rents"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="交易日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="priceT"
                    label="高区租金"
                    width="180">
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
                this.rents = res.result.result.rents
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
                type: 'rents',
                data: this.curentData
            }

            if (this.rents.date == '') {
                this.$message({
                    message: '请务填写交易日期！',
                    type: 'warning'
                })
                return false
            }
            if (this.rents.priceT == '') {
                this.$message({
                    message: '请务填写高区租金！',
                    type: 'warning'
                })
                return false
            }
            if (this.rents.priceM == '') {
                this.$message({
                    message: '请务填写中区租金！',
                    type: 'warning'
                })
                return false
            }
            if (this.rents.priceB == '') {
                this.$message({
                    message: '请务填写低区租金！',
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

    .page-box {
        margin-top: 15px;
    }
}
</style>