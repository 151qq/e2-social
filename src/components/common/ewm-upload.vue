<template>
  <div class="ewm-upload-box" :style="{width:width}">
    <label for="ewm-upload">
      <img v-if="!curPath" class="img-big"
          src="../../assets/images/img-default.jpg">
      <img v-else class="img-big" :src="curPath">    
    </label>
    <input class="input-u" id="ewm-upload" type="file" name="" @change="postImg">

    <div>{{titleName}}</div>
  </div>
</template>
<script>
import util from '../../assets/common/util'

export default {
    props: ['path', 'titleName', 'width'],
    data() {
      return {
        curPath: ''
      }
    },
    mounted () {
      this.curPath = this.path
    },
    watch: {
      path () {
        this.curPath = this.path
      }
    },
    methods: {
      postImg (e) {
        util.upFile(e).then(res => {
          let imgUrl = res.result.result[0]
          this.curPath = imgUrl
          var data = {
            url: this.curPath,
          }
          this.$emit('changeImg', data)
        })
      }
    }
}
</script>

<style lang="scss">
.ewm-upload-box {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #f5f5f5;
  border-radius: 3px;

  .img-big {
    display: block;
    width: 100%;
    height: 160px;
  }

  .input-u {
    display: none;
  }

  div {
    display: block;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
  }

  .op-btn {
    float: right;
    margin: 10px 0 0 10px;
  }
}
</style>