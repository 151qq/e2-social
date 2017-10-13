<template>
  <div class="input-out" @click.stop="showModel">
    <el-input 
      placeholder="请输入需查询的楼盘地址"
      v-model="keyValue"
      style="width: 544px;"
      @change="getMess"
      >
    </el-input>
    <el-button class="search-btn" type="primary" icon="search" @click.stop="getMess">
      搜索
    </el-button>
    <div class="mess-box" v-show="messDate.length !== 0 && isShow">
      <a v-for="item in messDate" class="nav-r" @click.stop="goMap(item)">{{ item.title }}</a>
    </div>
  </div>
</template>
<script>
import $ from 'Jquery'
import util from '../../assets/common/util'

export default {
  props: {
    isPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: false,
      keyValue: '',
      messDate: [],
      count: 0
    }
  },
  created () {
    var _self = this
    $('body').click(function () {
      _self.keyValue = ''
      _self.messDate = []
      _self.isShow = false
    })
  },
  methods: {
    // 获取搜索数据
    getDatas (vr) {
      // 记录被调用序号
      var count = this.count

      let formData = {
        type: this.$route.name,
        vr: vr
      }

      util.request({
          method: 'get',
          interface: 'searchMap',
          data: formData
      }).then(res => {
          if (count !== this.count) {
            return false
          }
          this.messDate = res.result.datas
      })
    },
    getMess () {
      if (this.keyValue === '') {
        return false
      }
      // getMess
      let _self = this
      this.isShow = true
      var options = {
        onSearchComplete (results) {
          // 更新调用记录
          _self.count++
          _self.getDatas(results.vr)
        },
        autoViewport: true
      }
      var local = new window.BMap.LocalSearch('北京', options)
      local.search(this.keyValue)
    },
    showModel () {
      this.isShow = true
    },
    hideMess (e) {
      this.isShow = false
    },
    goMap (item) {
      if (this.keyValue === '') {
        this.$message.error('请输入搜索关键字')
        return false
      }

      this.isShow = false
      this.$emit('mapChange', item)
    }
  }
}
</script>
<style lang="scss">
  .input-out {
    position: relative;
    display: inline-block;

    .mess-box {
      position: absolute;
      left: 0;
      top: 49px;
      width: 534px;
      box-sizing: border-box;
      padding: 15px 0;
      border: 1px solid #C0CCDA;
      text-align: left;
      background: #ffffff;
      z-index: 10;
      
      .nav-r {
        display: block;
        padding: 0 15px;
        font-size: 14px;
        line-height: 30px;
        color: #333333;
        cursor: pointer;

        &:hover {
          background: #C0CCDA;
        }
      }
    }

    .el-input {
      display: inline-block;
    }

    .search-btn {
      position: relative;
      float: right;
      margin-left: -10px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 36px;
      font-size: 16px;
      padding: 0 23px;
    }
  }
</style>