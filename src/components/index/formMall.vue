<template>
    <div class="form-b">
        <div class="null-page-box">
          暂未开发该功能，敬请期待！
        </div>
    </div>
</template>
<script>
    export default {
        props: ['listInfo', 'articleInfo'],
        data () {
            return {
            }
        },
        mounted () {
            document.title = '购物中心'
        },
        methods: {
            getAllData () {
                if (this.timer) {
                    clearInterval(this.timer)
                }

                // this.timer = setInterval(() => {
                //     this.saveAll()
                // }, 180000)
            }
        }
    }
</script>
<style lang="scss">
    .form-b {
        margin-top: 30px;

        .null-page-box {
          margin-top: 120px;
          font-size: 36px;
          color: #999999;
          text-align: center;
        }
    }
</style>