<template>
    <section class="add-box-report">
        <el-dialog title="添加报告" :visible.sync="isAdd.value">
            <div class="clear"></div>
            <section class="baseInput bigB">
                <span>标题</span>
                <el-input
                        class="input-box"
                        placeholder="请输入内容"
                        v-model="reportDatas.title">
                </el-input>
            </section>
            <section class="baseInput bigB changeImg">
                <span>封面</span>
                <div class="input-box">
                    <upload :path="reportDatas.coverImg"
                            :no-del="true"
                            :bg-path="true"
                            :id-name="'report-cover-img'"
                            @changeImg="changeImg"></upload>
                </div>
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
import upload from '../common/upload'

export default {
    props: ['isAdd'],
    data () {
        return {
            reportDatas: {
                title: '',
                coverImg: ''
            }
        }
    },
    methods: {
        initData () {
            this.reportDatas.title = ''
            this.reportDatas.coverImg = ''
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

            if (this.reportDatas.coverImg == '') {
                this.$message({
                  message: '请上传封面图片！',
                  type: 'warning'
                })
                return false
            }
            this.$emit('addReports', this.reportDatas)
        },
        changeImg (data) {
          this.reportDatas.coverImg = data.url
        }
    },
    components: {
        upload
    }
}
</script>
<style lang="scss">
.add-box-report {
    .el-dialog {
        width: 520px;
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

    .changeImg {
        margin: 0;

        img {
            display: block;
            width: 100%;
            height: auto;
        }

        .default-img {
            width: 100%;
            height: 150px;
            background: #f0f0f0;
        }

        p {
            width: 190px;
            float: left;
            margin: 20px 30px 0 0;

            label {
                display: block;
                width: 100%;
                height: 36px;
                background: #20A0FF;
                font-size: 12px;
                color: #ffffff;
                line-height: 36px;
                text-align: center;
                border: none;
                padding: 0;
                border-radius: 3px;
                cursor: pointer;
            }

            input {
                display: none;
            }
        }

        .su-btn {
            float: right;
            width: 190px;
            height: 36px;
            margin-top: 20px;
            background: #20A0FF;
            font-size: 12px;
            color: #ffffff;
            line-height: 36px;
            text-align: center;
            border: none;
            padding: 0;
            border-radius: 3px;
        }
    }

    .bigB {
        .input-box {
            width: 415px;

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