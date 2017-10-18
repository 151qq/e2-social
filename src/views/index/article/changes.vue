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
                    label="交易价格"
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
        </el-table>
        <el-pagination
            v-if="total"
            class="page-box"
            layout="prev, pager, next"
            @current-change="pageChange"
            :page-sizes="pageSize"
            :total="total">
        </el-pagination>
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
            pageNumber: 1
        }
    },
    mounted () {
        this.getChanges()
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
                this.total = this.total ? this.total : 0
            })
        },
        pageChange (page) {
            this.pageNumber++
            this.getChanges()
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