<template>
    <div class="form-invest">
        <el-collapse v-model="activeNames" @change="collChange">
            <el-collapse-item class="formStyle" title="基本信息" name="1">
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="baseInput bigB">
                        <span>证券名称</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.name">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>发行机构</span>
                        <el-select class="input-box"
                                   v-model="base.propertyType"
                                   name="investor"
                                   placeholder="请选择投资顾问">
                            <el-option
                                    v-for="(item, index) in propertyTypes"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.nodeCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>上市地点</span>
                        <el-select class="input-box"
                                   v-model="base.city"
                                   name="investor"
                                   placeholder="请选择投资顾问">
                            <el-option
                                    v-for="(item, index) in citys"
                                    :key="index"
                                    :label="item.userLoginName"
                                    :value="item.userCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>发行时间</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.createTime">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>股票代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.sharesCode">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>产品状态</span>
                        <el-select class="input-box"
                                   v-model="base.city"
                                   name="investor"
                                   placeholder="请选择投资顾问">
                            <el-option
                                    v-for="(item, index) in citys"
                                    :key="index"
                                    :label="item.userLoginName"
                                    :value="item.userCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>产品链接</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.sharesCode">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>关联物业</span>
                        <el-select class="input-box"
                                   v-model="base.city"
                                   name="investor"
                                   placeholder="请选择投资顾问">
                            <el-option
                                    v-for="(item, index) in citys"
                                    :key="index"
                                    :label="item.userLoginName"
                                    :value="item.userCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>占比</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="base.price"></el-input-number>
                    </section>
                    <section class="baseInput">
                        <span></span>
                        <el-select class="input-box"
                                   v-model="base.city"
                                   name="investor"
                                   placeholder="请选择投资顾问">
                            <el-option
                                    v-for="(item, index) in citys"
                                    :key="index"
                                    :label="item.userLoginName"
                                    :value="item.userCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>占比</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="base.price"></el-input-number>
                    </section>
                    <section class="baseInput">
                        <span></span>
                        <el-select class="input-box"
                                   v-model="base.city"
                                   name="investor"
                                   placeholder="请选择投资顾问">
                            <el-option
                                    v-for="(item, index) in citys"
                                    :key="index"
                                    :label="item.userLoginName"
                                    :value="item.userCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>占比</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="base.price"></el-input-number>
                    </section>
                    <section class="baseInput bigB">
                        <span>公司图片</span>
                        <div class="input-box">
                            <upload :path="base.investImg"
                                    :no-del="true"
                                    :bg-path="true"
                                    @changeImg="changeImg"></upload>
                        </div>
                    </section>

                    <section class="baseInput bigB">
                        <span>公司简介</span>
                        <el-input
                          type="textarea"
                          :rows="4"
                          :maxlength="140"
                          placeholder="请输入内容"
                          v-model="base.des"
                          @change="desChange">
                        </el-input>
                        <div class="abstract-num">剩余<span>{{abstractNum}}</span>个字</div>
                    </section>

                    
                    <div class="clear"></div>
                </div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveBase">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    import util from '../../assets/common/util'
    import upload from '../../components/common/upload'
    import ewmUpload from '../../components/common/ewm-upload'

    export default {
        props: ['listInfo', 'articleInfo'],
        data () {
            return {
                base: {
                    name: '',
                    holder: '',
                    createTime: '',
                    address: '',
                    propertyType: '',
                    city: '',
                    companyCode: '',
                    sharesCode: '',
                    investImg: '',
                    des: ''
                },
                abstractNum: 140,
                activeNames: ['1'],
                pickerPre: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now()
                    }
                },
                citys: [],
                propertyTypes: [],
                timer: null,
                wxPulic: {
                    titleName: '微信公众号',
                    imgUrl: ''
                },
                twitter: {
                    titleName: 'twitter账号',
                    imgUrl: ''
                },
                facebook: {
                    titleName: 'facebook账号',
                    imgUrl: ''
                },
                wbPulic: {
                    titleName: '微博账号',
                    imgUrl: ''
                }
            }
        },
        mounted () {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            document.title = '投资机构'
        },
        methods: {
            getAllData () {
                // this.getBase()

                if (this.timer) {
                    clearInterval(this.timer)
                }

                // this.timer = setInterval(() => {
                //     this.saveAll()
                // }, 180000)
                
                this.bigImgs = []
            },
            desChange () {
                this.abstractNum = 140 - this.base.des.length
            },
            getBase () {
                util.request({
                    method: 'get',
                    interface: 'base',
                    data: {
                        id: localStorage.getItem("id")
                    }
                }).then(res => {
                    if (res.result.success == '0') {
                        this.$message.error(res.result.message)
                        return
                    }

                    var base = res.result.result.base

                    if (!base.benchmark) {
                        base.benchmark = []
                    }

                    this.base = Object.assign(this.base, base)

                    this.rentChange()

                    setTimeout(() => {
                        
                    }, 0)
                })
            },
            collChange () {
                localStorage.setItem("houseColl", this.activeNames)
            },
            changeImg (data) {
                this.base.housesImg = data.url
            },
            saveBase () {
                var formData = {
                    id: localStorage.getItem("id"),
                    type: 'base',
                    data: this.base
                }

                if (this.base.benchmark.length > 3) {
                    this.$message({
                        message: '请务必选择3个对标物业！',
                        type: 'warning'
                    })
                    return false
                }

                util.request({
                    method: 'post',
                    interface: 'houseInfo',
                    data: formData
                }).then(res => {
                    this.$parent.$refs.listBox.reloadList(res.result.result.id)
                })
            },
            saveAll () {
                // this.saveBase()
            },
            getTypes () {
                util.request({
                    method: 'get',
                    interface: 'typeMap',
                    data: {}
                }).then(res => {
                    this.types = res.result.result
                })
            },
            getMalls () {
                util.request({
                    method: 'post',
                    interface: 'malls',
                    data: {
                        city: this.base.city
                    }
                }).then(res => {
                    this.malls = res.result.result
                })
            }
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        components: {
            upload,
            ewmUpload
        }
    }
</script>
<style lang="scss">
.form-invest {
    margin-top: 30px;

    .upload-list-box {
        width: 110%;
    }

    .formStyle {
        position: relative;
        width: 640px;
        margin: 0 auto;

        .link-btn {
            position: absolute;
            right: 0;
            top: 7px;
            width: 60px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            font-size: 12px;
            border-radius: 4px;
            color: #fff;
            background-color: #20a0ff;
        }

        .add-btn {
            position: absolute;
            right: 0;
            top: 7px;
            
        }

        .save-btn {
            float: right;
            margin-top: 10px;
        }

        .abInput {
            position: absolute;
            right: 0;
            top: 4px;
            height: 30px;
        }

        &:last-child {
            margin-bottom: 30px;
        }
    }

    .clear {
        clear: both;
    }

    .line-bold {
        height: 9px;
        border-top: 1px solid #99A9BF;
        background: #F9F9F9;
        margin: 30px 0;
    }

    .el-collapse, .el-collapse-item__header, .el-collapse-item__wrap {
        background: #ffffff;
        border: none;
    }

    .el-collapse-item__wrap {
        padding-top: 20px;
        overflow: visible;
    }

    .el-collapse-item__content {
        padding: 0;
    }

    .el-collapse-item__header {
        padding: 0;
    }

    #container {
        width: 640px;
        height: 180px;
        margin: 0 0 15px;
    }

    .switch-box {
        width: 300px;
    }

    .baseInput {
        float: left;
        margin-bottom: 20px;

        &>span {
            float: left;
            width: 90px;
            height: 30px;
            font-size: 14px;
            color: #666666;
            line-height: 30px;
        }

        .abstract-num {
          float: right;
          span {
            color: red;
          }
        }

        .input-box {
            float: left;
            width: 215px;

            input {
                height: 30px;
            }
        }

        .numBox {
            float: right;
            font-size: 12px;
            line-height: 20px;

            span {
                color: #20a0ff;
            }
        }
    }

    .bigB {
        .input-box {
            width: 550px;

            .el-select {
                width: 550px;
            }
        }

        .el-textarea {
          width: 550px;
        }
    }

    .rightF {
        float: right;
    }

    .over-box {
        width: 670px;
        padding: 15px 15px 0;
        box-sizing: border-box;
        overflow: hidden;
        margin-left: -15px;

        &:nth-of-type(2n) {
            background: #F9F9F9;
        }

        .delete-btn {
            float: right;
            margin-bottom: 20px;
            cursor: pointer;
        }

        .save-sub-btn {
            float: right;
            margin-bottom: 20px;
            margin-left: 12px;
        }
    }
}
</style>