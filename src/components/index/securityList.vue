<template>
  <div class="allBoxA">
    <section class="head-part">
        <span class="add-dir" @click="setOneData">添加机构</span>
    </section>

    <el-menu :default-active="activeName" class="el-menu-vertical-demo">
        <el-menu-item
            class="one-list"
            v-for="(item, index) in treeData"
            :index="index + ''">
            <div class="lists-box"
                @click="getInfo(item.nodeCode)">

                <img class="img-box" :src="item.imgUrl">

                <div class="p-box">

                    <span class="title">{{item.label}}</span>

                    <div>
                        <i class="el-icon-delete del-icon"
                            v-if="!item.status"
                            @click.stop="delItem(item.nodeCode)"></i>
                    </div>
                </div>
            </div>
        </el-menu-item>
    </el-menu>

    <el-dialog title="添加机构" :visible.sync="isAddTreeOne">
      <el-form :label-position="'left'" :model="addFormOne" label-width="80px">
        <el-form-item label="标题">
            <el-input v-model="addFormOne.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button @click="isAddTreeOne = false">取 消</el-button>
            <el-button type="primary" @click="isAddTreeOne = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import util from '../../assets/common/util'
  import $ from 'Jquery'
  export default{
    data(){
      return {
        filterText: '',
        treeData: [
          {
            nodeCode: 0,
            label: '第一企业证券',
            imgUrl: '/static/images/bench1.png'
          },
          {
            nodeCode: 1,
            label: '第二企业证券',
            imgUrl: '/static/images/bench1.png'
          }
        ],
        activeName: '',
        openeds: [],
        addData: {},
        roleList: [],
        checkedRoles: [],
        isAddTreeOne: false,
        addFormOne: {
            title: ''
        },
        currentData: {},
        pageSize: 21,
        pageNumber: 1,
        total: 0
      }
    },
    mounted(){
      // this.loadList()
    },
    methods: {
      loadList(){
        util.request({
          method: 'get',
          interface: 'productTree',
          data: {}
        }).then(res => {
          this.treeData = res.result.result
          if (!this.treeData.length) {
            return
          }

          var data = {
            code: this.treeData[0].nodeCode
          }
          setTimeout(() => {
              localStorage.setItem('id', data.code)
              this.$emit('getInfo', data)
          }, 0)
        })
      },
      reLoadList (data) {
        util.request({
          method: 'get',
          interface: 'productTree',
          data: {}
        }).then(res => {
          this.treeData = res.result.result

          for (var i = 0, len = this.treeData.length; i < len; i++) {
            if (data.code == this.treeData[i].nodeCode) {
              this.activeName = i
              break
            }
          }

          setTimeout(() => {
            this.$emit('getInfo', data)
          }, 0)
        })
      },
      setOneData () {
        this.isAddTreeOne = true
      },
      getInfo (code) {
        var data = {
          code: code
        }
        localStorage.setItem('id', code)
        this.$emit('getInfo', data)
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
      deleteArticleById (id) {
        util.request({
          method: 'post',
          interface: 'deleteDraftFile',
          data: {
            html5PageCode: id
          }
        }).then(res => {
          this.loadList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }
    }
  }
</script>
<style lang="scss">
  .allBoxA {
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

    .head-part {
        padding: 10px;
        box-sizing: border-box;
        display: flex;

        .search-title {
          flex: 1;
        }

        .add-dir {
            display: block;
            width: 100%;
            height: 36px;
            font-size: 16px;
            color: #000000;
            text-align: center;
            background: #ffffff;
            line-height: 36px;
            cursor: pointer;
            border: 1px solid #E0E0E0;
            border-radius: 5px;
        }
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

    .right-btn {
        float: right;
        margin: 18px 30px 0 3px;
        font-size: 17px;
    }

    .del-btn {
        float: right;
        margin-top: 18px;
        font-size: 17px;
    }
  
    .two-list {
        .el-submenu__title {
            font-size: 14px;
            color: #000000;
            background: #F9F9F9;
            border-bottom: 1px solid #E0E0E0;

            &:hover {
              background: #EFF2F7;
            }
        }
    }

    .el-menu-item {
        height: 60px;
        background: #F9F9F9;
        border-bottom: 1px solid #E0E0E0;

        .lists-box {
          position: relative;
          display: block;
          width: 100%;
          height: 60px;
          box-sizing: border-box;
          cursor: pointer;

          .img-box {
            float: left;
            width: 50px;
            height: 30px;
            margin: 15px 15px 0 0;
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

              i {
                float: right;
                width: 16px;
                height: 16px;
                margin-left: 3px;
                font-size: 16px;
                color: #000000;

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

    .one-list {
        padding-right: 45px !important;
    }
  }
</style>
