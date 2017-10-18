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
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>星标</span>
                        <el-select class="input-box"
                                    v-model="base.star"
                                    name="star"
                                    placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in stars"
                                    :key="index"
                                    :label="item.text"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>物业类型</span>
                        <el-select class="input-box"
                                    v-model="base.type"
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
                        <span>所属地块</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.massif">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>剩余年限</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="base.year"></el-input-number>
                    </section>
                    <section class="baseInput rightF">
                        <span>容积率(%)</span>
                        <el-input-number class="input-box" size="small" :min="0" :max="100" v-model="base.ratio"></el-input-number>
                    </section>
                    <section class="baseInput bigB">
                        <span>业主信息</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.owner">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
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
                                v-model="base.rent">
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
                                    placeholder="请选择文章标签">
                                <el-option
                                        v-for="item in benchList"
                                        :key="item.id"
                                        :label="item.title"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </section>
                    <div class="clear"></div>
                </div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveData('base')">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业交易历史" name="2">
                <el-button class="add-btn" type="primary" size="small" icon="plus" @click="addChange">增加</el-button>
                <div v-for="(item, index) in changes" :key="index" class="over-box">
                    <section class="baseInput">
                        <span>交易日期</span>
                        <el-date-picker
                                class="input-box"
                                v-model="item.date"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerPre">
                        </el-date-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>交易价格</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="item.price"></el-input-number>
                    </section>
                    <section class="baseInput">
                        <span>交易甲方</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="item.changeA">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>交易乙方</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="item.changeB">
                        </el-input>
                    </section>
                    <div class="clear"></div>
                    <el-button class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                               @click="saveData('changes', item.id, index)">保存</el-button>
                    <el-button class="delete-btn" type="danger" :plain="true" size="small" icon="delete" @click="deleteChange(index, item.id)">删除</el-button>
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业租金历史" name="3">
                <el-button class="add-btn" type="primary" size="small" icon="plus" @click="addRent">增加</el-button>
                <div v-for="(item, index) in rents" :key="index" class="over-box">
                    <section class="baseInput">
                        <span>交易日期</span>
                        <el-date-picker
                                class="input-box"
                                v-model="item.date"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerPre">
                        </el-date-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>高区租金</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="item.priceT"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <section class="baseInput rightF">
                        <span>中区租金</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="item.priceM"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <section class="baseInput rightF">
                        <span>低区租金</span>
                        <el-input-number class="input-box" size="small" :min="0" v-model="item.priceB"></el-input-number>
                    </section>
                    <div class="clear"></div>
                    <el-button class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                               @click="saveData('rents', item.id, index)">保存</el-button>
                    <el-button class="delete-btn" type="danger" :plain="true" size="small" icon="delete" @click="deleteRent(index, item.id)">删除</el-button>
                </div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle editShow" title="物业评述" name="4">
                <edit-box ref="editForm"></edit-box>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业外观图片" name="5">
                <upload-list :img-lists="appearance" @showimg="showImg"></upload-list>
                <div class="clear"></div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveData('appearance')">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业公共区域图片" name="6">
                <upload-list :img-lists="public" @showimg="showImg"></upload-list>
                <div class="clear"></div>
                <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveData('public')">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="物业周围环境图片" name="7">
                <upload-list :img-lists="surround" @showimg="showImg"></upload-list>
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
                    type: '',
                    level: '',
                    massif: '',
                    year: 0,
                    ratio: 1,
                    star: 0,
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
                    investor: ''
                },
                changes: [
                    {
                        date: '',
                        price: '',
                        changeA: '',
                        changeB: ''
                    }
                ],
                rents: [
                    {
                        date: '',
                        priceT: '',
                        priceM: '',
                        priceB: ''
                    }
                ],
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
                stars: [
                    {
                        value: 0,
                        text: '否'
                    },
                    {
                        value: 1,
                        text: '是'
                    }
                ],
                benchList: [],
                activeNames: ['1'],
                pickerPre: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7;
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
                timer: null
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
        },
        methods: {
            getAllData () {
                this.getBase()
                this.getChanges()
                this.getRents()
                this.getArticle()
                this.getAppearance()
                this.getPublic()
                this.getSurround()
                this.getBenchList()

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
                    interface: 'base',
                    data: {
                        id: localStorage.getItem("id")
                    }
                }).then(res => {
                    this.base = Object.assign(this.base, res.result.result.base)
                    setTimeout(() => {
                        this.drawMap()
                        this.getMalls()
                    }, 0)
                })
            },
            getAppearance () {
                util.request({
                    method: 'get',
                    interface: 'appearance',
                    data: {
                        id: localStorage.getItem("id")
                    }
                }).then(res => {
                    this.appearance = res.result.result
                })
            },
            getPublic () {
                util.request({
                    method: 'get',
                    interface: 'public',
                    data: {
                        id: localStorage.getItem("id")
                    }
                }).then(res => {
                    this.public = res.result.result
                })
            },
            getSurround () {
                util.request({
                    method: 'get',
                    interface: 'surround',
                    data: {
                        id: localStorage.getItem("id")
                    }
                }).then(res => {
                    this.surround = res.result.result
                })
            },
            getArticle () {
                util.request({
                    method: 'get',
                    interface: 'findArticleByFileCode',
                    data: {
                        fileCode: localStorage.getItem("id")
                    }
                }).then(res => {
                    if (res.result.success !== '0') {
                        var resData = res.result.result
                        this.articleinfo = resData.fileAreaList ? resData.fileAreaList : []
                        this.base.name = resData.html5PageTitle

                        var data = {
                            article: this.articleinfo,
                            bgImg: resData.backgroundImg
                        }
                        this.$refs.editForm.editInte(data)
                    }
                })
            },
            getChanges () {
                util.request({
                    method: 'get',
                    interface: 'changes',
                    data: {
                        id: localStorage.getItem("id")
                    }
                }).then(res => {
                    this.changes = res.result.result.changes
                    console.log(res.result.result.changes)
                })
            },
            getRents () {
                util.request({
                    method: 'get',
                    interface: 'rent',
                    data: {
                        id: localStorage.getItem("id")
                    }
                }).then(res => {
                    this.rents = res.result.result.rents
                })
            },
            showImg (index) {
                util.request({
                    method: 'get',
                    interface: 'bigImgs',
                    data: {
                        id: localStorage.getItem("id")
                    }
                }).then(res => {
                    this.bigImgs = res.result.datas
                    console.log(this.bigImgs)
                    this.index = index
                    this.isShow.value = true
                })
            },
            collChange () {
                localStorage.setItem("houseColl", this.activeNames)
            },
            saveData (type, itemId, index) {
                var formData = {
                    id: localStorage.getItem("id"),
                    type: type,
                    data: this[type],
                }

                if (itemId !== undefined) {
                    formData.itemId = itemId
                }

                if (index !== undefined) {
                    formData.data = this[type][index]
                }

                util.request({
                    method: 'post',
                    interface: 'houseInfo',
                    data: formData
                }).then(res => {
                    if (type === 'base') {
                        localStorage.setItem("id", res.result.result.id)
                    }
                })
            },
            saveAll () {
                this.saveData('base')
                this.saveAllChanges()
                this.saveAllRents()
                this.$refs.articleForm.saveAll()
                this.saveData('appearance')
                this.saveData('public')
                this.saveData('surround')
            },
            saveAllChanges () {
                this.changes.forEach((item, index) => {
                    this.saveData('changes', item.id, index)
                })
            },
            saveAllRents () {
                this.rents.forEach((item, index) => {
                    this.saveData('rents', item.id, index)
                })
            },
            showAdd (data) {
                this.houseCity = data.houseCity
                this.base.city = data.houseCity
                this.base.mall = data.houseMall
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
                this.base.name = data.name
                this.base.point = data.point

                var formData = {
                    type: 'base',
                    data: this.base
                }

                util.request({
                    method: 'post',
                    interface: 'houseInfo',
                    data: formData
                }).then(res => {
                    localStorage.setItem("id", res.result.result.id)
                    var obj = {
                        id: '',
                        html5CatalogCode: res.result.result.id
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
                        id: localStorage.getItem("id")
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
            },
            addChange () {
                var data = {
                    date: '',
                    price: '',
                    changeA: '',
                    changeB: '',
                    block: ''
                }
                this.changes.push(data)
            },
            deleteChange (index) {
                if (this.changes.length === 1) {
                    this.$message({
                        message: '至少要保留一条交易记录',
                        type: 'warning'
                    })
                    return false
                }
                this.changes.splice(index, 1)
            },
            addRent () {
                var data = {
                    date: '',
                    priceT: '',
                    priceM: '',
                    priceB: ''
                }
                this.rents.push(data)
            },
            deleteRent (index) {
                if (this.rents.length === 1) {
                    this.$message({
                        message: '至少要保留一条租金记录',
                        type: 'warning'
                    })
                    return false
                }
                this.rents.splice(index, 1)
            }
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        components: {
            searchBox,
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

    .baseInput {
        float: left;
        margin-bottom: 20px;

        &>span {
            float: left;
            width: 65px;
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