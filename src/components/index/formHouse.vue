<template>
    <div class="form-b">
        <section v-if="isId">
            <el-collapse v-model="activeNames" @change="collChange">
                <el-collapse-item class="formStyle" title="物业基本信息" name="1">
                    <div id="container"></div>
                    <section class="baseInput">
                        <span>楼盘名字</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="base.housesCname">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>楼盘简称</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                v-model="base.name"
                                @blur="validateHouseCname">
                        </el-input>
                    </section>
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
                                        :label="'无'"
                                        :value="''">
                                </el-option>
                                <el-option
                                        v-for="(item, index) in malls"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.nodeCode">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="baseInput switch-box">
                            <span>星标</span>
                            <el-switch
                                v-model="base.star"
                                :disabled="isStar"
                                on-value="1"
                                off-value="0">
                            </el-switch>
                        </section>
                        <section class="baseInput rightF">
                            <span>楼盘等级</span>
                            <el-select class="input-box"
                                        v-model="base.level"
                                        name="level"
                                        placeholder="请选择">
                                <el-option
                                        :label="'无'"
                                        :value="''">
                                </el-option>
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
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="1" v-model="base.year"></el-input>
                        </section>
                        <section class="baseInput rightF">
                            <span>容积率</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="base.ratio"></el-input>
                        </section>
                        <section class="baseInput">
                            <span>网站地址</span>
                            <el-input
                                    class="input-box"
                                    @change="checkWebSite"
                                    placeholder="请输入内容"
                                    v-model="base.webSite">
                            </el-input>
                        </section>
                        <section class="baseInput rightF">
                            <span>物业信息</span>
                            <el-select class="input-box"
                                        v-model="base.property"
                                        name="property"
                                        placeholder="请选择">
                                <el-option
                                        :label="'无'"
                                        :value="''">
                                </el-option>
                                <el-option
                                        v-for="(item, index) in housesList"
                                        :key="index"
                                        :label="item.enterpriseCname"
                                        :value="item.enterpriseCode">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="baseInput bigB">
                            <span>业主信息</span>
                            <el-select class="input-box"
                                       v-model="ownerList"
                                       multiple
                                       name="owner"
                                       placeholder="请选择">
                                <el-option
                                        v-for="(item, index) in investList"
                                        :key="index"
                                        :label="item.enterpriseCname"
                                        :value="item.enterpriseCode">
                                </el-option>
                            </el-select>
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
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="1" v-model="base.rentCount"></el-input>
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
                            <span>面积(m²)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="base.area"></el-input>
                        </section>
                        <section class="baseInput rightF">
                            <span>总层数</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="1" v-model="base.plies"></el-input>
                        </section>
                        <section class="baseInput">
                            <span>层高(m)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="base.height"></el-input>
                        </section>
                        <section class="baseInput rightF">
                            <span>车位</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="1" v-model="base.park"></el-input>
                        </section>
                        <section class="baseInput">
                            <span>电梯数</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="1" v-model="base.elevator"></el-input>
                        </section>
                        <section class="baseInput rightF">
                            <span>空调数</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="1" v-model="base.conditioner"></el-input>
                        </section>
                        <section class="baseInput">
                            <span>地板类型</span>
                            <el-select class="input-box"
                                        v-model="base.floor"
                                        name="floor"
                                        placeholder="请选择">
                                <el-option
                                        :label="'无'"
                                        :value="''">
                                </el-option>
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
                                        :label="'无'"
                                        :value="''">
                                </el-option>
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
                              type="textarea"
                              :rows="4"
                              :maxlength="500"
                              placeholder="请输入内容"
                              v-model="base.traffic"
                              @change="trafficChange">
                            </el-input>
                            <div class="abstract-num">剩余<span>{{trafficNum}}</span>个字</div>
                        </section>
                        <section class="baseInput bigB">
                            <span>对标物业</span>
                            <div class="input-box">
                                <el-select
                                        v-model="base.benchmarks"
                                        multiple
                                        filterable
                                        allow-create
                                        name="benchmarks"
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
                                <upload :path="base.housesImg"
                                        :is-operate="isOperate"
                                        :no-del="true"
                                        :bg-path="true"
                                        :is-house-id="true"
                                        :id-name="'house-big-img'"
                                        @changeImg="changeImg"></upload>
                            </div>
                        </section>

                        <section class="baseInput bigB">
                            <span>物业描述</span>
                            <div class="input-box">
                                <ueditor
                                    v-if="isBase"
                                    :editor-id="'housesDesc' + base.id"
                                    :editor-type="'text'"
                                    :content="base.housesDesc"
                                    @setContent="setContent"></ueditor>
                            </div>
                            <!-- <el-input
                              type="textarea"
                              :rows="4"
                              :maxlength="1000"
                              placeholder="请输入内容"
                              v-model="base.housesDesc"
                              @change="desChange">
                            </el-input> -->
                            <!-- <div class="abstract-num">剩余<span>{{abstractNum}}</span>个字</div> -->
                        </section>

                        
                        <div class="clear"></div>
                    </div>
                    <el-button v-if="isOperate"
                                class="save-btn" type="info" :plain="true" size="small" icon="document"
                               @click="saveBase">保存</el-button>
                    <div class="clear"></div>
                </el-collapse-item>
                <div class="line-bold"></div>
                <el-collapse-item class="formStyle" title="物业交易历史" name="2">
                    <router-link class="link-btn" target="_blank"
                            :to="{name: 'changes', query: {id: base.id, user: base.unitChain}}">明细</router-link>
                    <div class="over-box">
                        <section class="baseInput">
                            <span>交易日期</span>
                            <el-date-picker
                                    class="input-box"
                                    v-model="changes.houseTradeDate"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerPre">
                            </el-date-picker>
                        </section>
                        <section class="baseInput rightF">
                            <span>价格(万)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="changes.houseRradePrice"></el-input>
                        </section>
                        <section class="baseInput">
                            <span>交易甲方</span>
                            <el-select class="input-box"
                                       v-model="changes.houseTradeACode"
                                       name="houseTradeACode"
                                       placeholder="请选择">
                                <el-option
                                        :label="'无'"
                                        :value="''">
                                </el-option>
                                <el-option
                                        v-if="item.enterpriseCode != changes.houseTradeBCode"
                                        v-for="(item, index) in investList"
                                        :key="index"
                                        :label="item.enterpriseCname"
                                        :value="item.enterpriseCode">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="baseInput rightF">
                            <span>交易乙方</span>
                            <el-select class="input-box"
                                        v-model="changes.houseTradeBCode"
                                        name="houseTradeBCode"
                                        placeholder="请选择">
                                <el-option
                                        :label="'无'"
                                        :value="''">
                                </el-option>
                                <el-option
                                        v-if="item.enterpriseCode != changes.houseTradeACode"
                                        v-for="(item, index) in investList"
                                        :key="index"
                                        :label="item.enterpriseCname"
                                        :value="item.enterpriseCode">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="baseInput bigB">
                            <span>评估机构</span>
                            <el-select class="input-box"
                                       v-model="changes.houseTradeEvaluationOrg"
                                       name="houseTradeEvaluationOrg"
                                       multiple
                                       placeholder="请选择">
                                <el-option
                                        v-for="(item, index) in agentAList"
                                        :key="index"
                                        :label="item.enterpriseCname"
                                        :value="item.enterpriseCode">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="baseInput">
                            <span>咨询机构</span>
                            <el-select class="input-box"
                                        name="houseTradeConsultingOrg"
                                        v-model="changes.houseTradeConsultingOrg"
                                        multiple
                                        placeholder="请选择">
                                <el-option
                                        v-for="(item, index) in agentBList"
                                        :key="index"
                                        :label="item.enterpriseCname"
                                        :value="item.enterpriseCode">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="baseInput rightF">
                            <span>交易类型</span>
                            <el-select class="input-box"
                                        name="houseTradeType"
                                        v-model="changes.houseTradeType"
                                        placeholder="请选择">
                                <el-option
                                        :label="'无'"
                                        :value="''">
                                </el-option>
                                <el-option
                                        v-for="(item, index) in houseTradeTypeList"
                                        :key="index"
                                        :label="item.dictKeyValue"
                                        :value="item.dictKeyCode">
                                </el-option>
                            </el-select>
                        </section>
                        <section class="baseInput bigB">
                            <span>交易备注</span>
                            <el-input
                              type="textarea"
                              :rows="4"
                              :maxlength="1000"
                              placeholder="请输入内容"
                              v-model="changes.houseTradeDesc"
                              @change="changeDescChange">
                            </el-input>
                            <div class="abstract-num">剩余<span>{{houseTradeACodebstractNum}}</span>个字</div>
                        </section>
                        <div class="clear"></div>
                        <el-button v-if="isOperate"
                                    class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                                   @click="saveChanges(true)">保存</el-button>
                    </div>
                </el-collapse-item>
                <div class="line-bold"></div>
                <el-collapse-item class="formStyle" title="物业租金历史" name="3">
                    <router-link class="link-btn" target="_blank"
                            :to="{name: 'rents', query: {id: base.id, user: base.unitChain}}">明细</router-link>
                    <div class="over-box">
                        <section class="baseInput">
                            <span>租赁日期</span>
                            <el-date-picker
                                    class="input-box"
                                    v-model="rents.date"
                                    type="month"
                                    placeholder="选择月">
                            </el-date-picker>
                        </section>
                        <section class="baseBigLong baseInput rightF">
                            <span>高区租金(元 ㎡/天)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="rents.priceT"></el-input>
                        </section>
                        <div class="clear"></div>
                        <section class="baseBigLong baseInput rightF">
                            <span>中区租金(元 ㎡/天)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="rents.priceM"></el-input>
                        </section>
                        <div class="clear"></div>
                        <section class="baseBigLong baseInput rightF">
                            <span>低区租金(元 ㎡/天)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="rents.priceB"></el-input>
                        </section>
                        <div class="clear"></div>
                        <el-button v-if="isOperate"
                                    class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                                   @click="saveRents(true)">保存</el-button>
                    </div>
                </el-collapse-item>
                <div class="line-bold"></div>
                <el-collapse-item class="formStyle" title="物业估值历史" name="4">
                    <router-link class="link-btn" target="_blank"
                            :to="{name: 'evalues', query: {id: base.id, user: base.unitChain}}">明细</router-link>
                    <div class="over-box">
                        <section class="baseInput">
                            <span>估值日期</span>
                            <el-date-picker
                                    class="input-box"
                                    v-model="evalues.createDate"
                                    type="year"
                                    placeholder="选择年">
                            </el-date-picker>
                        </section>
                        <section class="baseLong baseInput rightF">
                            <span>总租金(万)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="evalues.rentValue"></el-input>
                        </section>
                        <div class="clear"></div>
                        <section class="baseLong baseInput rightF">
                            <span>估值(万)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="evalues.valuation"></el-input>
                        </section>
                        <div class="clear"></div>
                        <section class="baseLong baseInput rightF">
                            <span>静总租金(万)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="evalues.netRentValue"></el-input>
                        </section>
                        <div class="clear"></div>
                        <section class="baseLong baseInput rightF">
                            <span>资本化率(%)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="evalues.capRate"></el-input>
                        </section>
                        <div class="clear"></div>
                        <el-button v-if="isOperate"
                                    class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                                   @click="saveEvalues(true)">保存</el-button>
                    </div>
                </el-collapse-item>
                <div class="line-bold"></div>
                <el-collapse-item class="formStyle editShow" title="物业空置率历史" name="5">
                    <router-link class="link-btn" target="_blank"
                            :to="{name: 'rates', query: {id: base.id, user: base.unitChain}}">明细</router-link>
                    <div class="over-box">
                        <section class="baseInput">
                            <span>填报日期</span>
                            <el-date-picker
                                    class="input-box"
                                    v-model="rates.date"
                                    type="month"
                                    placeholder="选择月">
                            </el-date-picker>
                        </section>
                        <section class="baseInput rightF">
                            <span>空置率(%)</span>
                            <el-input class="input-box" type="number" size="small" 
                                        :min="0" :step="0.01" v-model="rates.rate"></el-input>
                        </section>
                        <div class="clear"></div>
                        <el-button  v-if="isOperate"
                                     class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                                   @click="saveRates(true)">保存</el-button>
                    </div>
                </el-collapse-item>
                <div class="line-bold"></div>
                <el-collapse-item class="formStyle" title="物业外观图片" name="6">
                    <upload-list :img-lists="appearance" :type="'appearance'" :is-btn="isOperate"
                                    @showimg="showImg"
                                    @imgChange="imgListChange"></upload-list>
                </el-collapse-item>
                <div class="line-bold"></div>
                <el-collapse-item class="formStyle" title="物业公共区域图片" name="7">
                    <upload-list :img-lists="public" :type="'publics'" :is-btn="isOperate"
                                @showimg="showImg"
                                @imgChange="imgListChange"></upload-list>
                </el-collapse-item>
                <div class="line-bold"></div>
                <el-collapse-item class="formStyle" title="物业周围环境图片" name="8">
                    <upload-list :img-lists="surround" :type="'surround'" :is-btn="isOperate"
                                @showimg="showImg"
                                @imgChange="imgListChange"></upload-list>
                </el-collapse-item>
            </el-collapse>

            <swiper-img :is-show="isShow" :index="index" :big-imgs="bigImgs"></swiper-img>
        
        </section>
        <add-house :is-add="isAdd"
                :city="houseCity"
                @addHouse="addHouse"
                ref="addHouse"></add-house>
    </div>
</template>
<script>
    import searchBox from '../common/search-box.vue'
    import util from '../../assets/common/util'
    import upload from '../../components/common/upload'
    import uploadList from '../../components/index/upload-list'
    import swiperImg from '../../components/common/swiper-img.vue'
    import editBox from '../../components/common/edit'
    import addHouse from './addHouse'
    import ueditor from '../../components/common/ueditor'

    export default {
        props: ['listInfo', 'articleInfo'],
        data () {
            return {
                productType: '',
                oldName: '',
                base: {
                    id: '',
                    name: '',
                    housesCname: '',
                    point: {
                        lng: '',
                        lat: ''
                    },
                    city: '',
                    mall: '',
                    address: '',
                    bondType: '',
                    level: '',
                    massif: '',
                    year: 0,
                    ratio: 0,
                    star: '0',
                    owner: [],
                    property: '',
                    rent: '',
                    area: '',
                    plies: '',
                    elevator: '',
                    conditioner: '',
                    floor: '',
                    benchmarks: [],
                    holding: '',
                    traffic: '',
                    investor: '',
                    rentCount: 0,
                    housesImg: '',
                    height: 0,
                    park: 0,
                    webSite: '',
                    housesDesc: '',
                    bondCode: '',
                    unitChain: ''
                },
                ownerList: [],
                isBase: false,
                abstractNum: 1000,
                houseTradeACodebstractNum: 1000,
                trafficNum: 500,
                bonds: [
                    {
                        typeName: '无'
                    },
                    {
                        typeName: 'ABS'
                    },
                    {
                        typeName: 'REITs'
                    }
                ],
                houseTradeTypeList: [],
                changes: {
                    id: '',
                    housesId: localStorage.getItem('id'),
                    houseTradeDate: '',
                    houseRradePrice: '',
                    houseTradeACode: '',
                    houseTradeBCode: '',
                    houseTradeDesc: '',
                    houseTradeType: '',
                    houseTradeConsultingOrg: [],
                    houseTradeEvaluationOrg: []
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
                rates: {
                    id: '',
                    date: '',
                    rate: ''
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
                timer: null,
                isStar: false,
                investList: [],
                housesList: [],
                agentAList: [],
                agentBList: [],
                isId: false,
                hisUser: '',
                permission: '',
                isFirst: true,
                isSaveBase: true
            }
        },
        mounted () {
            this.getTypes()
            this.getInvestors()
            this.getInvests()
            this.getHouses()
            this.getAgentA()
            this.getAgentB()
            this.getHouseTradeTypeList()

            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            document.title = '写字楼'
            this.addBase = Object.assign({}, this.base)
        },
        computed: {
          isOperate () {
            var isUser = (this.hisUser && this.base.unitChain && this.hisUser == this.base.unitChain)
            return isUser || this.permission == '111'
          }
        },
        methods: {
            getAllData (data) {
                this.isId = data.id !== null
                if (!this.isId) {
                    return false
                }

                if (this.isFirst) {
                    setTimeout(() => {
                        var map = new window.BMap.Map('container')
                        this.map = map
                        var point = new window.BMap.Point(116.409, 39.918)
                        map.centerAndZoom(point, 15)
                    }, 0)
                }

                this.isFirst = false

                this.permission = data.permission
                
                this.isBase = false
                this.isSaveBase = true
                this.getBase()
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
            validateHouseCname () {
                if (this.base.name == '' || this.base.name.trim() == this.oldName) {
                    return false
                }

                util.request({
                  method: 'post',
                  interface: 'validateHousesName',
                  data: {
                    name: this.base.name
                  }
                }).then(res => {
                  if (res.result.success == '1') {
                    if (res.result.result) {
                        this.isSaveBase = true
                    } else {
                        this.isSaveBase = false
                        this.$message({
                          message: '已存在该楼盘简称，不能重复添加！',
                          type: 'warning'
                        })
                    }
                  } else {
                    this.$message.error(res.result.message)
                  }
                })
            },
            getInvests () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'finance_org_type_1'
                    }
                }).then(res => {
                    this.investList = res.result.result
                })
            },
            getHouses () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'propertys_agent_type_4'
                    }
                }).then(res => {
                    this.housesList = res.result.result
                })
            },
            getHouseTradeTypeList () {
                util.request({
                    method: 'get',
                    interface: 'findDictionaryByType',
                    data: {
                        typeCode: 'propertys_trade_type'
                    }
                }).then(res => {
                    this.houseTradeTypeList = res.result.result
                })
            },
            getAgentA () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'propertys_agent_type_3'
                    }
                }).then(res => {
                    this.agentAList = res.result.result
                })
            },
            getAgentB () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'propertys_agent_type_1'
                    }
                }).then(res => {
                    this.agentBList = res.result.result
                })
            },
            checkWebSite () {
                var webSite = this.base.webSite
                this.base.webSite = webSite.replace(/[\u4e00-\u9fa5]/g,'')
            },
            desChange () {
                this.abstractNum = 1000 - this.base.housesDesc.length
            },
            trafficChange () {
                this.trafficNum = 500 - this.base.traffic.length
            },
            changeDescChange () {
                this.houseTradeACodebstractNum = 1000 - this.changes.houseTradeDesc.length
            },
            rentChange () {
                if (this.base.rent != '') {
                    this.base.rentCount = 1
                }

                var rent  = this.base.rent

                this.base.rent = rent.replace(/[，、]/g, ',')

                this.base.rentCount = this.base.rent.split(',').length
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
                        setTimeout(() => {
                            this.isBase = true
                        }, 0)
                        // this.$message.error(res.result.message)
                        return
                    }

                    res.result.result.base.id = localStorage.getItem('id')

                    if (res.result.result.base.owner) {
                        this.ownerList = res.result.result.base.owner.split(',')
                    } else {
                        this.ownerList = []
                    }
                    
                    this.hisUser = res.result.request
                    this.oldName = res.result.result.base.name

                    var base = res.result.result.base

                    if (!base.benchmarks) {
                        base.benchmarks = []
                    }

                    this.base = Object.assign(this.base, base)

                    this.abstractNum = 1000 - this.base.housesDesc.length
                    this.trafficNum = 500 - this.base.traffic.length

                    this.rentChange()

                    setTimeout(() => {
                        this.isBase = true
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
            },
            setImgs () {
                if (this.appearance.length && this.public.length && this.surround.length && !this.bigImgs.length) {
                    this.bigImgs = this.bigImgs.concat(this.appearance, this.public, this.surround)
                    console.log(this.bigImgs, 'bigImgs')
                }
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
            setContent (data) {
                this.base.housesDesc = data.content
            },
            saveBase () {
                var formData = {
                    id: localStorage.getItem("id"),
                    type: 'base',
                    data: this.base
                }

                formData.data.houseCname = this.base.housesCname

                if (!this.isSaveBase) {
                    this.$message({
                      message: '已存在该楼盘简称，不能重复添加！',
                      type: 'warning'
                    })
                    return false
                }

                if (this.base.benchmarks.length > 3) {
                    this.$message({
                        message: '请务必选择3个对标物业！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.ownerList.length) {
                    this.base.owner = this.ownerList.join(',')
                } else {
                    this.base.owner = ''
                }

                util.request({
                    method: 'post',
                    interface: 'houseInfo',
                    data: formData
                }).then(res => {
                    if (res.result.success == '1') {
                        this.oldName = this.base.name
                        this.$parent.$refs.listBox.loadList('reload')
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
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
            saveChanges (isShow) {
                this.changes.recordCreater = window.UserInfo.userCnName

                if (this.changes.houseTradeDate == '') {
                    this.$message({
                        message: '请务填写交易日期！',
                        type: 'warning'
                    })
                    return false
                }

                this.changes.houseTradeDate = this.formDataDate(this.changes.houseTradeDate)

                if (this.changes.houseRradePrice == '') {
                    this.$message({
                        message: '请务填写交易价格！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.changes.houseTradeACode == '' && this.changes.houseTradeBCode == '') {
                    this.$message({
                        message: '请务填写交易方！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.changes.houseTradeEvaluationOrg && this.changes.houseTradeEvaluationOrg.length) {
                    this.changes.houseTradeEvaluationOrg = this.changes.houseTradeEvaluationOrg.join(',')
                } else {
                    this.changes.houseTradeEvaluationOrg = ''
                }

                if (this.changes.houseTradeConsultingOrg && this.changes.houseTradeConsultingOrg.length) {
                    this.changes.houseTradeConsultingOrg = this.changes.houseTradeConsultingOrg.join(',')
                } else {
                    this.changes.houseTradeConsultingOrg = ''
                }

                util.request({
                    method: 'post',
                    interface: 'manageHouseTradeDetail',
                    data: this.changes
                }).then(res => {
                    if (res.result.success == '1') {
                        this.changes = {
                            id: '',
                            housesId: localStorage.getItem('id'),
                            houseTradeDate: '',
                            houseRradePrice: '',
                            houseTradeACode: '',
                            houseTradeBCode: '',
                            houseTradeType: '',
                            houseTradeEvaluationOrg: [],
                            houseTradeConsultingOrg: [],
                            houseTradeDesc: ''
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
                        tenantStartDate: this.formDataDate(this.rents.date),
                        priceT: this.rents.priceT,
                        priceM: this.rents.priceM,
                        priceB: this.rents.priceB,
                        recordCreater: window.UserInfo.userCnName
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
            saveRates (isShow) {
                if (this.rates.date == '') {
                    this.$message({
                        message: '请务填写交易日期！',
                        type: 'warning'
                    })
                    return false
                }
                if (this.rates.rate == '') {
                    this.$message({
                        message: '请务填写置空率！',
                        type: 'warning'
                    })
                    return false
                }

                var formData = {
                    housesId: localStorage.getItem("id"),
                    vacancyRate: this.rates.rate,
                    date: this.formDataDate(this.rates.date),
                    creater: window.UserInfo.userCnName
                }

                util.request({
                    method: 'post',
                    interface: 'addRates',
                    data: formData
                }).then(res => {
                    if (res.result.success == '1') {
                        this.rates = {
                            date: '',
                            rate: ''
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
                    type: 'valuation',
                    data: {
                        housesId: localStorage.getItem("id"),
                        housesGps: this.base.point,
                        createDate: this.formDataDate(this.evalues.createDate),
                        rentValue: this.evalues.rentValue,
                        netRentValue: this.evalues.netRentValue,
                        valuation: this.evalues.valuation,
                        capRate: this.evalues.capRate,
                        recordCreater: window.UserInfo.userCnName
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
                    this.$refs.addHouse.initMap()
                }, 0)
            },
            addHouse (data) {
                this.addBase.name = data.name
                this.addBase.houseCname = data.cname
                this.addBase.point = data.point
                this.addBase.address = data.address

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
                    this.base.housesCname = mapInfo.title
                    var point = new window.BMap.Point(mapInfo.point.lng, mapInfo.point.lat)
                } else {
                    var pointData = this.base.point.split(',')
                    var point = new window.BMap.Point(pointData[1], pointData[0])
                }
                
                setTimeout(() => {
                    this.map.clearOverlays()
                    this.map.panTo(point)
                    var marker = new BMap.Marker(point)
                    this.map.addOverlay(marker)
                }, 0)
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
            upload,
            uploadList,
            swiperImg,
            editBox,
            addHouse,
            ueditor
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

        .edui-default .edui-editor {
            border-color: #bfcbd9;
        }

        .edui-editor-iframeholder {
            min-height: 150px;
        }

        .message-box {
            text-align: right;
            font-size: 13px;
            color: #1f2d3d;

            a {
                text-decoration: underline;
                color: red;
            }
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

    .baseInput {
        float: left;
        margin-bottom: 20px;

        &>span {
            float: left;
            width: 70px;
            font-size: 14px;
            color: #999999;
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

    .baseLong {
        &>span {
            width: 90px;
        }

        .input-box {
            width: 225px;
        }
    }

    .baseBigLong {
        &>span {
            width: 130px;
        }

        .input-box {
            width: 185px;
        }
    }

    .bigB {
        .input-box {
            width: 570px;

            .el-select {
                width: 570px;
            }
        }

        .el-textarea {
          width: 570px;
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