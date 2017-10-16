import Vue from 'vue'
import App from './login'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './scss/login.scss';

Vue.use(Element)

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
