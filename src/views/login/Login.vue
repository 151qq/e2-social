<template>
    <div class="wrap">
        <div class="loginBox">
            <div class="l">
                <swiper :options="swiperOption" ref="mySwiper">
                  <!-- slides -->
                  <swiper-slide v-for="item in swiperData"><img :src="item.picUrl"></swiper-slide>
                  <!-- Optional controls -->
                </swiper>

                <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
            <div class="r">
                <el-form :label-position="'left'" label-width="80px">
                    <el-form-item label="用户名称">
                        <el-input v-model="userLoginAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                        <el-input v-model="userPassword" type="password"></el-input>
                        <div class="forget-p" @click="dialogVisible = true">
                            忘记密码
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="subBtn">登录</el-button>
                    </el-form-item>
                </el-form>
                
                <div class="dased-border"></div>

                <el-form :label-position="'left'" label-width="80px">
                    <el-form-item label="公司名称">
                        <el-input v-model="enterpriseCname"></el-input>
                        <div class="message-box">
                            请填写公司的工商注册名称，填写不正确或填写公司简称等都会影响贵公司体验的申请。
                        </div>
                    </el-form-item>
                    <el-form-item label="申请人名">
                        <el-input v-model="userCname"></el-input>
                    </el-form-item>
                    <el-form-item label="注册手机">
                        <el-input v-model="userPhone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="regBtn">申请体验</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog
            title="忘记密码"
            :visible.sync="dialogVisible"
            size="tiny">
          
            <div class="form-b">
                <section>
                    <span>手机</span>
                    <el-input placeholder="请输入内容" v-model="forgetData.tel"></el-input>
                </section>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updaetPassword">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../assets/common/util';
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import $ from 'Jquery'
    export default {
        name: 'index',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                userLoginAccount: '',
                userPassword: '',
                corpId: 'wxf46be8b189e7d78f',
                wechatName: '张力阳企业号',
                curNav: 1,
                enterpriseCname: '',
                enterpriseIndustry: '',
                userCname: '',
                userPhone: '',
                swiperData: [
                    {picUrl: '/static/images/ip_big1.jpg'},
                    {picUrl: '/static/images/ip_big2.jpg'},
                    {picUrl: '/static/images/ip_big4.jpg'},
                    {picUrl: '/static/images/ip_big3.jpg'}
                ],
                dialogVisible: false,
                forgetData: {
                    tel: ''
                },
                swiperOption: {
                    // swiper options 所有的配置同swiper官方api配置
                    direction: 'horizontal',
                    mousewheelControl: true,
                    observeParents: true,
                    autoplay: 3000,
                    initialSlide: 1,
                    loop: true,
                    pagination: '.swiper-pagination'
                }
            }
        },
        mounted() {
            setTimeout(() => {
                var _selt = this
                $('.swiper-pagination-bullet').click(function(){
                    var index = $('.swiper-pagination-bullet').index($(this)) + 1
                    _selt.$refs.mySwiper.swiper.slideTo(index)
                })
            }, 150)
        },
        methods: {
            updaetPassword () {
                if (this.forgetData.tel == '' || !(/^1[3|4|5|8][0-9]\d{4,8}$/).test(this.forgetData.tel.trim())) {
                    this.$message.error('请输入11位注册手机号')
                    return
                }
                util.request({
                    method: 'post',
                    interface: 'resetPassword',
                    data: {
                        mobile: this.forgetData.tel
                    }
                }).then((res) => {
                    this.dialogVisible = false
                    this.$message({
                      message: '恭喜你，密码修改成功',
                      type: 'success'
                    })
                })
            },
            subBtn() {

                if (this.userLoginAccount == '') {
                    this.$message.error('请输入用户名');
                    return;
                }
                if (this.userPassword == '') {
                    this.$message.error('请输入密码');
                    return;
                }

                var data = {
                    userLoginAccount: this.userLoginAccount,
                    userPassword: this.userPassword,
                    corpId: this.corpId,
                    wechatName: this.wechatName
                }

                util.request({
                    method: 'post',
                    interface: 'authentication',
                    data: data
                }).then((res) => {
                    if (res.result.success != '0') {
                        window.location.href = 'index.html#/';
                    } else {
                        this.$message.error(res.result.message)
                    }
                    
                });
            },
            regBtn(){

                if (this.enterpriseCname == '') {
                    this.$message.error('请输入公司名称')
                    return;
                }

                if (this.userCname == '') {
                    this.$message.error('请输入申请人')
                    return;
                }
                if (this.userPhone == '' || !(/^1[3|4|5|8][0-9]\d{4,8}$/).test(this.userPhone.trim())) {
                    this.$message.error('请输入11位注册手机号')
                    return;
                }

                var data = {
                    enterpriseCname: this.enterpriseCname,
                    enterpriseIndustry: this.enterpriseIndustry,
                    userCname: this.userCname,
                    userPhone: this.userPhone
                }

                util.request({
                    method: 'post',
                    interface: 'authentication',
                    data: data
                }).then((res) => {
                    window.location.href = 'index.html#/';
                });

            }
        }
    }
</script>
