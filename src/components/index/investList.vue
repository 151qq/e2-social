<template>
  <div class="allBox">
    <el-input
      class="search-title"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-menu :default-active="activeName" :default-openeds="openeds" class="el-menu-vertical-demo">
      <el-submenu class="two-box" v-for="(item1, index1) in treeData" :index="index1 + ''">
        <template slot="title">
          {{item1.dictKeyValue}}

          <span @click.stop="setData(item1, index1)" class="add-box">
          +
          </span>
        </template>
        <el-menu-item v-for="(item2, index2) in item1.childNodes"
            :index="index1 + '-' + index2">

              <div class="lists-box"
                  @click="getInfo(item1.dictKeyCode, item2.enterpriseCode, index1, index2)">
                  <div class="img-box">
                      <img v-if="item2.enterpriseLogoUrl" :src="item2.enterpriseLogoUrl">
                  </div>
                <div class="p-box">
                  <span class="title">{{item2.enterpriseCname}}</span>
                  <div>
                    <img
                        @click.stop="delItem(item2.enterpriseCode)"
                        src="../../assets/images/delete-icon.png">
                  </div>
                </div>
              </div>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <el-dialog title="添加机构" :visible.sync="isAddTreeOne">
      <el-form :label-position="'left'" :model="addFormOne" label-width="80px">
        <el-form-item label="标题">
            <el-input v-model="addFormOne.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button @click="isAddTreeOne = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import util from '../../assets/common/util'
  import interfaces from '../../assets/common/interfaces'
  import addDir from '../common/addDir.vue'
  import $ from 'Jquery'
  export default{
    data(){
      return {
        isfirst: true,
        filterText: '',
        treeData: [],
        activeName: '0-0',
        openeds: ['0'],
        isAddTreeOne: false,
        addFormOne: {
          title: '',
          id: '',
          type: ''
        },
        addDirIndex: ''
      }
    },
    components: {
      addDir
    },
    mounted(){
      this.loadList()
    },
    watch: {
      filterText (value) {
        var opens = []
        if (value === '') {
          let arrs = this.activeName.split('-')
          opens = [arrs[0], arrs[0] + '-' + arrs[1]]
          this.openeds = opens
          return false
        }

        this.treeData.forEach((item1, index1) => {
          // 外层有，打开
          if (item1.label.indexOf(value) > -1) {
            opens.push(String(index1))
          }

          if (!item1.childNodes || !item1.childNodes.length) {
            return false
          }
          // 外层没有，内层有，也要打开外层
          item1.childNodes.forEach((item2, index2) => {
            if (item2.enterpriseCname.indexOf(value) > -1) {
              opens.push(String(index1))
              opens.push(String(index1 + '-' + index2))
            }
          })
        })
        this.openeds = opens
      }
    },
    methods: {
      loadList(type){
        var formData = {}
        util.request({
          method: 'get',
          interface: 'investTree',
          data: formData
        }).then(res => {
          this.treeData = res.result.result

          if (type) {
            return false
          }



          if (this.treeData[0].childNodes.length) {
            let id = this.treeData[0].childNodes[0].enterpriseCode
            let dirCode = this.treeData[0].dictKeyCode

            let data = {
              id: id
            }
            // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
            localStorage.setItem("id", id)
            localStorage.setItem("dirCode", dirCode)
            this.$emit('getInfo', data)
          } else {
            let data = {
              id: null
            }

            localStorage.removeItem("id")
            localStorage.removeItem("dirCode")
            this.$emit('getInfo', data)
          }
        })
      },
      reloadList(newId){
        util.request({
          method: 'get',
          interface: 'investTree',
          data: {}
        }).then(res => {
          this.treeData = res.result.result

          var arrData = this.treeData[this.addDirIndex]

          this.openeds = [String(this.addDirIndex)]
          for(var i = 0, len = arrData.childNodes.length; i < len; i++) {
            if (arrData.childNodes[i].enterpriseCode == newId) {
              setTimeout(() => {
                this.activeName = this.addDirIndex + '-' + i
              }, 0)
              break
            }
          }

          let formData = {
            id: newId
          }
          // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
          localStorage.setItem("id", newId)
          localStorage.setItem("dirCode", arrData.dictKeyCode)
          this.$emit('getInfo', formData)
        })
      },
      setData (item1, index1) {
        this.addFormOne.title = ''
        this.addFormOne.type = item1.dictKeyCode
        this.addDirIndex = index1
        this.isAddTreeOne = true 
      },
      confirmAdd () {
        // 其查查，添加，设置ID
        if (!this.addFormOne.title) {
          this.$message.error('企业机构名称不能为空！')
          return
        }

        if (!this.addFormOne.type) {
          this.$message.error('请重新添加！')
          return
        }

        var formData = {
            enterpriseCname: this.addFormOne.title,
            enterpriseType: this.addFormOne.type
        }

        util.request({
            method: 'post',
            interface: 'saveInvestBase',
            data: formData
        }).then(res => {
            // this.$parent.$refs.listBox.reloadList(res.result.result.id)
            if (res.result.success == '1') {
              this.isAddTreeOne = false
              this.addFormOne.id = res.result.result.enterpriseCode
              this.reloadList(this.addFormOne.id)
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      delItem (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteArticleById(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getInfo (code1, code2, index1, index2) {
        
        var curIndex = index1 + '-' + index2
        if (this.activeName === curIndex) {
          return false
        }
        this.activeName = curIndex
        var data = {
          id: code2
        }
        // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
        localStorage.setItem("id", code2)
        localStorage.setItem("dirCode", code1)

        this.$emit('getInfo', data)
      },
      deleteArticleById (id) {
        util.request({
          method: 'post',
          interface: 'removeBase',
          data: {
            enterpriseCode: id
          }
        }).then(res => {
          if (res.result.success == '1') {
            this.loadList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error(res.result.message)
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .allBox {
    width: 400px;
    background: #F9F9F9;

    .el-dialog__body {

      .el-pagination {
        padding: 0;
      }

      .el-checkbox-group {
        max-height: 252px;
        overflow: hidden;

        .el-checkbox {
          width: 190px;
          float: left;
          margin: 0;
          box-sizing: border-box;
          margin-bottom: 15px;
          margin-right: 10px;
          overflow: hidden;
        }
      }
    }

    .el-dialog--small {
      width: 640px;
    }

    .search-title {
      margin: 10px 0;
      padding: 0 10px;
      box-sizing: border-box;
    }

    .el-submenu {
      .el-submenu__title {
        font-size: 16px;
        color: #000000;
        background: #F0F0F0;
        border-bottom: 1px solid #E0E0E0;

        &:hover {
          background: #EFF2F7;
        }
      }
    }

    .one-box {
      .add-box {
        float: right;
        font-size: 30px;
        margin-right: 30px;
        line-height: 56px;
        margin-top: -4px;
        color: #000000;
      }
    }

    .two-box {
      background: #F9F9F9;

      .add-box {
        float: right;
        font-size: 30px;
        margin-right: 30px;
        line-height: 56px;
        margin-top: -4px;
        color: #000000;
      }

      .delete-box {
        float: right;
        font-size: 18px;
        margin-right: 10px;
        line-height: 52px;
        color: #000000;
      }
  
      .el-submenu__title {
        font-size: 14px;
        color: #000000;
        background: #F9F9F9;
        border-bottom: 1px solid #E0E0E0;

        &:hover {
          background: #EFF2F7;
        }
      }

      .el-menu-item {
        height: 60px;
        background: #F9F9F9;
        border-bottom: 1px solid #E0E0E0;

        .lists-box {
          position: relative;
          height: 60px;
          box-sizing: border-box;
          cursor: pointer;

          .img-box {
            float: left;
            width: 50px;
            height: 30px;
            margin: 15px 15px 0 0;
            background: #cfcfd0;

            img {
              display: block;
              width: 50px;
              height: 30px;
            }
          }

          .p-box {
            float: left;
            width: 200px;
            margin-top: 10px;

            .title {
              display: block;
              font-size: 14px;
              height: 40px;
              color: #000000;
              line-height: 20px;
              white-space: normal;
              word-wrap:break-word;
              word-break:break-all;
            }

            div {
              display: none;
              position: absolute;
              right: -27px;
              top: 10px;
              width: 48px;
              height: 16px;
              cursor: pointer;

              img {
                float: right;
                width: 16px;
                height: 16px;
                margin-left: 8px;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }
        }

        &.is-active {
          background: #EFF2F7;
        }

        &:hover {
          background: #EFF2F7;

          .p-box div {
            display: block;
          }
        }
      }
    }
  }
</style>
