<template>
  <div class="imgs-box">
    <section class="img-box" v-for="(item, index) in imgLists">
      <img class="img-big" :src="item.link" @click="showImg">
      <div>
        <img class="del-btn" src="../../assets/images/del-icon.png">
        <p>
          <img src="../../assets/images/pen-icon.png">
          <input type="file" name="file" class="pen-input" @change="postImg($event, index)">
        </p>
      </div>
    </section>
    <section class="img-btn">
      <img class="img-big" src="../../assets/images/add-img.jpg">
      <input type="file" name="file" class="img-input" @change="postImg($event)">
    </section>
  </div>
</template>
<script>
import $ from 'Jquery'
import interfaces from '../../assets/common/interfaces'
import util from '../../assets/common/util'

export default {
    props: ['imgLists'],
    data() {
      return {
        imgList: []
      }
    },
    mounted () {
    },
    methods: {
      postImg (e, index) {
        util.upFile(e).then(res => {
          console.log(res)
          let imgUrl = res.result.result[0];
          console.log(res)
          var imgObject = {link:imgUrl};
          if (index !== undefined) {
            this.imgLists.splice(index, 1, imgObject)
          } else {
            this.imgLists.push(imgObject)
          }
        })
      },
      showImg (e) {
        let index = $('body .img-big').index($(e.target))
        this.$emit('showimg', index)
      }
    }
}
</script>

<style lang="scss">
  .imgs-box {
    width: 660px;
    margin-left: -10px;
    overflow: hidden;

    .img-box {
      float: left;
      width: 220px;
      height: 182px;
      box-sizing: border-box;
      padding: 7px 10px 11px;
      border-radius: 5px;
      background: #ffffff;

      .img-big {
        display: block;
        width: 200px;
        height: 140px;
      }

      div {
        display: none;
        margin-top: 8px;
        overflow: hidden;
          
        .del-btn {
          float: right;
          width: 16px;
          height: 16px;
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }
        }

        p {
          float: right;
          width: 16px;
          height: 16px;
          margin-right: 13px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          
          img {
            display: block;
            width: 16px;
            height: 16px;

            &:hover {
              opacity: 0.8;
            }
          }

          input {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0.01;
            width: 16px;
            height: 16px; 
          }
        }
      }

      &:hover {
        background: #EFF2F7;

        div {
          display: block;
        }
      }
    }

    .img-btn {
      float: left;
      position: relative;
      width: 220px;
      height: 182px;
      box-sizing: border-box;
      padding: 7px 10px 11px;
      border-radius: 5px;
      background: #ffffff;
      overflow: hidden;

      .img-big {
        display: block;
        width: 200px;
        height: 140px;

        &:hover {
          opacity: 0.8;
        }
      }

      input {
        position: absolute;
        left: 10px;
        top: 7px;
        opacity: 0.01;
        width: 200px;
        height: 140px;
        cursor: pointer;
      }
    }
  }
</style>