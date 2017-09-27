<template>
  <div class="allBox">
    <el-input
      class="search-title"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-menu :default-active="activeName" :default-openeds="openeds" class="el-menu-vertical-demo">
      <el-submenu v-for="(item1, index1) in treeData" :index="index1 + ''">
        <template slot="title">{{item1.label}}</template>
        <el-submenu class="two-box" v-for="(item2, index2) in item1.children" :index="index1 + '-' + index2">
          <template slot="title">{{item2.label}}</template>
          <el-menu-item v-for="(item3, index3) in item2.children" 
              :index="index1 + '-' + index2 + '-' + index3">

                <div class="lists-box"
                    @click="getInfo(item3.id, item3.tplCode, index1, index2, index3)">
                  <img class="img-box" :src="item3.imgUrl">
                  <div class="p-box">
                    <span class="title">{{item3.title}}</span>
                    <span class="des">{{item3.address}}</span>
                    <div>
                      <img v-if="!item3.state" @click.stop="submitItem(item3.id, item3.html5PageCode, index1, index2, index3)" src="../../assets/images/yfb.png">
                      <img @click.stop="delItem(item3.id, item3.html5PageCode, index1, index2, index3)" src="../../assets/images/delete-icon.png">
                    </div>
                  </div>
                </div>

          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

  </div>
</template>
<script>
  import util from '../../assets/common/util'
  export default{
    data(){
      return {
        curIndex: 0,
        isfirst: true,
        filterText: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        activeName: '0-0-0',
        openeds: ['0', '0-0']
      }
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
        if (!this.treeData[0].children.length) {
          return false
        }
        this.treeData.forEach((item1, index1) => {
          // 外层有，打开
          if (item1.label.indexOf(value) > -1) {
            opens.push(String(index1))
          }

          if (!item1.children.length) {
            return false
          }
          // 外层没有，内层有，也要打开外层
          item1.children.forEach((item2, index2) => {
            if (item2.label.indexOf(value) > -1) {
              opens.push(String(index1))
              opens.push(String(index1 + '-' + index2))
            }

            if (!item2.children.length) {
              return false
            }

            item2.children.forEach((item3, index3) => {
              if (item3.title.indexOf(value)> -1) {
                opens.push(String(index1))
                opens.push(String(index1 + '-' + index2))
              }
            })
          })
        })
        this.openeds = opens
      }
    },
    methods: {
  		//获取时间		
  		getTime(data){		
  			this.timer = data?data:'';		
  			this.list = [];		
  			this.pageNumber = 1;		
  			this.loadList();		
  		},
      loadList(){
        var formData = {}
        util.request({
          method: 'get',
          interface: this.$route.name + 'Tree',
          data: formData
        }).then(res => {
          this.treeData = res.result.datas
          if (this.treeData[0].children.length && this.isfirst) {
            let id = this.treeData[0].children[0].children[0].id
            let tplCode = this.treeData[0].children[0].children[0].tplCode
            let fileCode = this.treeData[0].children[0].children[0].fileCode

            let data = {
              id: id,
              tplCode: tplCode
            }
            this.$emit('getInfo', data)
            // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
            localStorage.setItem("id", id)
            localStorage.setItem("tplCode", tplCode)
            localStorage.setItem("fileCode", fileCode)
            this.isfirst = false
          }
        })
      },
      delItem (id, html5PageCode, index1, index2, index3) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteById(id, html5PageCode, index1, index2, index3)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
      },
      submitItem (id, html5PageCode, index1, index2, index3) {
        this.$confirm('此操作将发布该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitById(id, html5PageCode, index1, index2, index3)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })       
        })
      },
      getInfo (id, tplCode, index1, index2, index3) {
        if (this.curIndex === index3) {
          return false
        }
        this.curIndex = index3
        this.activeName = index1 + '-' + index2 + '-' + index3
        var data = {
          id: id,
          tplCode: tplCode
        }
        this.$emit('getInfo', data)
        // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
        localStorage.setItem("id", id)
        localStorage.setItem("tplCode", tplCode)
      },
      deleteById (id, html5PageCode, index1, index2, index3) {
        util.request({
          method: 'post',
          interface: 'deleteDraftFile',
          data: {
            id: id,
            html5PageCode: html5PageCode
          }
        }).then(res => {
          if (this.treeData[index1].children[index2].children.length === 1) {
            if (this.treeData[index1].children.length === 1) {
              this.treeData.splice(index1, 1)
            } else {
              this.treeData[index1].children.splice(index2, 1)
            }
          } else {
            this.treeData[index1].children[index2].children.splice(index3, 1)
          }
          if (this.curIndex === index3) {
            let id = this.treeData[0].children[0].children[0].id
            this.$emit('getInfo', id)
            this.activeName = '0-0-0'
            this.openeds = ['0', '0-0']
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      },
      submitById (id, html5PageCode, index1, index2, index3) {
        util.request({
          method: 'post',
          interface: 'publishArticle',
          data: {
            id: id,
            html5PageCode: html5PageCode
          }
        }).then(res => {
          this.treeData[index1].children[index2].children[index3].state = 1
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
        })
      }
    }
  }
</script>
<style lang="scss">
  .allBox {
    width: 400px;
    background: #F9F9F9;

    .search-title {
      margin: 10px 0;
      padding: 0 10px;
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

    .two-box {
      background: #F9F9F9;
  
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
          }

          .p-box {
            float: left;
            width: 230px;
            margin-top: 10px;

            .title {
              display: block;
              font-size: 14px;
              color: #000000;
              line-height: 18px
            }

            .des {
              display: block;
              height: 26px;
              font-size: 12px;
              color: #5E6D82;
              overflow: hidden;
              line-height: 26px;
            }

            div {
              display: none;
              position: absolute;
              right: -20px;
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
