<template>
    <div class="float-box flexBox" v-cloak>
        <!-- 左侧文章列表 -->
        <section class="leftBox" v-if="$route.params.type === 'edit'">
            <articles @getInfo="getInfo"></articles>
        </section>
        <!-- 中间文章编辑区域 -->
        <div class="body-mid flexItem">
            <form-report ref="editBox" :list-info="listInfo" :article-info="articleInfo"></form-report>
        </div>
    </div>
    
</template>
<script>
import articles from '../../../components/index/list.vue'
import formReport from '../../../components/index/formReport'
import util from '../../../assets/common/util'

export default {
    data () {
        return {
            listInfo: {},
            articleInfo: []
        }
    },
    methods: {
        getInfo (data) {
            if (this.$route.params.type !== 'edit') {
                return false
            }
            // 编辑区域获取初始数据
            this.$refs.editBox.getAllData()
        }
    },
    components: {
        articles,
        formReport
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