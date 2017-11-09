<template>
    <div class="form-invest">
        <el-collapse v-model="activeNames" @change="collChange">
            <el-collapse-item class="formStyle" title="基本信息" name="1">
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="baseInput bigB">
                        <span>投资机构名称</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.name">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>投资机构法人</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.holder">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>组织机构代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.companyCode">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>成立时间</span>
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
                    <section class="baseInput bigB">
                        <span>注册地址</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.address">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>物业类型</span>
                        <el-select class="input-box"
                                   v-model="base.propertyType"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in propertyTypes"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.nodeCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>上市地点</span>
                        <el-select class="input-box"
                                   v-model="base.city"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in citys"
                                    :key="index"
                                    :label="item.userLoginName"
                                    :value="item.userCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput bigB">
                        <span>公司图片</span>
                        <div class="input-box">
                            <upLoad :path="base.investImg"
                                    :no-del="true"
                                    :bg-path="true"
                                    @changeImg="changeImg"></upLoad>
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
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="公共账号" name="2">
                <section class="upload-list-box">
                    <ewm-upload :path="wxPulic.imgUrl"
                                :title-name="wxPulic.titleName"
                                :width="'160px'"></ewm-upload>

                    <ewm-upload :path="twitter.imgUrl"
                                :title-name="twitter.titleName"
                                :width="'160px'"></ewm-upload>

                    <ewm-upload :path="facebook.imgUrl"
                                :title-name="facebook.titleName"
                                :width="'160px'"></ewm-upload>

                    <ewm-upload :path="wbPulic.imgUrl"
                                :title-name="wbPulic.titleName"
                                :width="'160px'"></ewm-upload>
                </section>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="企业报告员" name="3">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择报告类型">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="报告管理员" name="4">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择报告类型">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="商圈管理员" name="5">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择城市">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="楼盘发布员" name="6">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择商圈">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="楼盘管理员" name="7">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择商圈">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业投资顾问" name="8">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择商圈">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="投资机构发布员" name="9">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择商圈">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="投资机构管理员" name="10">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择商圈">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="证券产品发布员" name="11">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择商圈">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="证券产品管理员" name="12">
                <span class="link-btn">新增</span>
                <div class="qx-box">
                    <el-select class="input-box"
                               v-model="base.city"
                               name="investor"
                               placeholder="请选择商圈">
                        <el-option
                                v-for="(item, index) in citys"
                                :key="index"
                                :label="item.userLoginName"
                                :value="item.userCode">
                        </el-option>
                    </el-select>

                    <el-input
                            class="input-box"
                            placeholder="请输入用户名"
                            v-model="base.address">
                    </el-input>   

                    <el-input
                            class="input-box"
                            placeholder="请输入手机号"
                            v-model="base.address">
                    </el-input>  

                    <div class="btn-box">
                        <i class="el-icon-document"></i>
                        <i class="el-icon-delete2"></i>
                    </div>                  
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    import util from '../../assets/common/util'
    import upLoad from '../../components/common/upLoad'
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
            upLoad,
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

    .qx-box {
        margin-bottom: 10px;

        .input-box {
            float: left;
            width: 190px;
            margin-right: 10px;

            input {
                height: 30px;
            }
        }

        .btn-box {
            font-size: 16px;

            i {
                cursor: pointer;
            }
        }
    }

    .baseInput {
        float: left;
        margin-bottom: 20px;

        &>span {
            float: left;
            width: 90px;
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