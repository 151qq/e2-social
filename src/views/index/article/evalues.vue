<template>
    <section class="mid-box">
        <el-table
                :data="evalues"
                border
                style="width: 100%">
            <el-table-column
                    prop="createDate"
                    label="估值日期">
            </el-table-column>
            <el-table-column
                    prop="rentValue"
                    label="总租金(万)">
            </el-table-column>
            <el-table-column
                    prop="valuation"
                    label="估值">
            </el-table-column>
            <el-table-column
                    prop="netRentValue"
                    label="静总租金(万)">
            </el-table-column>
            <el-table-column
                    prop="capRate"
                    label="资本化率">
            </el-table-column>
            <el-table-column
                    prop="recordCreater"
                    label="填报人">
            </el-table-column>
            <el-table-column
                    v-if="isOperate"
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
            <el-form :label-position="'left'" label-width="110px" :model="curentData">
                <el-form-item label="交易日期">
                    <el-date-picker
                            class="input-box"
                            v-model="curentData.createDate"
                            type="year"
                            placeholder="选择年">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="总租金(万)">
                    <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01" v-model="curentData.rentValue"></el-input>
                </el-form-item>
                <el-form-item label="估值">
                    <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01" v-model="curentData.valuation"></el-input>
                </el-form-item>
                <el-form-item label="静总租金(万)">
                    <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01" v-model="curentData.netRentValue"></el-input>
                </el-form-item>
                <el-form-item label="资本化率">
                    <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01" v-model="curentData.capRate"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" v-if="isOperate" class="dialog-footer">
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
            evalues: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            dialogFormVisible: false,
            curentData: {
                housesGps: '',
                createDate: '',
                rentValue: '',
                valuation: '',
                netRentValue: '',
                capRate: '',
                author: ''
            },
            hisUser: '',
            permission: ''
        }
    },
    mounted () {
        this.getRents()
        document.title = '估值历史明细'
    },
    computed: {
        isOperate () {
            var isUser = (this.hisUser && this.$route.query.user && this.hisUser == this.$route.query.user)
            return isUser || this.permission == '111'
        }
    },
    methods: {
        getRents () {
            util.request({
                method: 'get',
                interface: 'evalues',
                data: {
                    id: this.$route.query.id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(res => {
                res.result.result.valuation.forEach((item) => {
                    var dateData = item.createDate.split(' ')[0].split('-')
                    item.createDate = dateData[0]
                })

                this.permission = res.result.permission
                this.hisUser = res.result.request
                this.evalues = res.result.result.valuation
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
                        interface: 'deleteEvalueHistory',
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
            if (this.curentData.createDate == '') {
                this.$message({
                    message: '请务填写交易日期！',
                    type: 'warning'
                })
                return false
            }
            if (this.curentData.rentValue == '' && this.curentData.valuation == '' && this.curentData.netRentValue == '' && this.curentData.capRate == '') {
                this.$message({
                    message: '请务填写租金！',
                    type: 'warning'
                })
                return false
            }

            var formData = {
                housesGps: this.curentData.housesGps,
                type: 'valuation',
                data: {
                    id: this.curentData.id,
                    housesGps: this.curentData.housesGps,
                    createDate: this.formDataDate(this.curentData.createDate),
                    rentValue: this.curentData.rentValue,
                    valuation: this.curentData.valuation,
                    netRentValue: this.curentData.netRentValue,
                    capRate: this.curentData.capRate,
                    recordCreater: this.curentData.recordCreater
                }
            }

            util.request({
                method: 'post',
                interface: 'houseInfo',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
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
            width: 310px;
        }
    }

    .page-box {
        margin-top: 15px;
    }
}
</style>