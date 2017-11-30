<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox">
            <articles @getInfo="getInfo" ref="listBox"></articles>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-security ref="editBox"></form-security>
        </div>
    </div>
    
</template>
<script>
import articles from '../../../components/index/securityList.vue'
import formSecurity from '../../../components/index/formSecurity'
import util from '../../../assets/common/util'

export default {
    data () {
        return {
        }
    },
    methods: {
        getInfo (data) {
            // 编辑区域获取初始数据
            this.$refs.editBox.getAllData(data)
        }
    },
    components: {
        articles,
        formSecurity
    }
}
</script>
<style lang="scss">
.leftBox {
    width: 400px;
    min-height: 100%;
    background: #F0F0F0;
}
.el-collapse-item__header {
    font-size: 20px;
    color: #000000;
}
</style>