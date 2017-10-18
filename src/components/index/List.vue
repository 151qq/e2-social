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
          <template slot="title">
            {{item2.label}}
            <span @click.stop="setData(item1, item2, index1, index2)" class="add-box">
            +
            </span>
          </template>
          <el-menu-item v-for="(item3, index3) in item2.children"
              :index="index1 + '-' + index2 + '-' + index3">

                <div class="lists-box"
                    @click="getInfo(item3.nodeCode, item3.nodeCode, index1, index2, index3, item2.nodeCode)">
                  <img class="img-box" :src="item3.imgUrl">
                  <div class="p-box">
                    <span class="title">{{item3.label}}</span>
                    <div>
                      <img v-if="!item3.status && $route.name === 'report'"
                          @click.stop="submitItem(item3.nodeCode, item3.nodeCode, index1, index2, index3)"
                          src="../../assets/images/yfb.png">
                      <img v-if="!item3.status && $route.name === 'report'"
                          @click.stop="delItem(item3.nodeCode, item3.nodeCode, index1, index2, index3)"
                          src="../../assets/images/delete-icon.png">
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
  import interfaces from '../../assets/common/interfaces';
  export default{
    data(){
      return {
        isfirst: true,
        filterText: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        activeName: '0-0-0',
        openeds: ['0', '0-0'],
        addData: ''
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
  			this.timer = data?data:''
  			this.list = []
  			this.pageNumber = 1
  			this.loadList()
  		},
      loadList(){
        var formData = {}
          util.request({
          method: 'get',
          interface: this.$route.name + 'Tree',
          data: formData
        }).then(res => {
          this.treeData = this.filterData(res.result.result)
          if (this.treeData[0].children.length && this.treeData[0].children[0].children.length && this.isfirst) {
            let id = this.treeData[0].children[0].children[0].nodeCode
            let dirCode = this.treeData[0].children[0].nodeCode

            let data = {
              id: id
            }
            // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
            localStorage.setItem("id", id)
            localStorage.setItem("dirCode", dirCode)
            this.$emit('getInfo', data)
            this.isfirst = false
          }
        })
      },
      reloadList(newId){
        util.request({
          method: 'get',
          interface: this.$route.name + 'Tree',
          data: {}
        }).then(res => {
          this.treeData = this.filterData(res.result.result)
          console.log(newId, 'newId')
          var tree = {}
          if (!this.addData) {
            var arrs = this.activeName.split('-')
            tree = {
              index1: Number(arrs[0]),
              index2: Number(arrs[1])
            }
          } else {
            tree = {
              index1: this.addData.index1,
              index2: this.addData.index2 
            }
          }

          this.addData = ''

          var arrData = this.treeData[tree.index1].children[tree.index2]

          this.openeds = [String(tree.index1), tree.index1 + '-' + tree.index2]
          for(var i = 0, len = arrData.children.length; i < len; i++) {
            if (arrData.children[i].nodeCode == newId) {
              setTimeout(() => {
                this.activeName = tree.index1 + '-' + tree.index2 + '-' + i
              }, 0)
              break
            }
          }

          console.log(tree, this.activeName)

          let formData = {
            id: newId
          }
          // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
          localStorage.setItem("id", newId)
          localStorage.setItem("dirCode", arrData.nodeCode)
          this.$emit('getInfo', formData)
        })
      },
      filterData (datas) {
        var opDatas = datas.concat([])
        opDatas = opDatas.filter((item1, index1) => {
          return item1.children && item1.children.length
        })

        return opDatas
      },
      setData (item1, item2, index1, index2) {
        localStorage.setItem('houseCity', item1.label)
        localStorage.setItem('houseMall', item2.nodeCode)
        this.addData = {
          index1: index1,
          index2: index2
        }
        var data = {
          houseCity: item1.label,
          houseMall: item2.nodeCode,
          houseMName: item2.label
        }

        this.$parent.$refs.editBox.showAdd(data)
        
      },
      delItem (id, nodeCode) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteArticleById(id, nodeCode, index1, index2, index3)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
      },
      submitItem (id, nodeCode, index1, index2, index3) {
        this.$confirm('此操作将发布该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitById(id, nodeCode, index1, index2, index3)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })       
        })
      },
      getInfo (id, tplCode, index1, index2, index3, dirCode) {
        
        var curIndex = index1 + '-' + index2 + '-' + index3
        if (this.activeName === curIndex) {
          return false
        }
        this.activeName = curIndex
        var data = {
          id: id
        }
        // 设置页面ID，公编辑展示使用，防止直接输入地址相应错误
        localStorage.setItem("id", id)
        localStorage.setItem("dirCode", dirCode)

        this.$emit('getInfo', data)
      },
      deleteArticleById (id, nodeCode) {
        util.request({
          method: 'post',
          interface: 'deleteDraftFile',
          data: {
            html5PageCode: nodeCode
          }
        }).then(res => {
          this.loadList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      },
      submitById (id, nodeCode, index1, index2, index3) {
        util.request({
          method: 'post',
          interface: 'publishArticle',
          data: {
            html5PageCode: nodeCode
          }
        }).then(res => {
          this.treeData[index1].children[index2].children[index3].status = 1
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

      .add-box {
        float: right;
        font-size: 30px;
        margin-right: 30px;
        line-height: 56px;
        margin-top: -4px;
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
