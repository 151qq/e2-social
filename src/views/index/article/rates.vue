<template>
    <section class="mid-box">
        <el-table
                :data="rates"
                border
                style="width: 100%">
            <el-table-column
                    prop="createDate"
                    label="填报日期"
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="vacancyRate"
                    label="空置率">
            </el-table-column>
            <el-table-column
                    prop="creater"
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
            <el-form :label-position="'left'" label-width="80px" :model="curentData">
                <el-form-item label="交易日期">
                    <el-date-picker
                            class="input-box"
                            v-model="curentData.createDate"
                            type="month"
                            placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="置空率">
                    <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01" v-model="curentData.vacancyRate"></el-input>
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
            rates: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            dialogFormVisible: false,
            curentData: {
                id: '',
                createDate: '',
                vacancyRate: ''
            },
            hisUser: '',
            permission: ''
        }
    },
    mounted () {
        this.getRents()
        document.title = '空置率历史明细'
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
                interface: 'rates',
                data: {
                    houseId: this.$route.query.id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(res => {
                res.result.result.forEach((item) => {
                    var dateData = item.createDate.split(' ')[0].split('-')
                    item.createDate = dateData[0] + '-' + dateData[1]
                })

                this.permission = res.result.permission
                this.hisUser = res.result.request
                this.rates = res.result.result
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
                        method: 'get',
                        interface: 'deleteRateHistory',
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
            if (this.curentData.rate == '') {
                this.$message({
                    message: '请务填写置空率！',
                    type: 'warning'
                })
                return false
            }
            
            var formData = {
                housesId: this.$route.query.id,
                id: this.curentData.id,
                createDate: this.formDataDate(this.curentData.createDate),
                vacancyRate: this.curentData.vacancyRate,
                creater: this.curentData.creater
            }

            util.request({
                method: 'post',
                interface: 'updateRates',
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