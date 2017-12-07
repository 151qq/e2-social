<template>
    <div v-show="isId" class="form-invest">
        <el-collapse v-model="activeNames" @change="collChange">
            <el-collapse-item class="formStyle" title="基本信息" name="1">
                <div class="form-box">
                    <div class="clear"></div>
                    <section class="baseInput bigB">
                        <span>证券名称</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="base.productCame">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>发行机构</span>
                        <el-select class="input-box"
                                   v-model="base.productPublishOrg"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    :label="'无'"
                                    :value="''">
                            </el-option>
                            <el-option
                                    v-for="(item, index) in investList"
                                    :key="index"
                                    :label="item.enterpriseCname"
                                    :value="item.enterpriseCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>证券代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="base.productMarketCode">
                        </el-input>
                    </section>
                    <section class="baseInput">
                        <span>发行时间</span>
                        <el-date-picker
                                class="input-box"
                                v-model="base.productPublishTime"
                                placeholder="选择日期">
                        </el-date-picker>
                    </section>
                    <section class="baseInput rightF">
                        <span>清算时间</span>
                        <el-date-picker
                                class="input-box"
                                v-model="base.productEndTime"
                                placeholder="选择日期">
                        </el-date-picker>
                    </section>
                    <section class="baseInput">
                        <span>发行金额(万)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" v-model="base.productQuotation"></el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>上市地点</span>
                        <el-select class="input-box"
                               v-model="base.productIpoSite"
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
                    <section class="baseInput bigB">
                        <span>承销机构</span>
                        <el-select class="input-box"
                                   v-model="productSalesOrgArr"
                                   name="investor"
                                   multiple
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in agentCxList"
                                    :key="index"
                                    :label="item.enterpriseCname"
                                    :value="item.enterpriseCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput bigB">
                        <span>评估机构</span>
                        <el-select class="input-box"
                                   v-model="productEvaluationOrgArr"
                                   name="investor"
                                   multiple
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in agentPgList"
                                    :key="index"
                                    :label="item.enterpriseCname"
                                    :value="item.enterpriseCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput bigB">
                        <span>评级机构</span>
                        <el-select class="input-box"
                                   v-model="productRatingOrgArr"
                                   name="investor"
                                   multiple
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in agentPjList"
                                    :key="index"
                                    :label="item.enterpriseCname"
                                    :value="item.enterpriseCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput bigB">
                        <span>现金流预测机构</span>
                        <el-select class="input-box"
                                   v-model="productCashflowConsultingOrgArr"
                                   name="investor"
                                   multiple
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in agentYcList"
                                    :key="index"
                                    :label="item.enterpriseCname"
                                    :value="item.enterpriseCode">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput">
                        <span>产品状态</span>
                        <el-select class="input-box"
                                   v-model="base.productState"
                                   name="investor"
                                   placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in productStateList"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </section>
                    <section class="baseInput rightF">
                        <span>产品类型</span>
                        <el-select class="input-box"
                               v-model="base.productType"
                               name="investor"
                               :disabled="true"
                               placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in types.finance_product_type"
                                    :key="index"
                                    :label="item.typeName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </section>

                    <section class="baseInput bigB">
                        <span>产品链接</span>
                        <el-input
                                class="input-box"
                                @change="checkWebSite"
                                placeholder="请输入内容"
                                v-model="base.productInfoLink">
                        </el-input>
                    </section>
                    <section class="baseInput bigB">
                        <span>证券图片</span>
                        <div class="input-box">
                            <upload :path="base.productLogo"
                                    :no-del="true"
                                    :bg-path="true"
                                    :is-house-id="true"
                                    :is-operate="isOperate"
                                    :id-name="'productLogo'"
                                    @changeImg="changeImg"></upload>
                        </div>
                    </section>
                    <section class="baseInput bigB">
                        <span>证券结构图</span>
                        <div class="input-box">
                            <upload :path="base.productArcUrl"
                                    :no-del="true"
                                    :bg-path="true"
                                    :is-house-id="true"
                                    :is-operate="isOperate"
                                    :id-name="'productArcUrl'"
                                    @changeImg="changeArcImg"></upload>
                        </div>
                    </section>

                    <section class="baseInput bigB">
                        <span>证券说明</span>
                        <div class="input-box">
                            <ueditor
                                v-if="isBase"
                                :editor-id="'productDesc' + base.id"
                                :editor-type="'text'"
                                :content="base.productDesc"
                                @setContent="setContent"></ueditor>
                        </div>
                    </section>

                    
                    <div class="clear"></div>
                </div>
                <el-button v-if="isOperate"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="saveBase">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="优先级" name="2">
                <div class="form-big-box">
                    <div class="clear"></div>
                    <section class="baseInput">
                        <span>分层</span>
                        <el-input
                                class="input-box"
                                placeholder="优先级"
                                :disabled="true">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>比例(%)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01"
                                    v-model="payAndProfitOne.fundLevelRatio"></el-input>
                    </section>
                    <section class="baseInput">
                        <span>证券代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="payAndProfitOne.fundLevelCode">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>剩余本金面额(元)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="1"
                                    v-model="payAndProfitOne.fundLevelResidualPrincipal"></el-input>
                    </section>
                    <section class="baseInput">
                        <span>证券净价(元)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="1"
                                    v-model="payAndProfitOne.fundLevelNetPrice"></el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>证券全价(元)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="1"
                                    v-model="payAndProfitOne.fundLevelTotalPrice"></el-input>
                    </section>
                    <section class="baseInput">
                        <span>证券预期收益率(%)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01"
                                    v-model="payAndProfitOne.fundLevelForcastPayback"></el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>加权年限</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" @input="yearCheck('payAndProfitOne')"
                                    v-model="payAndProfitOne.fundLevelWeightingPeriod"></el-input>
                    </section>
                    <div class="clear"></div>
                </div>
                <el-button v-if="isOperate"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="savePayAndProfit('payAndProfitOne')">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="夹层" name="3">
                <div class="form-big-box">
                    <div class="clear"></div>
                    <section class="baseInput">
                        <span>分层</span>
                        <el-input
                                class="input-box"
                                placeholder="夹层"
                                :disabled="true">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>比例(%)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01"
                                    v-model="payAndProfitTwo.fundLevelRatio"></el-input>
                    </section>
                    <section class="baseInput">
                        <span>证券代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="payAndProfitTwo.fundLevelCode">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>剩余本金面额(元)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="1"
                                    v-model="payAndProfitTwo.fundLevelResidualPrincipal"></el-input>
                    </section>
                    <section class="baseInput">
                        <span>证券净价(元)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="1"
                                    v-model="payAndProfitTwo.fundLevelNetPrice"></el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>证券全价(元)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="1"
                                    v-model="payAndProfitTwo.fundLevelTotalPrice"></el-input>
                    </section>
                    <section class="baseInput">
                        <span>证券预期收益率(%)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01"
                                    v-model="payAndProfitTwo.fundLevelForcastPayback"></el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>加权年限</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" @input="yearCheck('payAndProfitTwo')"
                                    v-model="payAndProfitTwo.fundLevelWeightingPeriod"></el-input>
                    </section>
                    <div class="clear"></div>
                </div>
                <el-button v-if="isOperate"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="savePayAndProfit('payAndProfitTwo')">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="劣后级" name="4">
                <div class="form-big-box">
                    <div class="clear"></div>
                    <section class="baseInput">
                        <span>分层</span>
                        <el-input
                                class="input-box"
                                placeholder="劣后级"
                                :disabled="true">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>比例(%)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01"
                                    v-model="payAndProfitThree.fundLevelRatio"></el-input>
                    </section>
                    <section class="baseInput">
                        <span>证券代码</span>
                        <el-input
                                class="input-box"
                                placeholder="请输入内容"
                                :disabled="true"
                                v-model="payAndProfitThree.fundLevelCode">
                        </el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>剩余本金面额(元)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="1"
                                    v-model="payAndProfitThree.fundLevelResidualPrincipal"></el-input>
                    </section>
                    <section class="baseInput">
                        <span>证券净价(元)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="1"
                                    v-model="payAndProfitThree.fundLevelNetPrice"></el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>证券全价(元)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="1"
                                    v-model="payAndProfitThree.fundLevelTotalPrice"></el-input>
                    </section>
                    <section class="baseInput">
                        <span>证券预期收益率(%)</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" :step="0.01"
                                    v-model="payAndProfitThree.fundLevelForcastPayback"></el-input>
                    </section>
                    <section class="baseInput rightF">
                        <span>加权年限</span>
                        <el-input class="input-box" type="number" size="small" 
                                    :min="0" @input="yearCheck('payAndProfitThree')"
                                    v-model="payAndProfitThree.fundLevelWeightingPeriod"></el-input>
                    </section>
                    <div class="clear"></div>
                </div>
                <el-button v-if="isOperate"
                            class="save-btn" type="info" :plain="true" size="small" icon="document"
                           @click="savePayAndProfit('payAndProfitThree')">保存</el-button>
                <div class="clear"></div>
            </el-collapse-item>
            <div class="line-bold"></div>
            <el-collapse-item class="formStyle" title="资产现金流" name="5">
                <el-button v-if="isOperate" 
                        class="add-btn" type="primary" size="small" @click="addHouseRate">新增</el-button>
                
                <template v-for="(item, index) in perList">
                    <div class="line-sper" v-if="index"></div>

                    <section class="asset-money">
                        <img class="cover-img" :src="item.housesInfo.housesImg">
                        <div class="right-content">
                            <div>物业名称：{{item.housesInfo.housesDesc}}</div>
                            <div>物业地址：{{item.housesInfo.housesAddr}}</div>
                            <div>
                                基金占比(%)：
                                <el-input class="list-input" type="number" size="small" 
                                    :min="0" :step="0.01"
                                    v-model="item.productHouseRate"></el-input>
                            </div>
                        </div>
                    </section>

                    <el-table
                        :data="item.cashflowList"
                        class="cashBox"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="year"
                          label="年"
                          width="80">
                        </el-table-column>
                        <el-table-column
                          prop="houseForcastCashflow"
                          label="预测现金流(万)">
                        </el-table-column>
                        <el-table-column
                          prop="houseGuaranteeCashflow"
                          label="保底现金流(万)">
                        </el-table-column>
                        <el-table-column
                          prop="houseRealCashflow"
                          label="真实现金流(万)">
                        </el-table-column>
                        <el-table-column
                            v-if="isOperate"
                            prop="fundLastLevelPayback"
                            label="操作"
                            width="50">
                            <template scope="scope">
                                <i class="el-icon-delete2" @click="deleteCash(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-table
                        :data="item.cashflowList"
                        class="cashBox"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="year"
                          label="年"
                          width="80">
                        </el-table-column>
                        <el-table-column
                          prop="fundPriorityLevelPayback"
                          label="优先级现金流(万)">
                        </el-table-column>
                        <el-table-column
                          prop="fundMiddleLevelPayback"
                          label="夹层现金流(万)">
                        </el-table-column>
                        <el-table-column
                          prop="fundLastLevelPayback"
                          label="劣后现金流(万)">
                        </el-table-column>
                        <el-table-column
                            v-if="isOperate"
                            prop="fundLastLevelPayback"
                            label="操作"
                            width="50">
                            <template scope="scope">
                                <i class="el-icon-delete2" @click="deleteCash(scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div v-if="isOperate" class="btn-box">
                        <el-button type="danger"
                                    :plain="true" size="mini" icon="delete2"
                                    @click="deleteRow(item)">删除</el-button>
                        <el-button type="info"
                                    :plain="true" size="mini" icon="document"
                                    @click="saveRow(item)">保存</el-button>
                        <el-button type="info"
                                    :plain="true" size="mini" icon="document"
                                    @click="addCashRow(index)">添加</el-button>
                    </div>
                </template>

                
            </el-collapse-item>
        </el-collapse>

        <el-dialog title="添加资产现金流" :visible.sync="addHouse">
            <el-form :label-position="'left'">
                <el-form-item label="物业" :label-width="'80px'">
                  <search-filter :row-data="nowHouseData"></search-filter>
                </el-form-item>
                <el-form-item label="占比(%)" :label-width="'80px'">
                  <el-input class="table-input-box" type="number" size="small" 
                                        :min="0" :step="0.01"
                                        v-model="nowHouseData.productHouseRate"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addHouse = false">取 消</el-button>
                <el-button type="primary" @click="saveRow(nowHouseData)">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加资产现金流" :visible.sync="isAddCash">
            <el-form class="form-cash" :label-position="'left'">
                <el-form-item label="年" :label-width="'100px'">
                    <el-select class="table-input-box"
                               v-model="cashData.year"
                               name="investor"
                               placeholder="请选择">
                        <el-option
                                v-for="(item, index) in yearsData"
                                :key="index"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预测(万)" :label-width="'100px'">
                  <el-input class="table-input-box" type="number"
                            size="small"  :min="0" :step="0.01"
                        v-model="cashData.houseForcastCashflow"></el-input>
                </el-form-item>
                <el-form-item label="保底(万)" :label-width="'100px'">
                  <el-input class="table-input-box" type="number"
                            size="small"  :min="0" :step="0.01"
                        v-model="cashData.houseGuaranteeCashflow"></el-input>
                </el-form-item>
                <el-form-item label="真实(万)" :label-width="'100px'">
                  <el-input class="table-input-box" type="number"
                            size="small"  :min="0" :step="0.01"
                        v-model="cashData.houseRealCashflow"></el-input>
                </el-form-item>
                <el-form-item label="优先级(万)" :label-width="'100px'">
                  <el-input class="table-input-box" type="number"
                            size="small"  :min="0" :step="0.01"
                        v-model="cashData.fundPriorityLevelPayback"></el-input>
                </el-form-item>
                <el-form-item label="夹层(万)" :label-width="'100px'">
                  <el-input class="table-input-box" type="number"
                            size="small"  :min="0" :step="0.01"
                        v-model="cashData.fundMiddleLevelPayback"></el-input>
                </el-form-item>
                <el-form-item label="劣后(万)" :label-width="'100px'">
                  <el-input class="table-input-box" type="number"
                            size="small"  :min="0" :step="0.01"
                        v-model="cashData.fundLastLevelPayback"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAddCash = false">取 消</el-button>
                <el-button type="primary" @click="saveCash(cashData)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../assets/common/util'
    import upload from '../../components/common/upload'
    import ewmUpload from '../../components/common/ewm-upload'
    import ueditor from '../../components/common/ueditor'
    import searchFilter from '../../components/common/search-filter'

    export default {
        props: ['listInfo', 'articleInfo'],
        data () {
            return {
                base: {
                    id: '',
                    productCame: '',
                    productPublishOrg: '',
                    productIpoSite: '',
                    productPublishTime: '',
                    productMarketCode: '',
                    productState: '',
                    productInfoLink: '',
                    productLogo: '',
                    productDesc: '',
                    productType: '',
                    productEndTime: '',
                    productQuotation: '',
                    productSalesOrg: '',
                    productEvaluationOrg: '',
                    productRatingOrg: '',
                    productCashflowConsultingOrg: '',
                    productArcUrl: '',
                    unitChain: ''
                },
                productSalesOrgArr: [],
                productEvaluationOrgArr:[],
                productRatingOrgArr: [],
                productCashflowConsultingOrgArr: [],
                publishTime: '',
                endTime: '',
                isBase: false,
                abstractNum: 140,
                activeNames: ['1'],
                pickerPre: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now()
                    }
                },
                types: {
                    finance_market: [],
                    finance_product_type: []
                },
                investList: [],
                productStateList: [
                    {
                        code: '0',
                        label: '未上市'
                    },
                    {
                        code: '1',
                        label: '已上市'
                    }
                ],
                timer: null,
                addHouse: false,
                nowHouseData: {},
                isAddCash: false,
                cashData: {},
                yearsData: [],
                payAndProfitOne: {
                    fundLevelCode: '',
                    fundLevelRatio: '',
                    financeProductCode: localStorage.getItem('id'),
                    fundLevelResidualPrincipal: '',
                    fundLevelNetPrice: '',
                    fundLevelTotalPrice: '',
                    fundLevelForcastPayback: '',
                    fundLevelWeightingPeriod: ''
                },
                payAndProfitTwo: {
                    fundLevelCode: '',
                    fundLevelRatio: '',
                    financeProductCode: localStorage.getItem('id'),
                    fundLevelResidualPrincipal: '',
                    fundLevelNetPrice: '',
                    fundLevelTotalPrice: '',
                    fundLevelForcastPayback: '',
                    fundLevelWeightingPeriod: ''
                },
                payAndProfitThree: {
                    fundLevelCode: '',
                    fundLevelRatio: '',
                    financeProductCode: localStorage.getItem('id'),
                    fundLevelResidualPrincipal: '',
                    fundLevelNetPrice: '',
                    fundLevelTotalPrice: '',
                    fundLevelForcastPayback: '',
                    fundLevelWeightingPeriod: ''
                },
                perList: [],
                agentCxList: [],
                agentPgList: [],
                agentPjList: [],
                agentYcList: [],
                isId: false,
                hisUser: '',
                permission: ''
            }
        },
        mounted () {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            document.title = '证券产品'
            this.getTypes()
            this.getAgentCx()
            this.getAgentPg()
            this.getAgentPj()
            this.getInvests()
            this.getAgentYc()
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
                
                this.permission = data.permission
                this.resetPayAndProfit()
                this.isBase = false
                this.getBase()

                if (this.timer) {
                    clearInterval(this.timer)
                }

                // this.timer = setInterval(() => {
                //     this.saveAll()
                // }, 180000)
            },
            resetPayAndProfit () {
                this.payAndProfitOne = {
                    fundLevelCode: '',
                    fundLevelRatio: '',
                    financeProductCode: localStorage.getItem('id'),
                    fundLevelResidualPrincipal: '',
                    fundLevelNetPrice: '',
                    fundLevelTotalPrice: '',
                    fundLevelForcastPayback: '',
                    fundLevelWeightingPeriod: ''
                }
                this.payAndProfitTwo = {
                    fundLevelCode: '',
                    fundLevelRatio: '',
                    financeProductCode: localStorage.getItem('id'),
                    fundLevelResidualPrincipal: '',
                    fundLevelNetPrice: '',
                    fundLevelTotalPrice: '',
                    fundLevelForcastPayback: '',
                    fundLevelWeightingPeriod: ''
                }
                this.payAndProfitThree = {
                    fundLevelCode: '',
                    fundLevelRatio: '',
                    financeProductCode: localStorage.getItem('id'),
                    fundLevelResidualPrincipal: '',
                    fundLevelNetPrice: '',
                    fundLevelTotalPrice: '',
                    fundLevelForcastPayback: '',
                    fundLevelWeightingPeriod: ''
                }
            },
            desChange () {
                this.abstractNum = 140 - this.base.des.length
            },
            yearCheck (type) {
                if (this[type].fundLevelWeightingPeriod < 0) {
                    this[type].fundLevelWeightingPeriod = 0
                }

                if (this[type].fundLevelWeightingPeriod > 99) {
                    this[type].fundLevelWeightingPeriod = 99
                }
            },
            getAgentCx () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'propertys_agent_type_6'
                    }
                }).then(res => {
                    this.agentCxList = res.result.result
                })
            },
            getAgentPg () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'propertys_agent_type_3'
                    }
                }).then(res => {
                    this.agentPgList = res.result.result
                })
            },
            getAgentPj () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'propertys_agent_type_5'
                    }
                }).then(res => {
                    this.agentPjList = res.result.result
                })
            },
            getAgentYc () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'propertys_agent_type_1,propertys_agent_type_3,propertys_agent_type_7'
                    }
                }).then(res => {
                    this.agentYcList = res.result.result
                })
            },
            getBase () {
                util.request({
                    method: 'get',
                    interface: 'getOrUpdate',
                    data: {
                        productCode: localStorage.getItem('id')
                    }
                }).then(res => {
                    if (res.result.success == '0') {
                        setTimeout(() => {
                            this.isBase = true
                        }, 0)
                        this.$message.error(res.result.message)
                        return
                    }

                    this.hisUser = res.result.request
                    var result = res.result.result

                    if (result.productSalesOrg) {
                        this.productSalesOrgArr = result.productSalesOrg.split(',')
                    } else {
                        this.productSalesOrgArr = []
                    }

                    if (result.productEvaluationOrg) {
                        this.productEvaluationOrgArr = result.productEvaluationOrg.split(',')
                    } else {
                        this.productEvaluationOrgArr = []
                    }

                    if (result.productRatingOrg) {
                        this.productRatingOrgArr = result.productRatingOrg.split(',')
                    } else {
                        this.productRatingOrgArr = []
                    }

                    if (result.productCashflowConsultingOrg) {
                        this.productCashflowConsultingOrgArr = result.productCashflowConsultingOrg.split(',')
                    } else {
                        this.productCashflowConsultingOrgArr = []
                    }

                    this.base = result

                    setTimeout(() => {
                        this.findByProductInfo()
                        this.findListByProductCode()
                        this.isBase = true
                        if (!this.payAndProfitOne.id) {
                            this.payAndProfitOne.fundLevelCode = this.base.productMarketCode + '1'
                        }

                        if (!this.payAndProfitTwo.id) {
                            this.payAndProfitTwo.fundLevelCode = this.base.productMarketCode + '2'
                        }

                        if (!this.payAndProfitThree.id) {
                            this.payAndProfitThree.fundLevelCode = this.base.productMarketCode + '3'
                        }


                        // 保存时间
                        if (this.base.productPublishTime) {
                            this.publishTime = this.base.productPublishTime
                        }

                        if (this.base.productEndTime) {
                            this.endTime = this.base.productEndTime
                        }

                    }, 0)
                })
            },
            getTypes () {
                util.request({
                    method: 'get',
                    interface: 'orDic',
                    data: {}
                }).then(res => {
                    if (res.result.success == '1') {
                        this.types = res.result.result
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            findListByProductCode () {
                util.request({
                    method: 'get',
                    interface: 'findListByProductCode',
                    data: {
                        productCode: localStorage.getItem('id')
                    }
                }).then(res => {
                    if (res.result.success == '1') {
                        this.perList = res.result.result
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            findByProductInfo () {
                util.request({
                    method: 'get',
                    interface: 'findByProductInfo',
                    data: {
                        financeProductCode: localStorage.getItem('id')
                    }
                }).then(res => {
                    if (res.result.success == '1') {
                        res.result.result.forEach((item) => {
                            if (item.fundLevelCode == this.base.productMarketCode + '1') {
                                this.payAndProfitOne = item
                            } else if (item.fundLevelCode == this.base.productMarketCode + '2') {
                                this.payAndProfitTwo = item
                            } else if (item.fundLevelCode == this.base.productMarketCode + '3') {
                                this.payAndProfitThree = item
                            }
                        })
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            checkWebSite () {
                var webSite = this.base.productInfoLink
                this.base.productInfoLink = webSite.replace(/[\u4e00-\u9fa5]/g,'')
            },
            addHouseRate () {
                var obj = {
                    id: '',
                    houseCname: '',
                    financeProductCode: localStorage.getItem('id'),
                    houseId: '',
                    productHouseRate: ''
                }

                this.nowHouseData = obj
                this.addHouse = true
            },
            addCashRow (index) {
                if (!this.base.productPublishTime) {
                    this.$message({
                        message: '请先保存发行时间！',
                        type: 'warning'
                    })
                    return false
                }

                if (!this.base.productEndTime) {
                    this.$message({
                        message: '请先保存清算时间！',
                        type: 'warning'
                    })
                    return false
                }

                var yearList = []
                var startYear = Number(this.base.productPublishTime.split('-')[0])
                var endYear = Number(this.base.productEndTime.split('-')[0])

                for (var i = startYear; i <= endYear; i++) {
                    yearList.push(i)
                }
                this.yearsData = yearList

                this.cashData = {
                    financeProductCode: localStorage.getItem('id'),
                    houseId: this.perList[index].houseId,
                    houseForcastCashflow: '',
                    year: '',
                    houseGuaranteeCashflow: '',
                    houseRealCashflow: '',
                    fundPriorityLevelPayback: '',
                    fundMiddleLevelPayback: '',
                    fundLastLevelPayback: ''
                }

                this.isAddCash = true
            },
            deleteRow (item) {
                util.request({
                    method: 'post',
                    interface: 'deleteFinanceProductHouser',
                    data: {
                        id: item.id
                    }
                }).then(res => {
                    if (res.result.success == '1') {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        })
                        this.findListByProductCode()
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            savePayAndProfit (type) {
                util.request({
                    method: 'post',
                    interface: 'saveOrUpdate',
                    data: this[type]
                }).then(res => {
                    if (res.result.success == '1') {
                        this.findByProductInfo()
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            saveRow (row) {
                if (!row.productHouseRate) {
                    this.$message({
                        message: '占比不能为空！',
                        type: 'warning'
                    })
                    return false
                }

                if (!row.productHouseRate) {
                    this.$message({
                        message: '占比不能为空！',
                        type: 'warning'
                    })
                    return false
                }

                util.request({
                    method: 'post',
                    interface: 'financeProductHouseSave',
                    data: row
                }).then(res => {
                    if (res.result.success == '1') {
                        this.findListByProductCode()
                        this.addHouse = false
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            saveCash (data) {
                util.request({
                    method: 'post',
                    interface: 'saveFundCashflow',
                    data: [data]
                }).then(res => {
                    if (res.result.success == '1') {
                        this.isAddCash = false
                        this.findListByProductCode()
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            deleteCash (item) {
                util.request({
                    method: 'post',
                    interface: 'deleteFundCashflow',
                    data: {
                        id: item.id
                    }
                }).then(res => {
                    if (res.result.success == '1') {
                        this.findListByProductCode()
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            setContent (data) {
                this.base.productDesc = data.content
            },
            collChange () {
                localStorage.setItem("houseColl", this.activeNames)
            },
            changeImg (data) {
                this.base.productLogo = data.url
            },
            changeArcImg (data) {
                this.base.productArcUrl = data.url
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
                if (!this.base.productCame) {
                    this.$message({
                        message: '证券名称不能为空！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.publishTime != this.base.productPublishTime && this.perList.length) {
                    this.$message({
                        message: '要更改发行时间，请先清空资产现金流！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.endTime != this.base.productEndTime && this.perList.length) {
                    this.$message({
                        message: '要更改结算时间，请先清空资产现金流！',
                        type: 'warning'
                    })
                    return false
                }

                if (this.base.productPublishTime && this.base.productEndTime) {
                    if (new Date(this.base.productEndTime).getTime() <= new Date(this.base.productPublishTime).getTime()) {
                        this.$message({
                            message: '结算时间必须大于发行时间！',
                            type: 'warning'
                        })
                    return false
                    }
                }

                if (this.base.productPublishTime) {
                    this.base.productPublishTime = this.formDataDate(this.base.productPublishTime)
                }

                if (this.base.productEndTime) {
                    this.base.productEndTime = this.formDataDate(this.base.productEndTime)
                }

                if (this.productSalesOrgArr.length) {
                    this.base.productSalesOrg = this.productSalesOrgArr.join(',')
                } else {
                    this.base.productSalesOrg = ''
                }

                if (this.productEvaluationOrgArr.length) {
                    this.base.productEvaluationOrg = this.productEvaluationOrgArr.join(',')
                } else {
                    this.base.productEvaluationOrg = ''
                }

                if (this.productRatingOrgArr.length) {
                    this.base.productRatingOrg = this.productRatingOrgArr.join(',')
                } else {
                    this.base.productRatingOrg = ''
                }

                if (this.productCashflowConsultingOrgArr.length) {
                    this.base.productCashflowConsultingOrg = this.productCashflowConsultingOrgArr.join(',')
                } else {
                    this.base.productCashflowConsultingOrg = ''
                }

                util.request({
                    method: 'post',
                    interface: 'saveOrUpdateFinance',
                    data: this.base
                }).then(res => {
                    if (res.result.success == '1') {
                        this.$parent.$refs.listBox.loadList('reload')
                    } else {
                        this.$message.error(res.result.message)
                    }
                })
            },
            saveAll () {
                // this.saveBase()
            },
            getInvests () {
                util.request({
                    method: 'get',
                    interface: 'findEntByEntType',
                    data: {
                        enterpriseTypes: 'propertys_investmen_type_1,propertys_investmen_type_2'
                    }
                }).then(res => {
                    this.investList = res.result.result
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
            ewmUpload,
            ueditor,
            searchFilter
        }
    }
</script>
<style lang="scss">
.form-invest {
    margin-top: 30px;

    .el-table .cell {
        padding: 0 10px;
    }

    .cashBox {
        margin-top: 20px;
    }

    .asset-money {
        display: flex;

        .cover-img {
            width: 200px;
            height: 120px;
        }

        .right-content {
            flex: 1;
            margin-left: 15px;

            div {
                height: 40px;
                font-size: 14px;
                color: #1f2d3d;
                line-height: 40px;

                .list-input {
                    display: inline-block;
                    width: 205px;

                    input {
                        height: 30px;
                    }
                }
            }
        }
    }

    .btn-box {
        height: 30px;
        margin-top: 10px;
        text-align: right;
    }

    .table-btn-box {
        height: 40px;
        padding: 0 18px;
        text-align: right;
        line-height: 40px;
    }

    .el-dialog--small {
        width: 400px;
    }

    .upload-list-box {
        width: 110%;
    }

    .form-cash {
        .el-form-item {
            margin-bottom: 10px;
        }
    }

    .table-input-box {
        width: 100%;
        height: 30px;

        .el-input__inner {
            height: 30px;
        }
    }

    .formStyle {
        position: relative;
        width: 640px;
        margin: 0 auto;

        .el-table, .el-table .cell, .el-table__footer-wrapper {
            overflow: visible;
        }

        .el-table__body-wrapper, .el-table__header-wrapper {
            overflow: visible;
        }

        .demo-table-expand {
            font-size: 0;
        }
        .demo-table-expand label {
            float: left;
            width: 150px;
            color: #99a9bf;
        }

        .demo-table-expand .el-form-item__content {
            width: 110px;
            float: left;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }

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

    .line-sper {
        border-top: 1px solid #99A9BF;
        margin: 20px 0;
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
            width: 100px;
            height: 30px;
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
            width: 205px;

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
            width: 540px;

            .el-select {
                width: 540px;
            }
        }

        .el-textarea {
          width: 540px;
        }
    }

    .rightF {
        float: right;
    }

    .form-big-box {
        .baseInput {

            &>span {
                float: left;
                width: 120px;
            }

            .input-box {
                width: 185px;
            }
        }

        .bigB {
            .input-box {
                width: 520px;

                .el-select {
                    width: 520px;
                }
            }

            .el-textarea {
              width: 520px;
            }
        }
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