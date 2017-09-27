<template>
    <div class="form-b">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="formStyle" title="物业基本信息" name="1">
            <section v-if="$route.params.type === 'edit'" class="baseInput bigB">
                <span>楼盘名字</span>
                <el-input
                  class="input-box"
                  placeholder="请输入内容"
                  :disabled="true"
                  v-model="base.name">
                </el-input>
            </section>
            <search-box v-if="$route.params.type !== 'edit'" :is-page="true" @mapChange="drawMap"></search-box>
            <div id="container"></div>
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
                    <el-select class="input-box" v-model="base.mall" placeholder="请选择">
                        <el-option
                          v-for="item in malls"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput">
                    <span>物业类型</span>
                    <el-select class="input-box" v-model="base.proType" placeholder="请选择">
                        <el-option
                          v-for="item in types.property"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput rightF">
                    <span>楼盘等级</span>
                    <el-select class="input-box" v-model="base.level" placeholder="请选择">
                        <el-option
                          v-for="item in types.level"
                          :key="item"
                          :label="item"
                          :value="item">
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
                    <span>容积率</span>
                    <el-input-number class="input-box" size="small" :step="0.01" :min="0" :max="1" v-model="base.ratio"></el-input-number>
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
                    <el-select class="input-box" v-model="base.floor" placeholder="请选择">
                        <el-option
                          v-for="item in types.floors"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </section>
                <section class="baseInput rightF">
                    <span>物业持有</span>
                    <el-select class="input-box" v-model="base.holding" placeholder="请选择">
                        <el-option
                          v-for="item in types.hold"
                          :key="item"
                          :label="item"
                          :value="item">
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
                            :multiple-limit="3"
                            placeholder="请选择文章标签">
                            <el-option
                              v-for="item in benchList"
                              :key="item.title"
                              :label="item.title"
                              :value="item.title">
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
            <div v-for="(item, index) in changes" class="over-box">
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
                <section class="baseInput bigB">
                    <span>所属地块</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="item.block">
                    </el-input>
                </section>
                <div class="clear"></div>
                <el-button class="save-sub-btn" type="info" :plain="true" size="small" icon="document"
                  @click="saveData('changes', item.id)">保存</el-button>
                <el-button class="delete-btn" type="danger" :plain="true" size="small" icon="delete" @click="deleteChange(index, item.id)">删除</el-button>
            </div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyle" title="物业租金历史" name="3">
            <el-button class="add-btn" type="primary" size="small" icon="plus" @click="addRent">增加</el-button>
            <div v-for="(item, index) in rents" class="over-box">
                <section class="baseInput">
                    <span>交易日期</span>
                    <el-date-picker
                      class="input-box"
                      v-model="item.date"
                      type="date"
                      placeholder="选择日期"
                      @change="saveData"
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
                  @click="saveData('rents', item.id)">保存</el-button>
                <el-button class="delete-btn" type="danger" :plain="true" size="small" icon="delete" @click="deleteRent(index, item.id)">删除</el-button>
            </div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyle editShow" title="物业评述" name="4">
            <section class="abInput">
              <el-select class="se-box"
                  v-model="investor" placeholder="请选择投资顾问">
                  <el-option
                    v-for="item in investors"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
              </el-select>
            </section>
            <div class="clear"></div>
            <edit-box :article-in="articleinfo"></edit-box>
            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                @click="saveData('articleinfo')">保存</el-button>
            <div class="clear"></div>
          </el-collapse-item>
          <div class="line-bold"></div>
          <el-collapse-item class="formStyle" title="物业外观图片" name="5">
            <upload-list :img-lists="appearance" @showimg="showImg"></upload-list>
            <div class="clear"></div>
            <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
                @click="saveData('appearance')">保存</el-button>
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
    </div>
</template>
<script>
import searchBox from '../common/search-box.vue'
import util from '../../assets/common/util'
import uploadList from '../../components/index/upload-list'
import swiperImg from '../../components/common/swiper-img.vue'
import editBox from '../../components/common/edit'

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
              proType: '',
              level: '',
              massif: '',
              year: 0,
              ratio: 1,
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
              traffic: ''
            },
            investor: '',
            changes: [
                {
                    date: '',
                    price: '',
                    changeA: '',
                    changeB: '',
                    block: ''
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
                property: [],
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
            surround: []
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
        if (this.type !== 'add') {
            var houseColl = localStorage.getItem("houseColl")
            if (houseColl) {
                this.activeNames = houseColl.split(',')
            }
            this.getAllData()
            this.drawMap()
        }
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
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'base',
              data: {
                id: localStorage.getItem("id")
              }
          }).then(res => {
              this.base = res.result.datas.base
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
              this.appearance = res.result.datas.appearance
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
              this.public = res.result.datas.public
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
              this.surround = res.result.datas.surround
          })
        },
        getArticle () {     
          util.request({
              method: 'get',
              interface: 'articleHouse',
              data: {
                id: localStorage.getItem("id"),
                fileCode: localStorage.getItem("fileCode")
              }
          }).then(res => {
              this.investor = res.result.result.investor
              this.articleinfo = res.result.result.fileAreaList
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
              this.changes = res.result.datas.changes
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
              this.rents = res.result.datas.rents
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
        saveData (type, index) {
            var formData = {
              id: localStorage.getItem("id"),
              type: type,
              data: this[type],
            }

            if (index !== undefined) {
              formData.index = index
            }

            if (type === 'articleinfo') {
              formData.investor = this.investor
            }

            util.request({
                method: 'post',
                interface: 'draftArticle',
                data: formData
            }).then(res => {
                console.log(res)
            })
        },
        getTypes () {
            util.request({
                method: 'get',
                interface: 'typeMap',
                data: {}
            }).then(res => {
                this.types = res.result.datas
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
                this.benchList = res.result.datas
            })
        },
        drawMap (mapInfo) {
            if (mapInfo) {
                base.city = mapInfo.city
                base.point = {
                    lng: mapInfo.point.lng,
                    lat: mapInfo.point.lat
                }
                var point = new window.BMap.Point(mapInfo.point.lng, mapInfo.point.lat)
            } else {
                var point = new window.BMap.Point(this.base.point.lng, this.base.point.lat)
            }
            
            this.getMalls()
            this.map.clearOverlays()
            this.map.panTo(point)
            var marker = new BMap.Marker(point)
            this.map.addOverlay(marker)
        },
        getMalls () {
            util.request({
                method: 'get',
                interface: 'malls',
                data: {
                    city: this.base.city
                }
            }).then(res => {
                this.malls = res.result.datas
            })
        },
        getInvestors () {
            util.request({
                method: 'get',
                interface: 'getInvestors',
                data: {
                    id: localStorage.getItem("id")
                }
            }).then(res => {
                this.investors = res.result.datas
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
    components: {
        searchBox,
        uploadList,
        swiperImg,
        editBox
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
    height: 140px;
    margin: 15px 0;
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