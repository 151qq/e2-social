<template>
  <div>
    <section class="upload-box">
      <img v-if="!curPath && !bgPath" class="img-big"
          src="../../assets/images/img-default.jpg" @click="showSelect">
      <img v-if="!curPath && bgPath" class="img-big"
          src="../../assets/images/page-img.jpg" @click="showSelect">
      <img v-else class="img-big" :src="curPath" @click="showSelect">
      <section v-if="isBtn">
        <el-button class="op-btn"
            type="info"
            :plain="true"
            size="small"
            icon="document"
            @click="savePath">保存</el-button>
        <el-button v-if="!noDel"
            class="op-btn"
            type="danger"
            :plain="true"
            size="small"
            icon="delete"
            @click="deleImg">删除</el-button>
      </section>

      
    </section>
    
    <!-- 本地或素材库选择框 -->
    <el-dialog title="文件上传" :visible.sync="isShow" size="tiny">
      <div class="btn-sel">
        <p>
          <button class="ben-btn">本地文件</button>
          <input type="file" class="ben-input" @change="postImg($event)">
        </p>

        <button class="su-btn" @click="showFile">素材库</button>
      </div>
    </el-dialog>

    <file-lists :select-data="selectData" @suSelect="suSelect"></file-lists>
  </div>
</template>
<script>
import $ from 'Jquery'
import interfaces from '../../assets/common/interfaces'
import util from '../../assets/common/util'
import fileLists from '../../components/common/fileLists'

export default {
    props: ['path', 'num', 'noDel', 'idx', 'isBtn', 'bgPath'],
    data() {
      return {
        isShow: false,
        selectData: {
          isShow: false,
          url: ''
        },
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
      suSelect (datas) {
        this.curPath = datas.url
        var data = {
          index: this.num,
          url: datas.url,
          id: this.idx
        }
        this.$emit('changeImg', data)
      },
      deleImg () {
        var data = {
          index: this.num,
          id: this.idx
        }
        this.$emit('delImg', data)
      },
      postImg (e) {
        util.upFile(e).then(res => {
          console.log(res)
          let imgUrl = res.result.result[0]
          this.curPath = imgUrl
          var data = {
            index: this.num,
            url: this.curPath,
            id: this.idx
          }
          this.isShow = false
          this.$emit('changeImg', data)
        })
      },
      showSelect () {
        this.isShow = true
      },
      showFile () {
        this.isShow = false
        this.selectData.isShow = true
      },
      resetPath () {
        this.curPath = ''
        var data = {
          index: this.num,
          url: '',
          id: this.idx
        }
        this.$emit('changeImg', data)
      },
      savePath () {
        this.$emit('saveImg')
      }
    },
    components: {
      fileLists
    }
}
</script>

<style lang="scss">
.el-dialog--tiny {
  width: 380px;
}

.upload-box {
  overflow: hidden;
  position: relative;
  cursor: pointer;

  .img-big {
    display: block;
    width: 100%;
    height: auto;
  }

  div {
    display: block;
    padding: 16px 0;
    overflow: hidden;
      
    .del-btn {
      float: right;
      cursor: pointer;
      margin-right: 13px;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .op-btn {
    float: right;
    margin: 10px 0 0 10px;
  }
}

.btn-sel {
  overflow: hidden;
  margin-bottom: 10px;

  p {
    position: relative;
    float: left;
    width: 120px;
    height: 30px;
    overflow: hidden;
    margin-left: 20px;
    cursor: pointer;

    .ben-btn {
      display: block;
      width: 120px;
      height: 30px;
      background: #20A0FF;
      font-size: 12px;
      color: #ffffff;
      line-height: 30px;
      text-align: center;
      border: none;
      padding: 0;
      border-radius: 3px;
      overflow: hidden;
    }

    .ben-input {
      position: absolute;
      left: 0;
      top: 0;
      width: 120px;
      height: 30px;
      opacity: 0.01;
    }
  }

  .su-btn {
    float: right;
    width: 120px;
    height: 30px;
    background: #20A0FF;
    font-size: 12px;
    color: #ffffff;
    line-height: 30px;
    text-align: center;
    border: none;
    padding: 0;
    border-radius: 3px;
    overflow: hidden;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>