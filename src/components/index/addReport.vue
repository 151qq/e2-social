<template>
    <section class="add-box-report">
        <el-dialog title="收货地址" :visible.sync="isAdd.value">
            <div class="clear"></div>
            <section class="baseInput bigB">
                <span>标题</span>
                <el-input
                        class="input-box"
                        placeholder="请输入内容"
                        v-model="reportDatas.title">
                </el-input>
            </section>
            <div class="clear"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAdd.value = false">取 消</el-button>
                <el-button type="primary" @click="confirmHandle">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../assets/common/util'
import searchBox from '../common/search-box.vue'

export default {
    props: ['isAdd'],
    data () {
        return {
            reportDatas: {
                title: ''
            }
        }
    },
    methods: {
        initData () {
            this.reportDatas.title = ''
        },
        confirmHandle () {
            if (this.reportDatas.title == '') {
                this.$message({
                  message: '楼盘名称不能为空！',
                  type: 'warning'
                })
                return false
            }
            if (this.reportDatas.title > 25) {
                this.$message({
                  message: '楼盘名称最多25个字！',
                  type: 'warning'
                })
                return false
            }
            this.$emit('addReports', this.reportDatas)
        }
    },
    components: {
        searchBox
    }
}
</script>
<style lang="scss">
.add-box-report {
    .el-dialog {
        width: 680px;
    }

    .baseInput {
        float: left;
        margin-bottom: 20px;

        &>span {
            float: left;
            width: 65px;
            font-size: 14px;
            color: #1F2D3D;
            line-height: 30px;
        }

        .input-box {
            float: left;
            width: 235px;

            input {
                height: 30px;
            }
        }
    }

    .bigB {
        .input-box {
            width: 575px;

            .el-select {
                width: 575px;
            }
        }
    }

    .clear {
        clear: both;
    }
}
</style>