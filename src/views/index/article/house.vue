<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox" v-if="$route.params.type === 'edit'">
            <articles @getInfo="getInfo"></articles>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-house ref="editBox"></form-house>
        </div>
    </div>
    
</template>
<script>
import articles from '../../../components/index/list.vue'
import formHouse from '../../../components/index/formHouse'
import util from '../../../assets/common/util'

export default {
    data () {
        return {
        }
    },
    methods: {
        getInfo (data) {
            console.log(this.$route.params.type, 'type')
            if (this.$route.params.type !== 'edit') {
                return false
            }
            // 编辑区域获取初始数据
            this.$refs.editBox.getAllData()
        }
    },
    components: {
        articles,
        formHouse
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