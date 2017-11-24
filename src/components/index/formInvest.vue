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
                                v-model="base.enterpriseCname">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>投资机构法人</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseLegalPerson">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>组织机构代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseCode">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>成立时间</span>
                        <el-date-picker
                                class="input-box"
                                v-model="base.enterpriseRegDate"
                                placeholder="选择日期"
                                :picker-options="pickerPre">
                        </el-date-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>企业类型</span>
                        <el-select class="input-box"
                                   v-model="base.enterpriseType"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in types.finance_org_type"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput bigB">
                        <span>注册地址</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseRegPlace">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>办公地点</span>
                        <el-select class="input-box"
                                   v-model="base.enterpriseLogisticCity"
                                   name="investor"
                                   @change="cityChange"
                                   placeholder="请选择">
                            <el-option-group
                                v-for="(group, index) in cityList"
                                :key="index"
                                :label="group.province">
                                <el-option
                                    v-for="(item, index1) in group.citys"
                                    :key="index1"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>邮编</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="base.enterpriseLogisticZipcode">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>详细地址</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseLogisticAddr">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>上市机构</span>
                        <el-select class="input-box"
                                   v-model="base.enterpriseStockSite"
                                   name="investor"
                                   :disabled="true"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in types.finance_market"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>股票代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.enterpriseStockCode">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>公司官网</span>
                        <el-input
                                class="input-box"
                                @change="checkWebSite"
                                placeholder="请输入内容"
                                v-model="base.enterpriseWebLink">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>公司图片</span>
                        <div class="input-box">
                            <upload :path="base.enterpriseLogoUrl"
                                    :no-del="true"
                                    :bg-path="true"
                                    @changeImg="changeImg"></upload>
                        </div>
                    </section>

                    <section class="baseInput bigB">
                        <span>公司简介</span>
                        <div class="input-box">
                            <ueditor
                                v-if="isBase"
                                :editor-id="'investDesc' + base.id"
                                :editor-type="'text'"
                                :content="base.enterpriseDesc"
                                @setContent="setContent"></ueditor>
                        </div>
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
                    <ewm-upload :path="base.enterpriseEntprisewechatQrcode"
                                :title-name="'微信公众号'"
                                :id-name="'wxPulic'"
                                @changeImg='wxPulicImg'
                                :width="'160px'"></ewm-upload>

                    <ewm-upload :path="base.enterpriseTwitterQrcode"
                                :title-name="'twitter账号'"
                                :id-name="'twitterName'"
                                @changeImg='twitterImg'
                                :width="'160px'"></ewm-upload>

                    <ewm-upload :path="base.enterpriseFacebookQrcode"
                                :title-name="'facebook账号'"
                                :id-name="'facebookName'"
                                @changeImg='facebookImg'
                                :width="'160px'"></ewm-upload>

                    <ewm-upload :path="base.enterpriseSinamicroblogQrcode"
                                :title-name="'微博账号'"
                                :id-name="'wbName'"
                                @changeImg='wbImg'
                                :width="'160px'"></ewm-upload>
                </section>
            </el-collapse-item>
            <template v-if="isQYBG">
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
            </template>
            <template v-if="isBGGL">
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
            </template>
            <template v-if="isSQGL">
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
            </template>
            <template v-if="isLPFB">
                <div class="line-bold"></div>
                <el-collapse-item class="formStyle" title="楼盘发布员" name="6">
                    <span class="link-btn">新增</span>
                    <div class="qx-box">
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
            </template>
            <template v-if="isLPGL">
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
            </template>
            <template v-if="isWYTZ">
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
            </template>
            <template v-if="isTZJG">
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
            </template>
            <template v-if="isTZGL">
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
            </template>
            <template v-if="isZQCP">
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
            </template>
            <template v-if="isZQGL">
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
            </template>
        </el-collapse>
    </div>
</template>
<script>
    import util from '../../assets/common/util'
    import upload from '../../components/common/upload'
    import ewmUpload from '../../components/common/ewm-upload'
    import ueditor from '../../components/common/ueditor'

    export default {
        props: ['listInfo', 'articleInfo'],
        data () {
            return {
                base: {
                    id: '',
                    enterpriseCname: '',
                    enterpriseCode: '',
                    enterpriseRegDate: '',
                    enterpriseType: '',
                    enterpriseLevel: '',
                    enterpriseRegPlace: '',
                    enterpriseLogisticCity: '',
                    enterpriseLogisticZipcode: '',
                    enterpriseLogisticAddr: '',
                    enterpriseStockSite: '',
                    enterpriseStockCode: '',
                    enterpriseWebLink: '',
                    enterpriseLogoUrl: '',
                    enterpriseDesc: '',
                    enterpriseEntprisewechatQrcode: '',
                    enterpriseTwitterQrcode: '',
                    enterpriseFacebookQrcode: '',
                    enterpriseSinamicroblogQrcode: ''
                },
                isBase: false,
                activeNames: ['1'],
                pickerPre: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now()
                    }
                },
                cityList: [],
                postList: [],
                cityData: [],
                citys: [],
                types: {
                    finance_org_type: [],
                    finance_market: []
                },
                timer: null
            }
        },
        mounted () {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            document.title = '投资机构'

            this.getTypes()
            this.getCitys()
        },
        computed: {
            // 企业报告
            isQYBG () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_0', 'finance_org_type_4']
                return type && arr.indexOf(type) > -1
            },
            // 报告管理
            isBGGL () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_0', 'finance_org_type_4']
                return type && arr.indexOf(type) > -1
            },
            // 商圈管理
            isSQGL () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_0']
                return type && arr.indexOf(type) > -1
            },
            // 楼盘发布
            isLPFB () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_0']
                return type && arr.indexOf(type) > -1
            },
            // 楼盘管理
            isLPGL () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_0']
                return type && arr.indexOf(type) > -1
            },
            // 物业投资顾问
            isWYTZ () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_0']
                return type && arr.indexOf(type) > -1
            },
            // 投资机构发布
            isTZJG () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_4']
                return type && arr.indexOf(type) == -1
            },
            // 投资机构管理
            isTZGL () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_4']
                return type && arr.indexOf(type) == -1
            },
            // 证券发布
            isZQCP () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_0', 'finance_org_type_7']
                return type && arr.indexOf(type) > -1
            },
            // 证券管理
            isZQGL () {
                var type = this.base.enterpriseType
                var arr = ['finance_org_type_0', 'finance_org_type_7']
                return type && arr.indexOf(type) > -1
            }
        },
        methods: {
            wxPulicImg (data) {
                this.base.enterpriseEntprisewechatQrcode = data.url
                this.saveBase()
            },
            twitterImg (data) {
                this.base.enterpriseTwitterQrcode = data.url
                this.saveBase()
            },
            facebookImg (data) {
                this.base.enterpriseFacebookQrcode = data.url
                this.saveBase()
            },
            wbImg (data) {
                this.base.enterpriseSinamicroblogQrcode = data.url
                this.saveBase()
            },
            getAllData () {
                this.isBase = false
                this.getBase()

                if (this.timer) {
                    clearInterval(this.timer)
                }

                // this.timer = setInterval(() => {
                //     this.saveAll()
                // }, 180000)
            },
            getBase () {
                util.request({
                    method: 'get',
                    interface: 'getInvestBase',
                    data: {
                        enterpriseCode: localStorage.getItem('id')
                    }
                }).then(res => {
                    if (res.result.success == '0') {
                        setTimeout(() => {
                            this.isBase = true
                        }, 0)
                        this.$message.error(res.result.message)
                        return
                    }

                    this.base = res.result.result

                    setTimeout(() => {
                        this.isBase = true
                    }, 0)
                })
            },
            getTypes () {
                util.request({
                    method: 'get',
                    interface: 'investTypes',
                    data: {}
                }).then(res => {
                    if (res.result.success == '1') {
                        this.types = res.result.result
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            getCitys () {
                util.request({
                    method: 'get',
                    interface: 'getCitys',
                    data: {}
                }).then(res => {
                    if (res.result.success == '1') {
                        this.cityList = res.result.results
                        var citys = []
                        var posts = []

                        res.result.results.forEach((item) => {
                            citys = citys.concat(item.citys)
                            posts = posts.concat(item.posts)
                        })

                        this.cityData = citys
                        this.postList = posts
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            cityChange () {
                console.log(this.cityData, this.base.enterpriseLogisticCity, this.postList)

                for (var i = 0, len = this.cityData.length; i < len; i++) {
                    if (this.cityData[i] == this.base.enterpriseLogisticCity) {
                        this.base.enterpriseLogisticZipcode = this.postList[i]
                        break
                    }
                }
            },
            checkWebSite () {
                var webSite = this.base.enterpriseWebLink
                this.base.enterpriseWebLink = webSite.replace(/[\u4e00-\u9fa5]/g,'')
            },
            setContent (data) {
                this.base.enterpriseDesc = data.content
            },
            collChange () {
                localStorage.setItem("houseColl", this.activeNames)
            },
            changeImg (data) {
                this.base.enterpriseLogoUrl = data.url
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
            saveBase () {
                if (this.base.enterpriseRegDate) {
                    this.base.enterpriseRegDate = this.formDataDate(this.base.enterpriseRegDate)
                }
                
                util.request({
                    method: 'post',
                    interface: 'saveInvestBase',
                    data: this.base
                }).then(res => {
                    this.$parent.$refs.listBox.loadList('reload')
                })
            },
            saveAll () {
                // this.saveBase()
            }
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        components: {
            upload,
            ewmUpload,
            ueditor
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

        .edui-default .edui-editor {
            border-color: #bfcbd9;
        }

        .edui-editor-iframeholder {
            min-height: 150px;
        }

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