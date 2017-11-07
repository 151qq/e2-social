<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
            <el-collapse-item class="formStyle" title="物业基本信息" name="1">
                <div id="container"></div>
                <section v-if="$route.params.type === 'edit'" class="baseInput bigB">
                    <span>楼盘名字</span>
                    <el-input
                            class="input-box"
                            placeholder="请输入内容"
                            :disabled="true"
                            v-model="base.name">
                    </el-input>
                </section>
                <search-box v-if="$route.params.type !== 'edit'" :is-page="true"
                        @mapChange="drawMap"
                        :city="houseCity"></search-box>
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="baseInput">
                        <span>所在城市</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.city"
                                :disabled="true">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>所属商圈</span>
                        <el-select class="input-box"
                                   v-model="base.mall"
                                   name="investor"
                                   :disabled="true"
                                   placeholder="请选择投资顾问">
                            <el-option
                                    v-for="(item, index) in malls"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.nodeCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>投资顾问</span>
                        <el-select class="input-box"
                                   v-model="base.investor"
                                   name="investor"
                                   placeholder="请选择投资顾问">
                            <el-option
                                    v-for="(item, index) in investors"
                                    :key="index"
                                    :label="item.userLoginName"
                                    :value="item.userCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput switch-box rightF">
                        <span>星标</span>
                        <el-switch
                            v-model="base.star"
                            :disabled="isStar"
                            on-value="1"
                            off-value="0">
                        </el-switch>
                    </section>
                    <section class="baseInput">
                        <span>物业类型</span>
                        <el-select class="input-box"
                                    v-model="base.logisticsType"
                                    name="type"
                                    placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in types.propertys"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>楼盘等级</span>
                        <el-select class="input-box"
                                    v-model="base.level"
                                    name="level"
                                    placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in types.level"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput bigB">
                        <span>楼盘地址</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.address">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>剩余年限</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="base.year"></el-input-number>
                    </section>
                    <section class="baseInput rightF">
                        <span>容积率</span>
                        <el-input-number class="input-box" size="small" :min="0" :max="100" v-model="base.ratio"></el-input-number>
                    </section>
                    <section class="baseInput">
                        <span>业主信息</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.owner">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>物业信息</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.property">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>现在租户</span>
                        <el-input
                                class="input-box"
                                type="textarea"
                                autosize
                                placeholder="请输入内容"
                                @change="rentChange"
                                v-model="base.rent">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>租户总数</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.rentCount">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>所属地块</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.massif">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>物业面积</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="base.area"></el-input-number>
                    </section>
                    <section class="baseInput rightF">
                        <span>总层数</span>
                        <el-input-number class="input-box" size="small" :min="1" v-model="base.plies"></el-input-number>
                    </section>
                    <section class="baseInput">
                        <span>电梯数</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="base.elevator"></el-input-number>
                    </section>
                    <section class="baseInput rightF">
                        <span>空调数</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="base.conditioner"></el-input-number>
                    </section>
                    <section class="baseInput">
                        <span>地板类型</span>
                        <el-select class="input-box"
                                    v-model="base.floor"
                                    name="floor"
                                    placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in types.floors"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>物业持有</span>
                        <el-select class="input-box"
                                    v-model="base.holding"
                                    name="holding"
                                    placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in types.hold"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput bigB">
                        <span>交通状况</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.traffic">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>对标物业</span>
                        <div class="input-box">
                            <el-select
                                    v-model="base.benchmark"
                                    multiple
                                    filterable
                                    allow-create
                                    name="benchmark"
                                    :multiple-limit="3"
                                    placeholder="请选择3个物业标签">
                                <el-option
                                        v-for="item in benchList"
                                        :key="item.housesId"
                                        :label="item.housesDesc"
                                        :value="String(item.housesId)">
                                </el-option>
                            </el-select>
                        </div>
                    </section>

                    <section class="baseInput bigB">
                        <span>标志图片</span>
                        <div class="input-box">
                            <upLoad :path="base.housesImg"
                                    :no-del="true"
                                    :bg-path="true"
                                    @changeImg="changeImg"></upLoad>
                        </div>
                    </section>

                    
                    <div class="clear"></div>
                </div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveBase">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业交易历史" name="2">
                <router-link class="link-btn" target="_blank" :to="{name: 'changes'}">明细</router-link>
                <div class="over-box">
                    <section class="baseInput">
                        <span>交易日期</span>
                        <el-date-picker
                                class="input-box"
                                v-model="changes.date"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerPre">
                        </el-date-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>价格(万)</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="changes.price"></el-input-number>
                    </section>
                    <section class="baseInput">
                        <span>交易甲方</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="changes.changeA">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>交易乙方</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="changes.changeB">
                        </el-input>
                    </section>
                    <div class="clear"></div>
                    <el-button class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                               @click="saveChanges(true)">保存</el-button>
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业租金历史" name="3">
                <router-link class="link-btn" target="_blank" :to="{name: 'rents'}">明细</router-link>
                <div class="over-box">
                    <section class="baseInput">
                        <span>交易日期</span>
                        <el-date-picker
                                class="input-box"
                                v-model="rents.date"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>高区租金</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="rents.priceT"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <section class="baseInput rightF">
                        <span>中区租金</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="rents.priceM"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <section class="baseInput rightF">
                        <span>低区租金</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="rents.priceB"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <el-button class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                               @click="saveRents(true)">保存</el-button>
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业估值历史" name="4">
                <router-link class="link-btn" target="_blank" :to="{name: 'evalues'}">明细</router-link>
                <div class="over-box">
                    <section class="baseInput">
                        <span>交易日期</span>
                        <el-date-picker
                                class="input-box"
                                v-model="evalues.createDate"
                                type="year"
                                placeholder="选择年">
                        </el-date-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>总租金(万)</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="evalues.rentValue"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <section class="baseInput rightF">
                        <span>估值(万)</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="evalues.valuation"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <section class="baseInput rightF">
                        <span>静总租金</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="evalues.netRentValue"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <section class="baseInput rightF">
                        <span>资本化率</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="evalues.capRate"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <el-button class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                               @click="saveEvalues(true)">保存</el-button>
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle editShow" title="物业评述" name="5">
                <edit-box ref="editForm"></edit-box>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业外观图片" name="6">
                <upload-list :img-lists="appearance" :type="'appearance'" @showimg="showImg"
                                @imgChange="imgListChange"></upload-list>
                <div class="clear"></div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveData('appearance')">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业公共区域图片" name="7">
                <upload-list :img-lists="public" :type="'publics'" @showimg="showImg"
                            @imgChange="imgListChange"></upload-list>
                <div class="clear"></div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveData('publics')">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业周围环境图片" name="8">
                <upload-list :img-lists="surround" :type="'surround'" @showimg="showImg"
                            @imgChange="imgListChange"></upload-list>
                <div class="clear"></div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveData('surround')">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
        </el-collapse>

        <swiper-img :is-show="isShow" :index="index" :big-imgs="bigImgs"></swiper-img>
        <add-house :is-add="isAdd"
                :city="houseCity"
                :house-data="houseData"
                @addHouse="addHouse"
                ref="addHouse"></add-house>
    </div>
</template>
<script>
    import searchBox from '../common/search-box.vue'
    import util from '../../assets/common/util'
    import upLoad from '../../components/common/upLoad'
    import uploadList from '../../components/index/upload-list'
    import swiperImg from '../../components/common/swiper-img.vue'
    import editBox from '../../components/common/edit'
    import addHouse from './addHouse'

    export default {
        props: ['listInfo', 'articleInfo'],
        data () {
            return {
                base: {
                    name: '',
                    point: {
                        lng: '',
                        lat: ''
                    },
                    city: '',
                    mall: '',
                    address: '',
                    logisticsType: '',
                    level: '',
                    massif: '',
                    year: 0,
                    ratio: 0,
                    star: '0',
                    owner: '',
                    property: '',
                    rent: '',
                    area: '',
                    plies: '',
                    elevator: '',
                    conditioner: '',
                    floor: '',
                    benchmark: [],
                    holding: '',
                    traffic: '',
                    investor: '',
                    rentCount: 0,
                    housesImg: ''
                },
                changes: {
                    id: '',
                    date: '',
                    price: '',
                    changeA: '',
                    changeB: ''
                },
                rents: {
                    id: '',
                    date: '',
                    priceT: '',
                    priceM: '',
                    priceB: ''
                },
                evalues: {
                    id: '',
                    createDate: '',
                    valuation: '',
                    rentValue: '',
                    netRentValue: '',
                    capRate: ''
                },
                addBase: {},
                malls: [],
                investors: [],
                types: {
                    propertys: [],
                    level: [],
                    rent: [],
                    floors: [],
                    hold: [],
                    measure: []
                },
                benchList: [],
                activeNames: ['1'],
                pickerPre: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now()
                    }
                },
                isShow: {
                    value: false
                },
                index: 0,
                bigImgs: [],
                articleinfo: [],
                appearance: [],
                public: [],
                surround: [],
                houseCity: '',
                isAdd: {
                    value: false
                },
                houseData: {
                    name: '',
                    pointer: {}
                },
                timer: null,
                isStar: false
            }
        },
        mounted () {
            var map = new window.BMap.Map('container')
            this.map = map
            var point = new window.BMap.Point(116.409, 39.918)
            map.centerAndZoom(point, 15)

            this.getTypes()
            this.getInvestors()

            this.type = this.$route.params.type
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            document.title = '楼盘维护'
            this.addBase = Object.assign({}, this.base)
        },
        methods: {
            getAllData () {
                this.getBase()
                this.getArticle()
                this.getAppearance()
                this.getPublic()
                this.getSurround()

                if (this.timer) {
                    clearInterval(this.timer)
                }

                // this.timer = setInterval(() => {
                //     this.saveAll()
                // }, 180000)
                
                this.bigImgs = []
            },
            rentChange () {
                if (this.base.rent != '') {
                    this.base.rentCount = 1
                }

                if (this.base.rent.indexOf(',') > -1) {
                    this.base.rentCount = this.base.rent.split(',').length
                } else if (this.base.rent.indexOf('，') > -1) {
                    this.base.rentCount = this.base.rent.split('，').length
                } else if (this.base.rent.indexOf('、') > -1) {
                    this.base.rentCount = this.base.rent.split('、').length
                }
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
                        this.drawMap()
                        this.getMalls()
                        this.getStar()
                        this.getBenchList()
                    }, 0)
                })
            },
            getAppearance () {
                util.request({
                    method: 'post',
                    interface: 'houseImages',
                    data: {
                        fileCode: localStorage.getItem("id"),
                        catalogCode: 'appearance'
                    }
                }).then(res => {
                    this.appearance = res.result.result
                    this.setImgs()
                })
            },
            getPublic () {
                util.request({
                    method: 'post',
                    interface: 'houseImages',
                    data: {
                        fileCode: localStorage.getItem("id"),
                        catalogCode: 'publics'
                    }
                }).then(res => {
                    this.public = res.result.result
                    this.setImgs()
                })
            },
            getSurround () {
                util.request({
                    method: 'post',
                    interface: 'houseImages',
                    data: {
                        fileCode: localStorage.getItem("id"),
                        catalogCode: 'surround'
                    }
                }).then(res => {
                    this.surround = res.result.result
                    this.setImgs()
                })
            },
            imgListChange (type) {
                this.bigImgs = []
                this.bigImgs = this.bigImgs.concat(this.appearance, this.public, this.surround)
                console.log(this.bigImgs, 'bigImgs', 'chang')
            },
            setImgs () {
                if (this.appearance.length && this.public.length && this.surround.length && !this.bigImgs.length) {
                    this.bigImgs = this.bigImgs.concat(this.appearance, this.public, this.surround)
                    console.log(this.bigImgs, 'bigImgs')
                }
            },
            getArticle () {
                util.request({
                    method: 'get',
                    interface: 'findArticleByCatalogCode',
                    data: {
                        catalogCode: localStorage.getItem("id")
                    }
                }).then(res => {
                    if (res.result.success !== '0' && res.result.result.length) {
                        var resData = res.result.result[0]
                        this.articleinfo = resData.fileAreaList ? resData.fileAreaList : []
                        localStorage.setItem("htmlHouseCode", resData.html5PageCode)
                        var data = {
                            article: this.articleinfo,
                            bgImg: resData.backgroundImg
                        }
                        this.$refs.editForm.editInte(data)
                    }
                })
            },
            getStar () {
                util.request({
                    method: 'post',
                    interface: 'validateHousesStart',
                    data: {
                        cityCode: localStorage.getItem("cityCode")
                    }
                }).then(res => {
                    if (res.result.success == '1') {
                        if (res.result.result == 1) {
                            this.isStar = false
                        } else if (res.result.result == 0 && this.base.rent == '0') {
                            this.isStar = true
                        }
                    }
                })
            },
            showImg (index) {
                this.index = index
                this.isShow.value = true
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
            saveChanges (isShow) {
                var formData = {
                    id: localStorage.getItem("id"),
                    type: 'changes',
                    data: this.changes
                }

                if (this.changes.date == '') {
                    this.$message({
                        message: '请务填写交易日期！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.changes.price == '') {
                    this.$message({
                        message: '请务填写交易价格！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.changes.changeA == '') {
                    this.$message({
                        message: '请务填写交易甲方！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.changes.changeB == '') {
                    this.$message({
                        message: '请务填写交易乙方！',
                        type: 'warning'
                    })
                    return false
                }

                util.request({
                    method: 'post',
                    interface: 'houseInfo',
                    data: formData
                }).then(res => {
                    if (res.result.success == '1') {
                        this.changes = {
                            id: '',
                            date: '',
                            price: '',
                            changeA: '',
                            changeB: ''
                        }

                        if (isShow) {
                            this.$message({
                                message: '恭喜，已存入相关明细',
                                type: 'success'
                            })
                        }
                    }
                })
            },
            saveRents (isShow) {
                if (this.rents.date == '') {
                    this.$message({
                        message: '请务填写交易日期！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.rents.priceT == '' && this.rents.priceM == '' && this.rents.priceB == '') {
                    this.$message({
                        message: '请务填写租金！',
                        type: 'warning'
                    })
                    return false
                }

                var formData = {
                    id: localStorage.getItem("id"),
                    type: 'rents',
                    data: {
                        createDate: this.rents.date,
                        priceT: this.rents.priceT,
                        priceM: this.rents.priceM,
                        priceB: this.rents.priceB
                    }
                }

                util.request({
                    method: 'post',
                    interface: 'houseInfo',
                    data: formData
                }).then(res => {
                    if (res.result.success == '1') {
                        this.rents = {
                            date: '',
                            priceT: '',
                            priceM: '',
                            priceB: ''
                        }

                        if (isShow) {
                            this.$message({
                                message: '恭喜，已存入相关明细',
                                type: 'success'
                            })
                        }
                    }
                })
            },
            saveEvalues (isShow) {
                if (this.evalues.createDate == '') {
                    this.$message({
                        message: '请务填写交易日期！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.evalues.valuation == '' && this.evalues.rentValue == '' && this.evalues.netRentValue == '' && this.evalues.capRate == '') {
                    this.$message({
                        message: '请务填写租金！',
                        type: 'warning'
                    })
                    return false
                }

                var formData = {
                    id: localStorage.getItem("id"),
                    type: 'valuation',
                    data: {
                        housesGps: this.base.point,
                        createDate: this.evalues.createDate,
                        rentValue: this.evalues.rentValue,
                        netRentValue: this.evalues.netRentValue,
                        valuation: this.evalues.valuation,
                        capRate: this.evalues.capRate
                    }
                }

                util.request({
                    method: 'post',
                    interface: 'houseInfo',
                    data: formData
                }).then(res => {
                    if (res.result.success == '1') {
                        this.evalues = {
                            createDate: '',
                            rentValue: '',
                            netRentValue: '',
                            valuation: '',
                            capRate: ''
                        }

                        if (isShow) {
                            this.$message({
                                message: '恭喜，已存入相关明细',
                                type: 'success'
                            })
                        }
                    }
                })
            },
            saveData (type) {
                var formData = {
                    id: localStorage.getItem("id"),
                    type: type,
                    data: this[type]
                }

                util.request({
                    method: 'post',
                    interface: 'houseInfo',
                    data: formData
                }).then(res => {
                    console.log(res)
                })
            },
            saveAll () {
                this.saveBase()
                this.saveChanges()
                this.saveRents()
                this.$refs.articleForm.saveAll()
                this.saveData('appearance')
                this.saveData('public')
                this.saveData('surround')
            },
            showAdd (data) {
                this.houseCity = data.houseCity
                this.addBase.city = data.houseCity
                this.addBase.mall = data.houseMall
                this.isAdd.value = true
                setTimeout(() => {
                    this.getMalls()
                    this.houseData = {
                        name: '',
                        pointer: {}
                    }
                    this.$refs.addHouse.initMap()
                }, 0)
            },
            addHouse (data) {
                this.addBase.name = data.name
                this.addBase.point = data.point
                this.addBase.address = data.address
                console.log('addBase')

                var formData = {
                    type: 'base',
                    data: this.addBase
                }

                util.request({
                    method: 'post',
                    interface: 'houseInfo',
                    data: formData
                }).then(res => {
                    localStorage.setItem("id", res.result.result.id)
                    var obj = {
                        id: '',
                        title: this.base.name,
                        html5CatalogCode: res.result.result.id,
                        isHouse: true
                    }
                    this.$refs.editForm.saveArticle(obj)
                    this.isAdd.value = false
                    this.$parent.$refs.listBox.reloadList(res.result.result.id)
                })
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
            getBenchList () {
                util.request({
                    method: 'get',
                    interface: 'benchList',
                    data: {
                        cityCode: localStorage.getItem("cityCode"),
                        gps: this.base.point
                    }
                }).then(res => {
                    this.benchList = res.result.result
                })
            },
            drawMap (mapInfo) {
                if (mapInfo) {
                    this.base.point = {
                        lng: mapInfo.point.lng,
                        lat: mapInfo.point.lat
                    }
                    this.base.name = mapInfo.title
                    var point = new window.BMap.Point(mapInfo.point.lng, mapInfo.point.lat)
                } else {
                    var pointData = this.base.point.split(',')
                    var point = new window.BMap.Point(pointData[1], pointData[0])
                }
                this.map.clearOverlays()
                this.map.panTo(point)
                var marker = new BMap.Marker(point)
                this.map.addOverlay(marker)
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
            },
            getInvestors () {
                util.request({
                    method: 'get',
                    interface: 'getInvestors',
                    data: {
                        roleCode: 'entadconsultant'
                    }
                }).then(res => {
                    this.investors = res.result.result
                })
            }
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        components: {
            searchBox,
            upLoad,
            uploadList,
            swiperImg,
            editBox,
            addHouse
        }
    }
</script>
<style lang="scss">
    .form-b {
        margin-top: 30px;
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
            width: 70px;
            font-size: 14px;
            color: #666666;
            line-height: 30px;
        }

        .input-box {
            float: left;
            width: 235px;

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
            width: 575px;

            .el-select {
                width: 575px;
            }
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
</style>