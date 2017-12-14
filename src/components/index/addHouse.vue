<template>
    <section class="add-box-house">
        <el-dialog title="添加楼盘" :visible.sync="isAdd.value">
            <search-box :is-page="true"
                    @mapChange="drawMap"
                    :city="city"
                    ref="searMap"></search-box>

            <section class="baseInput bigB">
                <span>楼盘简称</span>
                <el-input
                        class="input-box"
                        placeholder="请输入内容"
                        v-model="houseDatas.name">
                </el-input>
            </section>

            <div id="containerhouse"></div>
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
    props: ['isAdd', 'city', 'houseData'],
    data () {
        return {
            houseDatas: {
                name: '',
                point: '',
                cname: ''
            },
            isSubmit: true
        }
    },
    methods: {
        initMap () {
            this.$refs.searMap.resetKey()
            this.isSubmit = true
            
            if (this.map) {
                this.map.clearOverlays()
                return false
            }
            var map = new window.BMap.Map('containerhouse')
            this.map = map
            var point = new window.BMap.Point(116.409, 39.918)
            map.centerAndZoom(point, 15)
        },
        drawMap (mapInfo) {
            this.houseDatas.point = mapInfo.point.lat + ',' + mapInfo.point.lng
            this.houseDatas.cname = mapInfo.title
            this.houseDatas.address = mapInfo.address
            var point = new window.BMap.Point(mapInfo.point.lng, mapInfo.point.lat)
            this.map.clearOverlays()
            this.map.panTo(point)
            var marker = new BMap.Marker(point)
            this.map.addOverlay(marker)
        },
        confirmHandle () {
            if (this.houseDatas.name == '') {
                this.$message({
                  message: '楼盘简称不能为空！',
                  type: 'warning'
                })
                return false
            }
            if (this.houseDatas.name.length > 25) {
                this.$message({
                  message: '楼盘简称最多25个字！',
                  type: 'warning'
                })
                return false
            }

            if (this.houseDatas.cname == '') {
                this.$message({
                  message: '楼盘名称不能为空！',
                  type: 'warning'
                })
                return false
            }

            if (!this.isSubmit) {
                return false
            }

            this.isSubmit = false

            util.request({
              method: 'post',
              interface: 'validateHousesName',
              data: {
                name: this.houseDatas.name
              }
            }).then(res => {
              if (res.result.success == '1') {
                if (res.result.result) {
                    this.$emit('addHouse', this.houseDatas)
                } else {
                    this.$message({
                      message: '已存在该楼盘，不能重复添加！',
                      type: 'warning'
                    })
                }
              } else {
                this.$message.error(res.result.message)
              }
              this.isSubmit = true
            })
        }
    },
    components: {
        searchBox
    }
}
</script>
<style lang="scss">
.add-box-house {
    .el-dialog {
        width: 680px;
    }

    #containerhouse {
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
            color: #1F2D3D;
            line-height: 36px;
        }

        .input-box {
            float: left;
            width: 235px;

            input {
                height: 36px;
            }
        }
    }

    .bigB {
        .input-box {
            width: 575px;
        }
    }

    .clear {
        clear: both;
    }
}
</style>